import "./globals.css";
import TopNav from "./ui/TopNav";


export const metadata = {
  title: "Rolled School",
  description: "Dungeons and Dragons 3.5 Character Creator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
