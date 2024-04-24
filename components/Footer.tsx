"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
const FOOTER_STYLING = {
  base: "bg-black text-white min-h-[250px] max-h-[500px] px-4 py-4 flex items-center fixed bottom-0 w-full",
  h2: "mt-5 font-normal text-center",
};

// type Repo = {
//   name: string
//   stargazers_count: number
// }
 
// export const getServerSideProps = (async () => {
//   // Fetch data from external API
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const repo: Repo = await res.json()
//   // Pass data to the page via props
//   return { props: { repo } }
// }) satisfies GetServerSideProps<{ repo: Repo }>
 
// export default function Footer({
//   repo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <div className="bg-gray-400 min-h-40">
//       <p>{repo?.stargazers_count}</p>
//     </div>
//   )
// }
export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const navButtons = [
    { name: "home", label: "Na hlavní stránku", url: "/" },
    { name: "add", label: "přidat jídlo do databáze", url: "/addFood" },
    { name: "leaderboard", label: "žebříček", url: "/leaderboard" },
  ];

  return (
    <footer className={FOOTER_STYLING.base}>
      <ul className="footer__nav flex flex-wrap justify-start space-y-2 md:space-y-0 md:space-x-4 md:w-2/3">
        {navButtons.map(
          (btn) =>
            btn.url !== pathname && (
              <button key={btn.name} className={`btn-base btn-primary`}>
                <Link href={`${btn.url}`}>{btn.label}</Link>
              </button>
            )
        )}
      </ul>
    </footer>
  );
}
