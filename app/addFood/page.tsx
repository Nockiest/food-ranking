import CreateFood from "@/components/CreateFood";
import "../globals.css";
import { AuthProvider, useAuth } from "../authContext";
// import Link from "next/link";
const AddFood = () => {
  return (
    <AuthProvider>
        <CreateFood />

    </AuthProvider>
  );
};

export default AddFood;
