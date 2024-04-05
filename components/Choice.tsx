import Image from "next/image";
import Paper from "@mui/material/Paper";

interface ChoiceProps {
  handleClick: (image: string) => void;
  name: string;
  percentPerformance: number;
  imageURL: string;
}

function Choice({
  handleClick,
  name,
  imageURL,
  percentPerformance,
}: ChoiceProps) {
  return (
    
    <Paper
      className="m-2 p-2 flex flex-col items-start justify-center  cursor-pointer hover:shadow-lg"
      onClick={() => handleClick(name)}
    >
      <div className={"w-60 h-60"} style={{ position: "relative" }}>
        <Image
          src={imageURL}
          alt={name}
          layout={"fill"}
          placeholder="blur"
          objectFit="contain"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60DZ5wAAAABJRU5ErkJggg=="
        />
      </div>
      <h2 className="font-bold text-2xl">{name}</h2>

      <p>description</p>

      <div className="flex justify-end">
        <div className="text-end">{percentPerformance}%</div>
      </div>
    </Paper>
  );
}

export default Choice;
//layout={'fill'} w-80 h-20 height={100} width={100}
