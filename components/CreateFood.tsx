"use client"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import {serverTimestamp, addDoc, collection } from "firebase/firestore";
import {storage, colRef, db, auth } from "@/firebase";
import { useRouter } from "next/router";
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from "@/types/types";

const CreateFood = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [imageUpload, setImageUpload] = useState<File | null>(null);
  
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(event.target.value);
    };
  
    // const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const enteredTags = event.target.value.split(',').map((tag) => tag.trim());
    //   setSelectedTags(enteredTags);
    // };
  
    // const handleAddTag = () => {
    //   if (selectedTags.length > 0 && !selectedTags.includes(selectedTags[0])) {
    //     setSelectedTags((prevTags) => [...prevTags, selectedTags[0]]);
    //   }
    // };
  
    // const handleRemoveTag = (tag: string) => {
    //   setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    // };
    const submitPost = async () => {
        const postId = uuidv4();
        const timeStamp = serverTimestamp();
      
        // Create the blog post document
        const docRef = await addDoc(collection(db, 'Foods'), {
          title,
          description,
          tags: [],
          category: selectedCategory,
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
        setSelectedCategory('');
      
        // Show alert with post contents
        const alertMessage = `Post Title: ${title}\nPost Text: ${description}\nCategory: ${selectedCategory}\nImage ID: ${postId} `;
        alert(`Post sent!\n\n${alertMessage}`);
      
        // Console log the image ID and the post ID
        alert(`Image ID: ${postId} Post ID: ${docRef.id}`);
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
      <div className="createPostPage">
        <div className="cpContainer">
          <h1>Přidat Jídlo</h1>
          <div className="inputGp">
            <label>Název:</label>
            <input
              placeholder="Title..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="inputGp">
            <label>Popis Jídla:  &#123;ingredience, chuť, zajímavosti &#125;</label>
            <textarea
              placeholder="Post..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
      
          <div className="inputGp">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Life">Life</option>
              <option value="Coding">Coding</option>
            </select>
          </div>
          <div className="inputGp">
            <label>Image URL:</label>
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files ? event.target.files[0] : null);
              }}
            />
          </div>
          <button onClick={submitPost}>Submit Post</button>
          <button className="add">
            <Link href="/blog">Go to Blog</Link>
          </button>
        </div>
      </div>
    );
  };
  
  export default CreateFood;

//   \nTags: ${selectedTags.join(
//     ', '
//   )}
    {/* <div className="inputGp">
            <label>Tags:</label>
            <div className="tagsInput">
              {selectedTags.map((tag) => (
                <div key={tag} className="tagChip">
                  {tag}
                  <button
                    className="removeTagButton"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                placeholder="Add tags..."
                value={selectedTags.join(', ')}
                onChange={handleTagChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleAddTag();
                  }
                }}
              />
            </div>
          </div> */}