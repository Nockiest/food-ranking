// 'use client'
import OptionChooser from "@/components/OptionChooser";

export default function Home() {
  console.log(  process.env.REACT_APP_FIREBASE_API_KEY )
  return (
    <div className="flex justify-center">
      <OptionChooser />
    </div>
  );
}
