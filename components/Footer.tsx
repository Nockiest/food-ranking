'use client'
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter, usePathname} from "next/navigation";

const FOOTER_STYLING = {
  base: "bg-black text-white min-h-[250px] max-h-[500px] px-4 py-4 flex items-center fixed bottom-0 w-full",
  h2: "mt-5 font-normal text-center",
};

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname()
  return (
    <footer className={FOOTER_STYLING.base}>
      <ul className="footer__nav flex flex-wrap justify-start space-y-2 md:space-y-0 md:space-x-4 md:w-2/3">
        {/* Conditionally render the button only on the home page */}
        {  pathname.endsWith("/addFood" )  ? (
          <Button className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2 hover:bg-gray-400">
          <Link href="/">Na Hlavní Stránku</Link>
        </Button>
        )  : (
          <li>
            <Button className="btn-base btn-primary">
              <Link href="addFood">Přidat Jídlo Do Databáze</Link>
            </Button>
          </li>
        )}
      </ul>


    </footer>
  );
}
