// The Sanity Studio needs a clean, full-screen layout —
// no Navbar, Footer, or Preloader from the root layout.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
