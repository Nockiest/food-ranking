import CreateFood from "@/components/CreateFood";
import "../globals.css";
import { AuthProvider, useAuth } from "../authContext";
// import Link from "next/link";
const AddFood = () => {
    // const {userLoggedIn} = useAuth()
  return (
    <AuthProvider>
        <CreateFood />

    </AuthProvider>
  );
};

export default AddFood;
