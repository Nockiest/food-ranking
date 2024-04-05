import CreateFood from "@/components/CreateFood";
import "../globals.css";
import { useAuth } from "../authContext";
const AddFood = () => {
    const {userLoggedIn} = useAuth()
  return (
    <>
      {!userLoggedIn ? (
        <p>Přihlaš se, abys mohl přidávat obash</p>
      ) : (
        <CreateFood />
      )}
    </>
  );
};

export default AddFood;
