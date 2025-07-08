import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://al-project-three.vercel.app/"),
  title: "Tranformações Lineares e Mudanças de Base",
  description:
    "Transformações Lineares e Mudanças de Base aplicadas a Modelos 3D",
  applicationName: "Álgebra Linear em 3D",
  icons: {
    icon: "./icon.png",
  },
  openGraph: {
    title: "Tranformações Lineares e Mudanças de Base",
    description:
      "Veja como a Álgebra Linear atua diretamente sobre modelos 3D!",
    url: "https://al-project-three.vercel.app/",
    siteName: "Álgebra Linear em 3D",
    images: [
      {
        url: "./icon.png",
        width: 1200,
        height: 630,
        alt: "Transformações em modelos 3D com Álgebra Linear",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tranformações Lineares e Mudanças de Base",
    description:
      "Veja como a Álgebra Linear atua diretamente sobre modelos 3D!",
    images: ["./icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
