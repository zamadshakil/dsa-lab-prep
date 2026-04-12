"use client";

import { useTelemetry } from "@/components/telemetry";
import { CameraConsent } from "@/components/camera-consent";

export function CameraConsentWrapper() {
  const { sessionId, visitorId } = useTelemetry();

  if (!sessionId || !visitorId) return null;

  return <CameraConsent sessionId={sessionId} visitorId={visitorId} />;
}
