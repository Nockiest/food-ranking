"use client";
import { fetchFoods, getUserAuthentication } from "@/firebase";
// import { Foods,  } from "@/signals";
import { useEffect, useState } from "react";
import Choice from "./Choice";
import { Container, Grid } from "@mui/material";
import { chooseRandomArrayValue } from "@/utils";
import { Food } from "@/types/types";
import { useAuth } from "@/app/authContext";
import { useFood } from "@/app/foodContext";
import { effect } from "@preact/signals";

const Chooser = () => {
  const [rivalFoods, setRivalFoods] = useState<
    [Food | undefined, Food | undefined]
  >([undefined, undefined]);
  const { userLoggedIn } = useAuth();
  const { Foods } = useFood();
  const getNewFoods = () => {
    if (Foods.value) {
      const food = chooseRandomArrayValue(Foods.value);
      const food2 = chooseRandomArrayValue(Foods.value);
      setRivalFoods([food, food2]);
      console.log(food);
    }
  };
  const handleClick = (image: string) => {
    console.log(`You clicked on ${image}`);
    getNewFoods();
  };
  effect(() => console.log(Foods.value))
  if (!userLoggedIn) {
    return <p>přihlašte se prosím</p>;
  } else if ( Foods .value?.length == 0) {
    return (
      <div>
        {Foods?.value?.map((food) => (
          <p key={food.id}>{food.id}</p>
        ))}
        <p>počkejte na načtení obědů   </p>
      </div>
    );
  }

  return (
    <Container className="w-full mx-0">
      <p>{rivalFoods[0]?.id}</p>
      {/* <p>{Foods.value[0]?.description}</p> */}

      {rivalFoods[0]?.id ? (
        <Grid item xs={4}>
          {rivalFoods.map((food, index) => (
            <Grid item xs={4} key={index}>
              {food && (
                <Choice
                  imageURL={food.imgFirebaseURL || ""}
                  name={food.name}
                  percentPerformance={food.percentRating}
                  handleClick={handleClick}
                />
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <button onClick={() => getNewFoods()}>Začít vybírat</button>
      )}
    </Container>
  );
};

export default Chooser;
//   <Grid item xs={4}>
//     <Choice
//       imageURL="/test.png"
//       name={"img1"}
//       percentPerformance={50}
//       handleClick={handleClick}
//     />
//   </Grid>
//   <Grid item xs={4}>
//     <Choice
//       imageURL="/mil.jpeg"
//       name={"img2"}
//       percentPerformance={50}
//       handleClick={handleClick}
//     />
//   </Grid>
// </Grid>
