"use client";
import { db, fetchFoods, getUserAuthentication } from "@/firebase";
import { useEffect, useState } from "react";
import Choice from "./Choice";
import { Container, Grid } from "@mui/material";
import { chooseRandomArrayValue } from "@/utils";
import { Food, isFood } from "@/types/types";
import { useAuth } from "@/app/authContext";
import { useFood } from "@/app/foodContext";
import { effect } from "@preact/signals";
import { collection, getDoc, getDocs } from "firebase/firestore";

const Chooser = () => {
  const [rivalFoods, setRivalFoods] = useState<
    [Food | undefined, Food | undefined]
  >([undefined, undefined]);
  const { userLoggedIn, votingAccount,setVotingAccount } = useAuth();
  const { Foods,  } = useFood();

  const processVote = (name:string, ):void =>  {
    if (!rivalFoods[0] || !rivalFoods[1]) {
      console.log('rival foods missing')
      return
    }
    if (!votingAccount) {
      console.log('voting account missing')
      return
    }
    console.log(rivalFoods, votingAccount)
    let updatedAccount = votingAccount
    updatedAccount.votes += 1
    if(!updatedAccount.votedFoods[rivalFoods[0].name]){
      updatedAccount.votedFoods[rivalFoods[0].name] = []
    }
    if(!updatedAccount.votedFoods[rivalFoods[1].name]){
      updatedAccount.votedFoods[rivalFoods[1].name] = []
    }
    updatedAccount.votedFoods[rivalFoods[0].name].push(rivalFoods[1])
    updatedAccount.votedFoods[rivalFoods[1].name].push(rivalFoods[0])
    setVotingAccount(updatedAccount)
    getNewFoods()
  }


  const getNewFoods = async () => {
    const colRef = collection(db, "Foods");

    if (Foods.value) {
      // Get the total number of foods in the collection
      const querySnapshot = await getDocs(colRef);
      const totalFoods = querySnapshot.docs.length;

      let rem = [...Foods.value]; // Create a copy of Foods.value

      let food;
      let food2;

      // Choose random food and check if votedFoods length is one smaller or bigger
      do {
        food = chooseRandomArrayValue(rem);
        if (food) {
          const foodIndex = rem.indexOf(food);
          rem.splice(foodIndex, 1); // Remove the chosen food from rem
        }
      } while (
        food &&
        rem.length > 0 &&
        votingAccount &&
        votingAccount.votedFoods[food.name]?.length > totalFoods - 1
      );

      // If food is undefined, break the loop immediately
      if (!food) {
        console.log("Food is undefined. Exiting loop.");
        return;
      }

      // Choose second food
      do {
        food2 = chooseRandomArrayValue(rem);
        if (food2) {
          const foodIndex = rem.indexOf(food2);
          rem.splice(foodIndex, 1); // Remove the chosen food from rem
        }
      } while (
        food2 &&
        rem.length > 0 &&
        votingAccount &&
        votingAccount.votedFoods[food2.name]?.length > totalFoods - 1
      );
      console.log(food, food2, 'chosen')
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
  if (rivalFoods[0]  == undefined  || rivalFoods[1] == undefined  ) {
    return <p>už není co vybírat</p>;
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
