"use client"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import {serverTimestamp, addDoc, collection } from "firebase/firestore";
import {storage, colRef, db, auth } from "@/firebase";
import { useRouter } from "next/router";
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from "@/types/types";
import { foodTypes } from "@/globalValues";
import { Paper } from "@mui/material";


const CreateFood = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    if (!selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  const handleCategoryRemove = (category: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const submitPost = async () => {
    const postId = uuidv4();
    const timeStamp = serverTimestamp();

    // Create the food document
    const docRef = await addDoc(collection(db, 'Foods'), {
      title,
      description,
      tags: [],
      categories: selectedCategories,
      postId,
      timeStamp,
    });

    // Upload image if provided
    if (imageUpload) {
      uploadFile(postId);
    }

    // Clear input fields
    setTitle('');
    setDescription('');
    setSelectedCategories([]);

    // Show alert with food details
    const alertMessage = `Food Title: ${title}\nFood Description: ${description}\nCategories: ${selectedCategories.join(', ')}\nImage ID: ${postId} `;
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

  return (
    <div className="flex justify-center items-center h-auto">
      <div className="max-w-md w-full px-4">
        <h1 className="text-3xl mb-6">Add New Food</h1>
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Description..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Categories:</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value=""
            onChange={handleCategoryChange}
          >
            <option value="" disabled>Select Category</option>
            {foodTypes.map((foodType, index) => (
              <option key={index} value={foodType.name} style={{ backgroundColor: foodType.color }}>
                {foodType.name}
              </option>
            ))}
          </select>
          <div>
            {selectedCategories.map((category, index) => (
              <div key={index} className="selectedCategory mt-2" style={{ backgroundColor: foodTypes.find(ft => ft.name === category)?.color }}>
                <span>{category}</span>
                <button onClick={() => handleCategoryRemove(category)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image:</label>
          <input
            className="w-full"
            type="file"
            accept=".jpg, .png, .heic, .gif, .bmp, .webp"
            onChange={(event) => {
              setImageUpload(event.target.files ? event.target.files[0] : null);
            }}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={submitPost}>Add Food</button>
        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2 hover:bg-gray-400">
          <Link href="/blog">Go to Blog</Link>
        </button>
      </div>
    </div>
  );
};

export default CreateFood;
