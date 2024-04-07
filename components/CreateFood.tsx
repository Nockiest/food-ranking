"use client";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect, ChangeEventHandler } from "react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { storage, colRef, db, auth } from "@/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { Food, Tag } from "@/types/types";
import { foodTypes } from "@/globalValues";
import { Paper } from "@mui/material";

import plusIcon from "../svg/plus-large.svg";
import Image from "next/image";
import { useAuth } from "@/app/authContext";

// remove the next next to image select after submitting

const initialFoodState: Food = {
  name: "",
  description: "",
  imageId: "",
  numAppeardInVote: 0,
  votes: { total: 0, won: 0 },
  tags: [],
};

const CreateFood = () => {
  const { userLoggedIn } = useAuth();
  const [food, setFood] = useState<Food>(initialFoodState);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  const handleTagChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const tag = foodTypes.find((foodType) => foodType.name === value);

    if (tag && !food.tags.includes(tag)) {
      setFood((prevFood) => ({
        ...prevFood,
        tags: [...prevFood.tags, tag],
      }));
    }
  };

  const handleTagRemove = (removedTag: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      tags: prevFood.tags.filter((tag) => tag.name !== removedTag),
    }));
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setImageUpload(selectedImage);

      // Read the selected image as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const submitPost = async () => {
    // Use the `food` state object to access form data
    const id = uuidv4();
    const timeStamp = serverTimestamp();

    // Create the food document
    const docRef = await addDoc(collection(db, "Foods"), {
      ...food,
      id,
      timeStamp,
      imageId: id
    });

    // Upload image if provided
    if (imageUpload) {
      uploadFile(id);
    }

    // Clear input fields and reset image preview
    setFood(initialFoodState);
    setImagePreview(null);

    // Show alert with food details
    const alertMessage = `Food Title: ${food.name}\nFood Description: ${food.description}\nCategories: ${food.tags.join(", ")}\nImage ID: ${id} `;
    alert(`Food added!\n\n${alertMessage}`);

    // Console log the image ID and the food ID
    alert(`Image ID: ${id} Food ID: ${docRef.id}`);
  };

  const uploadFile = (postId: string) => {
    const imageRef = ref(storage, `images/${postId}`);

    uploadBytes(imageRef, imageUpload as Blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
      });
    });
  };

  // Keep all Czech descriptions in Czech
  if (!userLoggedIn) {
    return <p>Pro nahrání jídel, se musíte přihlásit</p>;
  }

  return (
    <div className="flex h-full justify-center align-center items-center">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="w-full border relative border-black flex justify-center items-center md:col-span-1">
          {imagePreview && (
            <Image fill={true} src={imagePreview} alt="Image Preview" />
          )}
        </div>
        <div className="max-w-md mt-4 w-full col-span-2 px-4">
          <h1 className="text-3xl mb-6">Přidat Oběd</h1>
          <div className="mb-4">
            <label className="block mb-2">Název:</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Název..."
              name="name"
              value={food.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Popis obědu:</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ingredience, původ, chuť atd..."
              name="description"
              value={food.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Obrázek:</label>
            <input
              className="w-full"
              type="file"
              accept=".jpg, .png, .heic, .gif, .bmp, .webp"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex">
            <button
              className="btn-primary flex items-center"
              onClick={submitPost}
            >
              <Image src={plusIcon} alt="plus" className="h-8 w-auto" />
              <span className="ml-2">Přidat Oběd</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Štítky:</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value=""
          onChange={handleTagChange}
          name="tags"
        >
          <option value="" disabled>
            Vybrat štítek
          </option>
          {foodTypes.map((foodType, index) => (
            <option
              key={index}
              value={foodType.name}
              style={{ margin: "1px", backgroundColor: foodType.color }}
            >
              {foodType.name}
            </option>
          ))}
        </select>
        <div>
          {food.tags.map((tag, index) => (
            <div
              key={index}
              className="selectedCategory mt-2"
              style={{
                backgroundColor: tag.color,
              }}
            >
              <span>{tag.name}</span>
              <button
                onClick={() => handleTagRemove(tag.name)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
