"use client";
import { db, fetchFoods   } from "@/firebase";
import {   useState } from "react";
import Choice from "./Choice";
import { Container, Grid } from "@mui/material";
import { chooseRandomArrayValue } from "@/utils";
import { Food, isFood } from "@/types/types";
import { useAuth } from "@/app/authContext";
import { useFood } from "@/app/foodContext";
import { effect } from "@preact/signals";
import { collection,   getDocs } from "firebase/firestore";

const Chooser = () => {
  const [rivalFoods, setRivalFoods] = useState<
    [Food | undefined, Food | undefined]
  >([undefined, undefined]);
  const { userLoggedIn, votingAccount,makeDbVoterUpdate } = useAuth();
  const { Foods,  } = useFood();

  const processVote =   (name:string, ):void =>  {

    if (!votingAccount || !rivalFoods[0] || !rivalFoods[1]) {
      console.log(`something missing  voteac: ${votingAccount}  food0: ${rivalFoods[0]} food1: ${rivalFoods[1]}`)
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
    makeDbVoterUpdate(updatedAccount)
    getNewFoods()
  }


  const getNewFoods = async () => {
    setRivalFoods([undefined,undefined])
    if (Foods.value && votingAccount) {
      // Get the total number of foods in th
      const totalFoods = Foods.value.length
      let rem = [...Foods.value]; // Create a copy of Foods.value
      let food;
      let food2;
      // Choose random food and check if votedFoods length is one smaller or bigger
        console.log(rem, '1')
        food = chooseRandomArrayValue(rem);
        if (food) {
          const foodIndex = rem.indexOf(food);
          rem.splice(foodIndex, 1); // Remove the chosen food from rem
          if (votingAccount.votedFoods[food.name]) {
            rem = rem.filter(val => votingAccount.votedFoods[food.name].indexOf(val) === -1);
          }
        }
      if (!food|| !votingAccount|| rem.length <= 0 || votingAccount.votedFoods[food.name]?.length > totalFoods - 1) {
        console.log("Food is undefined. Exiting loop.", !food,!votingAccount, rem.length ,votingAccount.votedFoods[food.name]?.length > totalFoods - 1);
        return;
      }
      // Choose second food
      do {
        console.log(rem, '2')

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
      if (food&&food2){
        setRivalFoods([food, food2]);
      }
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
