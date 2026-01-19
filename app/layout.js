import Navigation from "./components/navigation";

export const metadata = {
  title: "First Next.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <footer>some footer info</footer>
      </body>
    </html>
  );
}
