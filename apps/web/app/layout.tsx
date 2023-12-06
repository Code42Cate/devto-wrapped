import "@ui/styles/globals.css";
import { Poppins } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { Metadata } from "next";

const inter = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2023 dev.to wrapped",
  metadataBase: new URL("https://devto-wrapped.sliplane.app"),
  description: "Get your dev.to wrapped for 2023!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <PlausibleProvider domain="devto-wrapped.sliplane.app">
        <body
          className={`bg-gray-100 antialiased ${inter.className} font-sans`}
        >
          <div className="backdrop" />

          {children}
        </body>
      </PlausibleProvider>
    </html>
  );
}
