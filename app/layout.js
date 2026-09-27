import "./globals.css";

export const metadata = {
  title: "Michael Octama | Cyber Security Portfolio",
  description: "Portfolio of Michael Ernst Jeremy Octama, Cyber Security student and reverse engineering enthusiast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
