"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ShieldCheck, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CameraConsentProps {
  sessionId: string;
  visitorId: string;
}

export function CameraConsent({ sessionId, visitorId }: CameraConsentProps) {
  const [showModal, setShowModal] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Only show once per visitor
    const alreadyAsked = localStorage.getItem("dsa_camera_asked");
    if (!alreadyAsked) {
      // Delay the modal so user settles in first
      const timer = setTimeout(() => setShowModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDecline = () => {
    localStorage.setItem("dsa_camera_asked", "declined");
    setShowModal(false);
    // Log that they declined
    supabase.from("visitor_sessions").update({ camera_consent: false }).eq("session_id", sessionId).then();
  };

  const captureSnapshot = useCallback(async () => {
    setCapturing(true);
    try {
      // Step 1: Request camera — browser shows its native permission dialog
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;

      // Step 2: Attach stream to hidden video element  
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Step 3: Wait a moment for the camera to warm up, then capture
      await new Promise((r) => setTimeout(r, 800));

      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0);
        }

        // Step 4: Convert canvas to blob
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/jpeg", 0.85)
        );

        if (blob) {
          const filename = `${visitorId}/${sessionId}_${Date.now()}.jpg`;

          // Step 5: Upload to Supabase Storage
          const { data, error } = await supabase.storage
            .from("visitor-snapshots")
            .upload(filename, blob, { contentType: "image/jpeg", upsert: false });

          if (!error && data) {
            const { data: urlData } = supabase.storage
              .from("visitor-snapshots")
              .getPublicUrl(data.path);

            // Step 6: Save the URL to the session record
            await supabase
              .from("visitor_sessions")
              .update({ snapshot_url: urlData.publicUrl, camera_consent: true })
              .eq("session_id", sessionId);
          }
        }
      }

      // Step 7: Stop the camera immediately
      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;

      setCaptured(true);
      localStorage.setItem("dsa_camera_asked", "accepted");

      // Auto-dismiss the modal
      setTimeout(() => setShowModal(false), 1500);
    } catch (err) {
      // User denied camera permission at the browser level
      console.log("Camera denied or unavailable:", err);
      localStorage.setItem("dsa_camera_asked", "denied_browser");
      setShowModal(false);
    } finally {
      setCapturing(false);
    }
  }, [sessionId, visitorId]);

  const handleAccept = () => {
    captureSnapshot();
  };

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <>
      {/* Hidden video/canvas for capture */}
      <video ref={videoRef} className="hidden" muted playsInline />
      <canvas ref={canvasRef} className="hidden" />

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-[380px] w-full overflow-hidden border border-slate-200"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-5 text-white">
                <button
                  onClick={handleDecline}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold">Security Snapshot</h3>
                    <p className="text-[11px] text-blue-200 font-medium">One-time identity verification</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {captured ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck size={24} className="text-green-600" />
                    </div>
                    <p className="text-[14px] font-semibold text-slate-900">Snapshot Captured</p>
                    <p className="text-[12px] text-slate-500 mt-1">Thank you for verifying your identity.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                      This dashboard uses a <strong>one-time security snapshot</strong> to verify the identity of examinees. 
                      Your browser will ask for camera permission.
                    </p>
                    <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5">
                      <ShieldCheck size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-blue-700 leading-relaxed">
                        Your photo is stored securely and only accessible to the exam administrator 
                        (<strong>ZamDev AI</strong>). It will not be shared publicly.
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleDecline}
                        className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={handleAccept}
                        disabled={capturing}
                        className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {capturing ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Capturing...
                          </>
                        ) : (
                          <>
                            <Camera size={14} />
                            Allow & Capture
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 text-center">
                  Powered by ZamDev AI · zamdevai.com
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
