import { Vazirmatn } from "next/font/google"; //next has access to google font also we can add our custom font. see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

// we have to create a variable for font .
const vazir = Vazirmatn({
  subsets: ["latin"],
  variable: "--font-vazir", // we have to add variable for tailwind  --font-name
});
function Layout({ children }) {
  return (
    // for font we have to add fontNameVariable.variable and also font-sans so it will go and read value from sans key in tailwind config
    <div className={`${vazir.variable} font-sans min-h-screen flex flex-col`}>
      <Meta />
      <Header />
      <main className="bg-main-bg-color flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
