"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { CameraConsentWrapper } from "@/components/camera-wrapper";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // Admin pages get a completely clean canvas — no sidebar, no padding, no camera consent
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-[12px] focus:text-sm focus:font-medium shadow-md">
        Skip to content
      </a>
      <Sidebar />
      <main id="main-content" role="main" className="lg:pl-[280px]">
        <div className="max-w-[1024px] mx-auto pt-[80px] lg:pt-[56px] px-6 sm:px-8 lg:px-10 pb-[100px] lg:pb-32">
          {children}
        </div>
      </main>
      <CameraConsentWrapper />
    </>
  );
}
