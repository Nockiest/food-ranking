'use client'
import   { createContext, useContext, useState, useEffect } from "react";
import { auth, db, fetchFoods } from "../firebase";
import { Food } from "@/types/types";
import { Signal, signal } from "@preact/signals";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";

// Define the type for the authentication context value
interface FoodContextValue {
    Foods: Signal<Food[] >;
    addFoodVote:  (food:Food, won:boolean ) => void
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
const q = query(collection(db, "Foods"));

// Foods provider component
export function FoodsProvider({ children }: { children: React.ReactNode }) {

  const Foods = signal<  Food[]  >([])
  onSnapshot(q, (querySnapshot) => {
    const Food:any[] = [];
    querySnapshot.forEach((doc) => {
      Food.push(doc.data() );
    });
    Foods.value = Food
    console.log("changed foods ", Foods );
  });
  const  addFoodVote = async (food:Food, won:boolean=false) => {
    const newFood = {
      ...food,
      votes: {
        total: food.votes.total+1,
        won: won? food.votes.won+1: food.votes.won
      }
    }
    await setDoc(doc(db, "Foods", food.imageId), newFood);
  }


  const value: FoodContextValue = {
    Foods,
    addFoodVote
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
