"use client";

import { MessageCircle } from "lucide-react";
import { useSettings } from "@/features/settings/hooks/use-settings";

export default function WhatsAppWidget() {
  const { settings } = useSettings();
  const message = encodeURIComponent("Hello! I'm interested in the premium collection.");
  const whatsappLink = `https://wa.me/${settings.whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] group flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:scale-110 hover:bg-green-600 transition-all duration-300 animate-fade-in-up"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      {/* Pulse effect rings */}
      <span className="absolute inset-0 rounded-full border-2 border-green-500 opacity-50 animate-ping" />
    </a>
  );
}
