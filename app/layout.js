import { fontRethink } from "@/config/font";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "@/components/navbar/navbar";
import { siteConfig } from "@/config/site";
import QrScannerForMoblie from "@/containers/home-page/QrScanner-For-Moblie";
import Script from "next/script";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  manifest: "/manifest.json",
  title: siteConfig.name,
  description: siteConfig.description,
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: "/apple-icon-57x57.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: "/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: "/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: "/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-icon-180x180.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  ],
  meta: [
    {
      name: "msapplication-TileColor",
      content: "#da532c",
    },
    {
      name: "theme-color",
      content: "#4caf50",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        id="one-signal"
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        strategy="afterInteractive"
      />
      <Script id="onesignal-init" strategy="afterInteractive">
        {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "2ea278aa-e012-412f-a68f-65c4fb6214cc",
            });
          });
        `}
      </Script>

      <body className={fontRethink.variable}>
        <Providers>
          <Navbar />
          <ToastContainer position="center" transition={Flip} />
          {children}
          <QrScannerForMoblie />
        </Providers>
      </body>
    </html>
  );
}
