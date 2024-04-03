import { Button } from "@mui/material";
import Link from "next/link";

const FOOTER_STYLING = {
  base: "bg-black text-white min-h-[250px] max-h-[500px] px-4 py-4 flex items-center fixed bottom-0 w-full",
  h2: "mt-5 font-normal text-center",
};

export default function Footer() {
  return (
    <footer className={FOOTER_STYLING.base}>
      <ul className="footer__nav flex flex-wrap justify-start space-y-2 md:space-y-0 md:space-x-4 md:w-2/3">
        <li>
          <Button className="btn-base btn-primary">
            <Link href="addFood">Přidat Jídlo Do Databáze</Link>
          </Button>
        </li>
      </ul>

      {/* <div className="legal flex justify-between w-full">
        <p>&copy; 2024 Ondřej Lukeš</p>
      </div> */}
    </footer>
  );
}
