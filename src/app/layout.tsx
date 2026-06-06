import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recettes Végé · TM5",
  description: "Mon carnet de recettes végétariennes et veganes, compatible Thermomix TM5",
  themeColor: "#009245",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
