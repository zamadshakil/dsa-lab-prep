"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";

interface TelemetryContextType {
  trackEvent: (eventType: string, metadata?: Record<string, any>) => void;
  visitorId: string | null;
}

const TelemetryContext = createContext<TelemetryContextType>({
  trackEvent: () => {},
  visitorId: null,
});

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const sessionIdRef = useRef<string>(uuidv4());
  const currentViewIdRef = useRef<string | null>(null);
  const maxScrollRef = useRef<number>(0);

  // 1. Initialize Visitor ID and Session
  useEffect(() => {
    let vid = localStorage.getItem("dsa_telemetry_visitor_id");
    if (!vid) {
      vid = uuidv4();
      localStorage.setItem("dsa_telemetry_visitor_id", vid);
    }
    setVisitorId(vid);

    // Collect maximal hardware/env intel
    const nav = window.navigator as any;
    const sessionData = {
      session_id: sessionIdRef.current,
      visitor_id: vid,
      user_agent: navigator.userAgent,
      browser_info: {
        vendor: navigator.vendor,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
        pdfViewerEnabled: navigator.pdfViewerEnabled
      },
      os_info: { platform: navigator.platform },
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      window_resolution: `${window.innerWidth}x${window.innerHeight}`,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: navigator.language,
      device_memory: nav.deviceMemory || null,
      hardware_concurrency: navigator.hardwareConcurrency || null,
      network_type: nav.connection ? nav.connection.effectiveType : null,
      referrer: document.referrer || "direct",
      current_url: window.location.href,
    };

    // Fire & Forget insert
    supabase.from("visitor_sessions").insert([sessionData]).then(({ error }) => {
      if (error) console.error("Telemetry Session Error:", error);
    });

    // Setup global listeners like visibility and beforeunload to catch "tab switches"
    const handleVisibility = () => {
      if (document.hidden) {
        supabase.from("visitor_events").insert([{
          session_id: sessionIdRef.current,
          event_type: "tab_blur",
          metadata: { path: window.location.pathname }
        }]);
      } else {
        supabase.from("visitor_events").insert([{
          session_id: sessionIdRef.current,
          event_type: "tab_focus",
          metadata: { path: window.location.pathname }
        }]);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      endCurrentPage(); // Trigger close out on unmount
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helpers to close out the previous page view
  const endCurrentPage = async () => {
    if (!currentViewIdRef.current) return;
    await supabase.from("visitor_page_views")
      .update({
        ended_at: new Date().toISOString(),
        duration_seconds: Math.floor((Date.now() - new Date(currentViewIdRef.current.split('|')[1]).getTime()) / 1000),
        max_scroll_depth_percent: maxScrollRef.current
      })
      .eq("id", currentViewIdRef.current.split('|')[0]);
  };

  // 2. Track Route Changes Automatically
  useEffect(() => {
    if (!visitorId || !pathname) return;

    const recordNewPage = async () => {
      // First, end the old one if it existed
      if (currentViewIdRef.current) {
        await endCurrentPage();
      }

      // Reset scroll for the new page
      maxScrollRef.current = 0;
      const viewId = uuidv4();
      const startTimeRef = new Date().toISOString();
      currentViewIdRef.current = `${viewId}|${startTimeRef}`;

      await supabase.from("visitor_page_views").insert([{
        id: viewId,
        session_id: sessionIdRef.current,
        visitor_id: visitorId,
        path: pathname,
      }]);
    };

    recordNewPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, visitorId]);

  // 3. Track Scroll Depth Intermittently
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        if (scrolled > maxScrollRef.current) {
          maxScrollRef.current = Math.min(100, Math.round(scrolled));
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Main interaction logging hook
  const trackEvent = (eventType: string, metadata: Record<string, any> = {}) => {
    if (!visitorId) return;
    supabase.from("visitor_events").insert([{
      session_id: sessionIdRef.current,
      event_type: eventType,
      element_target: metadata.target || null,
      metadata: metadata,
    }]).then();
  };

  return (
    <TelemetryContext.Provider value={{ trackEvent, visitorId }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export const useTelemetry = () => useContext(TelemetryContext);
