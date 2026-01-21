import Navigation from "./_components/navigation";

import "@/app/_styles/globals.css";

export const metadata = {
  title: "First Next.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <Navigation />
        <main>{children}</main>
        <footer>some footer info</footer>
      </body>
    </html>
  );
}
