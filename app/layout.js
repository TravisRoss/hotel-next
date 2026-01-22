import Navigation from "./_components/navigation";

import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-josefin-sans",
});

export const metadata = {
  title: {
    template: "%s | Cozy Cabins",
    default: "Cozy Cabins",
  },
  description: "Discover and book your perfect cabin getaway.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />

        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl bg-red-500 mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
