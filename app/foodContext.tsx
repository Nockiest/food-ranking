'use client'
import   { createContext, useContext, useState, useEffect } from "react";
import { auth, fetchFoods } from "../firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { Food } from "@/types/types";
import { Signal, signal } from "@preact/signals";
import { gatherFoodData } from "@/signals";

// Define the type for the authentication context value
interface FoodContextValue {
    Foods: Signal<Food[]|null>
}

const FoodContext = createContext<FoodContextValue | undefined>(undefined);

// Custom hook to access the authentication context
export function useFood(): FoodContextValue {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
// Create the food context



// Foods provider component
export function FoodsProvider({ children }: { children: React.ReactNode }) {

  const Foods = signal<  Food[] |null>(null)
  useEffect(()=> {
    async function fetchData() {
              try {
                const res =  await fetchFoods(); // Call the async function to fetch data
                console.log(res)
                Foods.value = res
                console.log(Foods.value)
              } catch (error) {
                console.error("Error fetching food data:", error);
              }
            }
      fetchData()

  }, [ Foods])

  const value: FoodContextValue = {
    Foods
  };

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  );
}

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await gatherFoodData(); // Fetch food data asynchronously
//         setFoods(data => foods.value = data); // Update state with fetched data
//       } catch (error) {
//         console.error("Error fetching food data:", error);
//       }
//     }

//     fetchData(); // Call the async function to fetch data
//   }, []);
