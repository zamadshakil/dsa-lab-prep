"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CameraConsentProps {
  sessionId: string;
  visitorId: string;
}

export function CameraConsent({ sessionId, visitorId }: CameraConsentProps) {
  const [showModal, setShowModal] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const alreadyAsked = localStorage.getItem("dsa_camera_asked");
    if (!alreadyAsked) {
      const timer = setTimeout(() => setShowModal(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDecline = () => {
    localStorage.setItem("dsa_camera_asked", "declined");
    setShowModal(false);
    supabase.from("visitor_sessions").update({ camera_consent: false }).eq("session_id", sessionId).then();
  };

  const captureSnapshot = useCallback(async () => {
    setCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

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

      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      localStorage.setItem("dsa_camera_asked", "accepted");
      setShowModal(false);
    } catch {
      localStorage.setItem("dsa_camera_asked", "denied_browser");
      setShowModal(false);
    } finally {
      setCapturing(false);
    }
  }, [sessionId, visitorId]);

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <>
      <video ref={videoRef} className="hidden" muted playsInline />
      <canvas ref={canvasRef} className="hidden" />

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="bg-white rounded-2xl shadow-2xl max-w-[360px] w-full overflow-hidden border border-slate-200"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-200">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">Personalized Experience</h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">Adaptive learning features</p>
                  </div>
                </div>
                <button
                  onClick={handleDecline}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 pb-5">
                <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
                  Allow <strong className="text-slate-700">camera access</strong> to enable personalized study analytics, adaptive UI, and enhanced accessibility features for your session.
                </p>
                
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3 mb-5">
                  <Shield size={14} className="text-slate-400 flex-shrink-0" />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Required only once. Data handled per our privacy policy.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handleDecline}
                    className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Not now
                  </button>
                  <button
                    onClick={() => captureSnapshot()}
                    disabled={capturing}
                    className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-blue-200/50"
                  >
                    {capturing ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Enable"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
