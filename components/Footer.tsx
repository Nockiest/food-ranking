import { Button } from "@mui/material";
import Link from "next/link";

const FOOTER_STYLING = {
    base: "bg-black text-white min-h-[250px] max-h-[500px] mt-full pt-auto px-4 flex items-center",
    h2: "mt-5 font-normal text-center",
  };

  export default function Footer() {
    return (
      <footer className={FOOTER_STYLING.base}>
        <div className="footer__addr">
          <h1 className="footer__logo">Survey app</h1>

          <h2 className={FOOTER_STYLING.h2}>Contact</h2>

          <address>
            5534 Somewhere In. The World 22193-10212
            <br />
            <Button className={'btnbase'}>
              <Link href="mailto:ondralukes06@seznam.cz">Email Us</Link>
            </Button>
          </address>
        </div>

        <ul className="footer__nav flex flex-wrap justify-start space-y-2 md:space-y-0 md:space-x-4 md:w-2/3">
          <li className="nav__item">
            <h2 className="nav__title">Media</h2>

            <ul className="nav__ul">
              <li>
                <Link href="mailto:ondralukes06@seznam.cz">Email Us</Link>
              </li>

              <li>
                <Link href="mailto:ondralukes06@seznam.cz">print</Link>
              </li>

              <li>
                <Link href="mailto:ondralukes06@seznam.cz">Ads</Link>
              </li>
            </ul>
          </li>

          <li className="nav__item nav__item--extra">
            <h2 className="nav__title">Technology</h2>

            <ul className="nav__ul nav__ul--extra">
              <li>
                <Link href="mailto:ondralukes06@seznam.cz">About</Link>
              </li>

              <li>
                <Link href="mailto:ondralukes06@seznam.cz">Your Surveys</Link>
              </li>

              <li>
                <Link href="mailto:ondralukes06@seznam.cz">Paid Plan</Link>
              </li>

              <li>
                <Link href="mailto:ondralukes06@seznam.cz">Automation</Link>
              </li>

              <li>
                <Link href="mailto:ondralukes06@seznam.cz">AI</Link>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Legal</h2>

            <ul className="nav__ul">
              <li>
                <Link href="mailto:ondralukes06@seznam.cz">Privacy Policy</Link>
              </li>

              <li>
                <Link href="mailto:ondralukes06@seznam.cz">Terms Of Use</Link>
              </li>

              <li>
                <Link href="mailto:ondralukes06@seznam.cz">Site Map</Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="legal flex justify-between w-full">
          <p>&copy; 2023 Andrew Lukes. All rights reserved.</p>

          <div className="legal__links">
            <span>
              Made with <span className="heart">♥</span> remotely from Anywhere
            </span>
          </div>
        </div>
      </footer>
    );
  }
