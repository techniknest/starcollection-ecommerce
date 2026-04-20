"use client";

import { useState, useEffect } from "react";

export interface GlobalSettings {
  storeName: string;
  slogan: string;
  whatsappNumber: string;
  supportEmail: string;
  address: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

const defaultSettings: GlobalSettings = {
  storeName: "Stars Collection",
  slogan: "Experience excellence in every purchase.",
  whatsappNumber: "923149328645",
  supportEmail: "orders.starscollection@gmail.com",
  address: "TANCHI CHOWK, MOTI BAZAR, ABBOTTABAD",
  instagramUrl: "https://www.instagram.com/staars_collection?igsh=Z3Q5eGdocjJjZm5z",
  tiktokUrl: "https://www.tiktok.com/@stars.collection35?_r=1&_t=ZS-95WcjdWh3Wz",
};

export function useSettings() {
  const [settings, setSettings] = useState<GlobalSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, isLoading };
}
