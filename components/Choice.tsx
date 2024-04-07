import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Paper } from "@mui/material";
import Image from "next/image";
import { Food } from "@/types/types";

interface ChoiceProps {
  handleClick: (image: string) => void;
  food: Food;

}

function Choice({
  food,
  handleClick,
}:
ChoiceProps) {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  useEffect(() => {
    console.log(food, food.imageId, "loading");
    if (food.imageId) {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${food.imageId}`); // Assuming the images are stored in the "images" folder
      getDownloadURL(imageRef)
        .then((url) => {
          setImageDataUrl(url);
        })
        .catch((error) => {
          console.error("Error retrieving image:", error);
        });
    }
  }, [food,food.imageId  ]);

  if (!food){
    return <p>food is missing</p>
  }
  const { imageId, name, votes, tags } = food;
  const percentRating = votes.total / votes.won


  return (
    <Paper
      className="m-2 p-2 flex flex-col items-start justify-center  cursor-pointer hover:shadow-lg"
      onClick={() => handleClick(name)}
    >
      <div className={"w-60 h-60"} style={{ position: "relative" }}>
        {imageDataUrl && (
          <Image
            src={imageDataUrl}
            alt={name}
            layout={"fill"}
            placeholder="blur"
            objectFit="contain"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60DZ5wAAAABJRU5ErkJggg=="
          />
        )}
      </div>
      <h2 className="font-bold text-2xl">{name}</h2>
      {imageId}
      <p>description</p>
      {tags.map((tag) => (
        <p key={tag.name} style={{ color: tag.color }}>
          {tag.name}
        </p>
      ))}

      <div className="flex justify-end">
        <div className="text-end">{percentRating}%</div>
      </div>
    </Paper>
  );
}

export default Choice;

//layout={'fill'} w-80 h-20 height={100} wimageIdth={100}
