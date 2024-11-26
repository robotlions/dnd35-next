import localFont from "next/font/local";
import "./globals.css";
import TopNav from "./ui/TopNav";
import Link from "next/link";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${imFellSC.variable} ${imFell.variable} bg-gray-50 antialiased`}>
        <TopNav />
        {children}
        <p className="font-[family-name:var(--font-imFell)] mt-30 mb-20 text-center">Copyright {currentYear} by <Link href="https://chadmusick.com" className="font-semibold text-lawfulBlue">Chad Musick</Link></p>
      </body>
    </html>
  );
}
