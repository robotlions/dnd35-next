import localFont from "next/font/local";
import "./globals.css";
import TopNav from "./ui/TopNav";

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
      </body>
    </html>
  );
}
