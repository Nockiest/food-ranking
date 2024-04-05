import { User } from "@firebase/auth";
import { Signal, signal } from "@preact/signals";
import { fetchFoods, getUserAuthentication } from "./firebase";
import { Food } from "./types/types";

// export const USER: Signal<User | null> = signal<User | null>(null);
// export const Foods: Signal<Food[]  > = signal<Food[]>([]);
export async function gatherFoodData() {
    const foods = await fetchFoods()
    const Foods = signal<Food[]>([...foods ]);


    return { Foods }
  }