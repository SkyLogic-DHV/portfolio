"use client";

import { MessageCircleMore } from "lucide-react";

export function WhatsAppButton({ whatsapp }: { whatsapp?: string }) {
  const targetNumber = "+6281316881677";
  const number = targetNumber.replace(/[^0-9]/g, "");
  const href = number ? `https://wa.me/${number}` : "#";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <MessageCircleMore className="w-6 h-6 relative z-10" />
      </div>
      <span className="text-sm font-bold tracking-wide">WhatsApp</span>
    </a>
  );
}
