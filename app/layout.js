import Navigation from "./_components/navigation";

import "@/app/_styles/globals.css";

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
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <Navigation />
        <main>{children}</main>
        <footer>some footer info</footer>
      </body>
    </html>
  );
}
