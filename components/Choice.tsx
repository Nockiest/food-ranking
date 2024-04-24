import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Grid, Paper } from "@mui/material";
import Image from "next/image";
import { Food } from "@/types/types";
import placeholderIMG from "../public/ImagePlaceholder.png";
interface ChoiceProps {
  handleClick: (image: string) => void;
  food: Food;
}

function Choice({ food, handleClick }: ChoiceProps) {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (food?.imageId) {
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
  }, [food]);

  const { name, votes, tags } = food;
  const percentRating = ((votes.won / votes.total) * 100).toFixed(2);

  return (
    <Grid item xs={6}  sm={ 4}  md={ 4}  >
      <Paper
        className="select-none md:m-2  md:p-2 flex flex-col items-start justify-center  cursor-pointer hover:shadow-lg"
        onClick={() => handleClick(name)}
      >
        <div className={"w-60 h-60 mx-auto"} style={{ position: "relative" }}>
          <Image
            src={imageDataUrl ? imageDataUrl : placeholderIMG}
            alt={name}
            layout="fill"
            className={"select-none"}
            placeholder="blur"
            objectFit="contain"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60DZ5wAAAABJRU5ErkJggg=="
          />
        </div>
        <h2 className="font-bold text-2xl">{name}</h2>

        <p>description</p>
        {tags.map((tag) => (
          <p key={tag.name} style={{ color: tag.color }}>
            {tag.name}
          </p>
        ))}

        <div className="flex justify-end">
          <div className="text-end">
            Jídlo vyhrálo {percentRating}% voleb z {votes.total}
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default Choice;
