import { User } from "@firebase/auth";
import { Signal, signal } from "@preact/signals";
import { fetchFoods } from "./firebase";
import { Food } from "./types/types";

export const USER: Signal<User | null> = signal<User | null>(null);
export const Foods: Signal<Food[] | null> = signal<Food[] | null>(null);


 