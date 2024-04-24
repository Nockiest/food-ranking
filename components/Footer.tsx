'use client'
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter, usePathname} from "next/navigation";
import { useState } from "react";

const FOOTER_STYLING = {
  base: "bg-black text-white min-h-[250px] max-h-[500px] px-4 py-4 flex items-center fixed bottom-0 w-full",
  h2: "mt-5 font-normal text-center",
};

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname()
  const [activeButton, setActiveButton] = useState('home')
  const navButtons = [
    {name: 'home' ,label: 'Na hlavní stránku', url: '/' },
    {name: 'add' ,label: 'přidat jídlo do databáze', url: '/addFood' },
    {name: 'leaderboard' ,label: 'žebříček', url: '/leaderboard' }
   
  ];
  // useEffect(() => {
  //   let newPathname =  pathname;
  //   if (newPathname?.startsWith("/")) {
  //     newPathname = newPathname.substring(1);
  //   }
  //   if(newPathname===""){
  //     setActiveButton("home");
  //   } else {
  //     setActiveButton(newPathname);
  //   }
   
  //   console.log(newPathname)
  // }, [pathname]);
  return (
    <footer className={FOOTER_STYLING.base}>
      <ul className="footer__nav flex flex-wrap justify-start space-y-2 md:space-y-0 md:space-x-4 md:w-2/3">
        {/* Conditionally render the button only on the home page */}
      
         {navButtons.map((btn => (
        btn.url !== pathname && <button
          key={btn.name}
          className={`btn-base btn-primary`}
         
        >
          <Link href={`${btn.url}`}>
          {btn.label}

          </Link>
        </button>
      
      )
      )
      )
    } 
      </ul>


    </footer>
  );
}
{/*// onClick={() => handleCustomButtonClick(button.name)}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave} // ${activeButton === button.name ? "btn-clicked" : ""}
              {  pathname.endsWith("/addFood" )  ? (
          <Button className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2 hover:bg-gray-400">
          <Link href="/">Na Hlavní Stránku</Link>
        </Button>
        )  : (
          <li>
            <button className="btn-base btn-primary">
              <Link href="addFood">Přidat Jídlo Do Databáze</Link>
            </button>
          </li>
        )} */}