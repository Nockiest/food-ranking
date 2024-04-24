import CreateFood from "@/components/CreateFood";
import "../globals.css";
import { AuthProvider  } from "../authContext";
const AddFood = () => {
  return (
    <AuthProvider>
      <CreateFood />
    </AuthProvider>
  );
};

export default AddFood;
