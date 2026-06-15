import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHEM105 Course",
  description: "CHEM105 course videos and chapter dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark">105</span>
            <span>
              <strong>CHEM105</strong>
              <small>Health Sciences Chemistry</small>
            </span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/access">Access</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
