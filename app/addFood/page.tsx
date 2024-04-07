import CreateFood from "@/components/CreateFood";
import "../globals.css";
import { AuthProvider, useAuth } from "../authContext";
// import Link from "next/link";
const AddFood = () => {
    // const {userLoggedIn} = useAuth()
  return (
    <AuthProvider>
      {/* {!userLoggedIn ? (
        <p>Přihlaš se, abys mohl přidávat obash</p>
      ) : ( */}
        <CreateFood />
        {/* <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2 hover:bg-gray-400">
            <Link href="/">Na Hlavní Stránku</Link>
          </button> */}
      {/* )} */}
    </AuthProvider>
  );
};

export default AddFood;
