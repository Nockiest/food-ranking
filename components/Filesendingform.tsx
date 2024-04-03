import "./fileSendingForm.css";
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image'
interface FileSendingFormProps {
  onFileUpload: (data: FormData) => Promise<void>;
  user: { displayName: string };
}

const FileSendingForm: React.FC<FileSendingFormProps> = ({ onFileUpload, user }) => {
  const [filename, setFilename] = useState('');
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Get the selected files

    if (!files) return;

    // Create a new FileList object
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < files.length; i++) {
      dataTransfer.items.add(files[i]);
    }
    const fileList = dataTransfer.files;

    // Set the imageUpload state to the FileList
    setImageUpload(fileList);

    // Show image preview for the first file
    const reader = new FileReader();
    reader.onload = function (e) {
      if (imagePreviewRef.current && e.target?.result) {
        imagePreviewRef.current.src = e.target.result.toString();
      }
    };
    reader.readAsDataURL(fileList[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageUpload || imageUpload.length === 0) {
      return alert('Please choose a file');
    }

    try {
      // Perform actions with the selected files, such as uploading to a server
      const formData = new FormData();
      formData.append('filename', filename);
      formData.append('description', 'null');
      formData.append('category', 'x');
      formData.append('subcategory', 'y');
      formData.append('user', user.displayName.replace(/\s/g, ''));
      if (imageUpload) {
        for (let i = 0; i < imageUpload.length; i++) {
          formData.append('files', imageUpload[i]);
        }
      }

      await onFileUpload(formData);

      // Reset the form fields and file input
      setFilename('');
      setImageUpload(null);
      fileInputRef.current!.value = '';
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="input-field-row">
        <div className="input-field">
          <label htmlFor="filename">Filename:</label>
          <input
            type="text"
            id="filename"
            name="filename"
            value={filename}
            required
            onChange={(e) => setFilename(e.target.value)}
          />
        </div>
      </div>
      <div className="img-preview">
        {imageUpload && (
          <Image className={"preview-image"} src={""} alt={"Preview"} layout={"fill"}/>
// ref={imagePreviewRef}
          // <img className="preview-image" src="" alt="Preview" ref={imagePreviewRef} />
        )}
      </div>
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          multiple  // Add 'multiple' attribute to allow selecting multiple files
        />
      </div>
      <input type="submit" value="Upload" />
    </form>
  );
};

export default FileSendingForm;
