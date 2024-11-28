import localFont from "next/font/local";
import "./globals.css";
import TopNav from "./ui/TopNav";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";


const raleway = localFont({
  src: "./fonts/Raleway-VariableFont_wght.ttf",
  variable: "--font-raleway",
  weight: "100 400 900",
});

const imFellSC = localFont({
  src: "./fonts/IMFellEnglishSC-Regular.ttf",
  variable: "--font-imFellSC",
  weight: "100 400 900",
});

const imFell = localFont({
  src: "./fonts/IMFellEnglish-Regular.ttf",
  variable: "--font-imFell",
  weight: "100 400 900",
});



const currentDate = new Date();
  let currentYear = currentDate.getFullYear();

export const metadata = {
  title: "Rolled School",
  description: "Dungeons and Dragons 3.5 Character Creator",
  metadataBase: new URL('https://dnd35.robotlions.com/'),
  openGraph: {
    title:"Rolled School: Dungeons and Dragons 3.5 Character Creator",
    description: "Roll up an old-school D&D character based on the 2003 third edition Player's Handbook",
    url: "https://dnd35.robotlions.com/",
    type: "website",
    siteName: "Rolled School",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${imFellSC.variable} ${imFell.variable} bg-gray-50 antialiased`}>
      <h1 className="hidden">Rolled School character creator for third edtion dungeons and dragons version 3.5. Free character generator for D&D 3.5 from the Player's Handbook. TSR Wizards of the Coast, role playing game, rpg, old school.</h1>
      <GoogleAnalytics gaId="G-XFYYE6YFJB" />
        <TopNav />
        {children}
        <p className="font-[family-name:var(--font-imFell)] mt-30 mb-20 text-center">Copyright {currentYear} by <Link href="https://chadmusick.com" className="font-semibold text-lawfulBlue">Chad Musick</Link></p>
      </body>
    </html>
  );
}
