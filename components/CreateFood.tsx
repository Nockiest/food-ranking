"use client";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { storage, colRef, db, auth } from "@/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "@/types/types";
import { foodTypes } from "@/globalValues";
import { Paper } from "@mui/material";

import plusIcon from "../svg/plus-large.svg";
import Image from "next/image";

const CreateFood = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    if (!selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  const handleCategoryRemove = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const submitPost = async () => {
    const postId = uuidv4();
    const timeStamp = serverTimestamp();

    // Create the food document
    const docRef = await addDoc(collection(db, "Foods"), {
      title,
      description,
      tags: [],
      categories: selectedCategories,
      id:postId,
      timeStamp,
    });

    // Upload image if provided
    if (imageUpload) {
      uploadFile(postId);
    }

    // Clear input fields
    setTitle("");
    setDescription("");
    setSelectedCategories([]);

    // Show alert with food details
    const alertMessage = `Food Title: ${title}\nFood Description: ${description}\nCategories: ${selectedCategories.join(
      ", "
    )}\nImage ID: ${postId} `;
    alert(`Food added!\n\n${alertMessage}`);

    // Console log the image ID and the food ID
    alert(`Image ID: ${postId} Food ID: ${docRef.id}`);
  };

  const uploadFile = (postId: string) => {
    const imageRef = ref(storage, `images/${postId}`);

    uploadBytes(imageRef, imageUpload as Blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
      });
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  // keep all czech descriptions in czech
  return (
    <div className="flex h-full justify-center align-center items-center  ">
      <div className='flex flex-row' >
        <div className="w-24 h-24 border-black">

        {imagePreview && (
            <Image width={100} height={100} src={imagePreview} alt="Image Preview" className="mt-2  " />
          )}
        </div>
        <div className="max-w-md mt-4 w-full   flex flex-col justify-center align-center  px-4">
        <h1 className="text-3xl mb-6">Přidat Oběd</h1>
        <div className="mb-4">
          <label className="block mb-2">Název:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Název..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Popis obědu:</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="ingredience, původ, chuť atd..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Štítky:</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value=""
            onChange={handleCategoryChange}
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
            {selectedCategories.map((category, index) => (
              <div
                key={index}
                className="selectedCategory mt-2"
                style={{
                  backgroundColor: foodTypes.find((ft) => ft.name === category)
                    ?.color,
                }}
              >
                <span>{category}</span>
                <button
                  onClick={() => handleCategoryRemove(category)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
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
        <button className="btn-primary flex items-center" onClick={submitPost}>
          <Image src={plusIcon} alt="plus" className="h-8 w-auto" />
          <span className="ml-2">Přidat Oběd</span>
        </button>

          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2 hover:bg-gray-400">
            <Link href="/blog">Na Hlavní Stránku</Link>
          </button>
        </div>
      </div>
        </div>
    </div>
  );
};

export default CreateFood;
