import "@ui/styles/globals.css";
import { Poppins } from "next/font/google";
import PlausibleProvider from "next-plausible";

const inter = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
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
          {children}
        </body>
      </PlausibleProvider>
    </html>
  );
}
