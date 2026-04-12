"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";

interface TelemetryContextType {
  trackEvent: (eventType: string, metadata?: Record<string, any>) => void;
  visitorId: string | null;
  sessionId: string | null;
}

const TelemetryContext = createContext<TelemetryContextType>({
  trackEvent: () => {},
  visitorId: null,
  sessionId: null,
});

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const sessionIdRef = useRef<string>(uuidv4());
  const currentViewIdRef = useRef<string | null>(null);
  const maxScrollRef = useRef<number>(0);
  
  // Fun Telemetry: Rage Clicks
  const clickCountRef = useRef<number>(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalRageClicksRef = useRef<number>(0);

  // Bump this to reset all user localStorage (sessions, camera, etc.)
  const TELEMETRY_VERSION = "2";

  // 1. Initialize Visitor ID and Session
  useEffect(() => {
    // Clear cookies every single time for Apple users (iPhone, iPad, Mac)
    const ua = navigator.userAgent;
    const isApple = /iPhone|iPad|iPod|Macintosh|Mac OS/.test(ua);
    
    // Version check OR Apple User check — wipe stale keys
    const storedVersion = localStorage.getItem("dsa_telemetry_version");
    if (storedVersion !== TELEMETRY_VERSION || isApple) {
      localStorage.removeItem("dsa_telemetry_visitor_id");
      localStorage.removeItem("dsa_camera_asked");
      localStorage.setItem("dsa_telemetry_version", TELEMETRY_VERSION);
    }

    let vid = localStorage.getItem("dsa_telemetry_visitor_id");
    if (!vid) {
      vid = uuidv4();
      localStorage.setItem("dsa_telemetry_visitor_id", vid);
    }
    setVisitorId(vid);

    const initializeSession = async () => {
      // Fun Telemetry: Battery API
      const nav: any = window.navigator;
      let batteryLevel = null;
      let isCharging = null;
      try {
        if (nav.getBattery) {
          const battery = await nav.getBattery();
          batteryLevel = Math.round(battery.level * 100);
          isCharging = battery.charging;
        }
      } catch (e) {}

      // Fun Telemetry: Dark Mode
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

      const sessionData = {
        session_id: sessionIdRef.current,
        visitor_id: vid,
        user_agent: navigator.userAgent,
        browser_info: { vendor: navigator.vendor, language: navigator.language },
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
        
        // The Fun Stuff!
        battery_level: batteryLevel,
        is_charging: isCharging,
        dark_mode_active: isDarkMode
      };

      supabase.from("visitor_sessions").insert([sessionData]).then();
    };
    
    initializeSession();

    // Setup global listeners like visibility and beforeunload to catch "tab switches"
    const handleVisibility = () => {
      if (document.hidden) {
        supabase.from("visitor_events").insert([{ session_id: sessionIdRef.current, event_type: "tab_blur", metadata: { path: window.location.pathname } }]);
      } else {
        supabase.from("visitor_events").insert([{ session_id: sessionIdRef.current, event_type: "tab_focus", metadata: { path: window.location.pathname } }]);
      }
    };
    
    // Fun Telemetry: Catch "Rage Clicks" (Multiple fast clicks on the screen)
    const handleGlobalClick = () => {
      clickCountRef.current += 1;
      if (!clickTimerRef.current) {
        clickTimerRef.current = setTimeout(() => {
          if (clickCountRef.current > 4) {
            // User is rage clicking!
            totalRageClicksRef.current += 1;
            supabase.from("visitor_events").insert([{ session_id: sessionIdRef.current, event_type: "rage_click_detected" }]).then();
          }
          clickCountRef.current = 0;
          clickTimerRef.current = null;
        }, 1000); // 4 clicks within 1.0 second = rage click
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("click", handleGlobalClick);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("click", handleGlobalClick);
      endCurrentPage(); 
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endCurrentPage = async () => {
    if (!currentViewIdRef.current) return;
    await supabase.from("visitor_page_views").update({
        ended_at: new Date().toISOString(),
        duration_seconds: Math.floor((Date.now() - new Date(currentViewIdRef.current.split('|')[1]).getTime()) / 1000),
        max_scroll_depth_percent: maxScrollRef.current,
        rage_clicks: totalRageClicksRef.current
      }).eq("id", currentViewIdRef.current.split('|')[0]);
  };

  useEffect(() => {
    if (!visitorId || !pathname) return;
    const recordNewPage = async () => {
      if (currentViewIdRef.current) await endCurrentPage();
      maxScrollRef.current = 0;
      totalRageClicksRef.current = 0; // reset rage stats per page
      
      const viewId = uuidv4();
      currentViewIdRef.current = `${viewId}|${new Date().toISOString()}`;
      await supabase.from("visitor_page_views").insert([{ id: viewId, session_id: sessionIdRef.current, visitor_id: visitorId, path: pathname }]);
    };
    recordNewPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, visitorId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        if (scrolled > maxScrollRef.current) maxScrollRef.current = Math.min(100, Math.round(scrolled));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trackEvent = (eventType: string, metadata: Record<string, any> = {}) => {
    if (!visitorId) return;
    supabase.from("visitor_events").insert([{ session_id: sessionIdRef.current, event_type: eventType, element_target: metadata.target || null, metadata }]).then();
  };

  return <TelemetryContext.Provider value={{ trackEvent, visitorId, sessionId: sessionIdRef.current }}>{children}</TelemetryContext.Provider>;
}

export const useTelemetry = () => useContext(TelemetryContext);
