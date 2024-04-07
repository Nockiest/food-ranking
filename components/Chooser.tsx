"use client";
import { fetchFoods, getUserAuthentication } from "@/firebase";
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
      const food2 = chooseRandomArrayValue(Foods.value.filter(val => val !== food));
      setRivalFoods([food, food2]);
      // console.log(food?.name);
    }
  };
  const handleClick = (image: string) => {
    console.log(`You clicked on ${image}`);
    getNewFoods();
  };
  // effect(() => console.log(Foods.value));
  if (!userLoggedIn) {
    return <p>přihlašte se prosím</p>;
  }
  if (Foods.value?.length == 0) {
    return <p>počkejte na načtení obědů </p>;
  }

  return (
    <Container className="w-full mx-0">

      {rivalFoods[0] !== undefined && rivalFoods[1] !== undefined ? (
        <Grid container direction="row">
          {/* {rivalFoods.every((value) => value !== undefined) ? ( */}
           { rivalFoods.map((food, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Choice food={food as Food} handleClick={handleClick} />
              </Grid>
            ))}
          {/* ) : ( */}
            {/* <p>jídla na výběr nebyla načtena {rivalFoods[0]?.name}  {rivalFoods[1]?.name} </p> */}
          {/* )} */}
        </Grid>
      ) : (
        <button className="btn-primary" onClick={() => getNewFoods()}>
          Začít vybírat
        </button>
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
