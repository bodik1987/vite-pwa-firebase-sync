import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin: any = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "vite-pwa-firebase-sync",
    short_name: "vite-pwa-firebase-sync",
    description: "vite-pwa-firebase-sync",
    screenshots: [
      {
        src: "320.png",
        sizes: "320x320",
        type: "image/png",
        form_factor: "narrow",
        label: "Screen",
      },
      {
        src: "320.png",
        sizes: "320x320",
        type: "image/png",
        form_factor: "wide",
        label: "Screen",
      },
    ],
    icons: [
      {
        src: "/vite-pwa-firebase-sync/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/vite-pwa-firebase-sync/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/vite-pwa-firebase-sync/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/vite-pwa-firebase-sync/maskable_icon.png",
        sizes: "080x2400",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#f5f5f5",
    background_color: "#f5f5f5",
    display: "standalone",
    scope: "/vite-pwa-firebase-sync/",
    start_url: "/vite-pwa-firebase-sync/",
    orientation: "portrait",
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  base: "/vite-pwa-firebase-sync",
});
