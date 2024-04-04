import CreateFood from "@/components/CreateFood";
import { USER } from "@/signals";
import React from "react";
import "../globals.css";
const AddFood = () => {
  return (
    <>
      {USER.value ? (
        <p>Přihlaš se, abys mohl přidávat obash</p>
      ) : (
        <CreateFood />
      )}
    </>
  );
};

export default AddFood;
