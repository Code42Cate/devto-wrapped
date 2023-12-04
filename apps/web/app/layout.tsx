import "@ui/styles/globals.css";
import { Poppins } from "next/font/google";

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
      <body className={`bg-gray-100 antialiased ${inter.className} font-sans`}>
        {children}
      </body>
    </html>
  );
}
