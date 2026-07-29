"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    try {
      const path = window.location.pathname;
      const userAgent = navigator.userAgent;

      let browser = "Chrome";
      if (userAgent.includes("Firefox")) browser = "Firefox";
      else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
      else if (userAgent.includes("Edg")) browser = "Edge";

      let os = "Windows";
      if (userAgent.includes("Mac")) os = "macOS";
      else if (userAgent.includes("Linux")) os = "Linux";
      else if (userAgent.includes("Android")) os = "Android";
      else if (userAgent.includes("iPhone")) os = "iOS";

      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      const device = isMobile ? "Mobile" : "Desktop";

      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          device,
          browser,
          os,
          referral: document.referrer || "Direct",
          sessionDuration: 30,
        }),
      }).catch(() => {});
    } catch {}
  }, []);

  return null;
}
