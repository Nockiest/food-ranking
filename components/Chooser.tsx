"use client";
import { fetchFoods, getUserAuthentication } from "@/firebase";
import { useEffect, useState } from "react";
import Choice from "./Choice";
import { Container, Grid } from "@mui/material";
import { chooseRandomArrayValue } from "@/utils";
import { Food, isFood } from "@/types/types";
import { useAuth } from "@/app/authContext";
import { useFood } from "@/app/foodContext";
import { effect } from "@preact/signals";

const Chooser = () => {
  const [rivalFoods, setRivalFoods] = useState<
    [Food | undefined, Food | undefined]
  >([undefined, undefined]);
  const { userLoggedIn, votingAccount } = useAuth();
  const { Foods } = useFood();

  const processVote = (name:string) =>  {
    console.log('you have voted', name)
  }


  const getNewFoods = () => {
    if (Foods.value) {
      const food = chooseRandomArrayValue(Foods.value);
      const food2 = chooseRandomArrayValue(Foods.value.filter(val => val !== food));
      setRivalFoods([food, food2]);
    }
  };
  if (!userLoggedIn) {
    return <p>přihlašte se prosím</p>;
  }
  if (Foods.value?.length == 0) {
    return <p>počkejte na načtení obědů </p>;
  }
  if (rivalFoods[0]  == undefined && rivalFoods[1] == undefined) {
    return <button className="btn-primary" onClick={() => getNewFoods()}>
    Začít vybírat
  </button>
  }
  if (rivalFoods.find(val => {!isFood(val) || val == undefined})  ) {
    return <p>alespon jedno jidlo neni definovano</p>;
  }
  // add logic to handle state where all foods have been rated
  return (
    <Container className="w-full h-full  ">
      {votingAccount?.votes}
      {/* <Grid container direction="row" className="mx-auto" sm={10} spacing={2}> */}
        <div className="flex mt-6 flex-row justify-center align-center">
        {rivalFoods.map((food  , index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <Choice food={food as Food} handleClick={processVote} />
          </Grid>
        ))}
        </div>

      {/* </Grid> */}
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
