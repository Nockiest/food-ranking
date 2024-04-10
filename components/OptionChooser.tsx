"use client";
import { addFoodVote, db,   } from "@/firebase";
import { useEffect, useState, useReducer } from "react";
import Choice from "./Choice";
import { Container, Grid } from "@mui/material";
import { chooseRandomArrayValue } from "@/utils";
import { Food, isFood } from "@/types/types";
import { useAuth } from "@/app/authContext";
import { useFood } from "@/app/foodContext";
import { effect } from "@preact/signals";
import { doc, setDoc } from "firebase/firestore";

// i should funnel the logic in this function to prevent sideeffects

enum OptionChooserState {
  LOADING,
  WAITING_FOR_SELECTION,
  VOTING_SESSION_STARTED,
}

// Define the reducer function
const optionChooserReducer = (state: OptionChooserState, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return OptionChooserState.LOADING;
    case 'WAITING_FOR_SELECTION':
      return OptionChooserState.WAITING_FOR_SELECTION;
    case 'VOTING_SESSION_STARTED':
      return OptionChooserState.VOTING_SESSION_STARTED;
    default:
      return state;
  }
};

const OptionChooser = () => {
  const [rivalFoods, setRivalFoods] = useState<
    [Food | undefined, Food | undefined]
  >([undefined, undefined]);
  const { userLoggedIn, votingAccount, makeDbVoterUpdate } = useAuth();
  const { Foods } = useFood();
  const [state, dispatch] = useReducer(optionChooserReducer, OptionChooserState.LOADING);

  const processVote = (name: string): void => {
    if (!votingAccount || !rivalFoods[0] || !rivalFoods[1]) {
      console.log(
        `something missing  voteac: ${votingAccount}  food0: ${rivalFoods[0]} food1: ${rivalFoods[1]}`
      );
      return;
    }
    console.log(rivalFoods, votingAccount);
    let updatedAccount = votingAccount;
    updatedAccount.votes += 1;
    if (!updatedAccount.votedFoods[rivalFoods[0].name]) {
      updatedAccount.votedFoods[rivalFoods[0].name] = [];
    }
    if (!updatedAccount.votedFoods[rivalFoods[1].name]) {
      updatedAccount.votedFoods[rivalFoods[1].name] = [];
    }
    updatedAccount.votedFoods[rivalFoods[0].name].push(rivalFoods[1]);
    updatedAccount.votedFoods[rivalFoods[1].name].push(rivalFoods[0]);
    makeDbVoterUpdate(updatedAccount);
    
    addFoodVote(rivalFoods[0], rivalFoods[0].name === name)
    addFoodVote(rivalFoods[1], rivalFoods[1].name === name)
    // updateFoodStats(name);

    Foods.value && getNewFoods(Foods.value);
  };
  useEffect(() => {
    if (Foods.value && rivalFoods[0] && rivalFoods[1]) {
      const index1 = Foods.value.findIndex((food) => food === rivalFoods[0]);
      const index2 = Foods.value.findIndex((food) => food === rivalFoods[1]);

      if (index1 !== -1) {
        Foods.value[index1] = rivalFoods[0];
      }
      if (index2 !== -1) {
        Foods.value[index2] = rivalFoods[1];
      }
    }
  }, [Foods.value, rivalFoods]);
  useEffect(() => {
    if (userLoggedIn){
    dispatch({ type: 'WAITING_FOR_SELECTION' });
    } else {
      dispatch({ type: 'LOADING' });
    }
  }, [userLoggedIn])
  const getNewFoods = async (foods: Food[]) => {
    setRivalFoods([undefined, undefined]);
    if (foods && votingAccount) {
      // Get the total number of foods in th
      const totalFoods = foods.length;
      let rem = [...foods]; // Create a copy of Foods.value
      let food1:Food|undefined;
      let food2:Food|undefined;
      console.log(rem, "1");
      food1 = chooseRandomArrayValue(rem);
      if (food1 && food1.name) {
        const fName = food1.name
        const foodIndex = rem.indexOf(food1);
        rem.splice(foodIndex, 1); // Remove the chosen food1 from rem
        if (votingAccount.votedFoods[fName]  ) {
          rem = rem.filter(
            (val) => votingAccount.votedFoods[fName].indexOf(val) === -1
          );
        }
      }
      if (
        !food1 ||
        !votingAccount ||
        rem.length <= 0 ||
        votingAccount.votedFoods[food1.name]?.length > totalFoods - 1
      ) {
        console.log(
          "Food is undefined. Exiting loop.",
          !food1,
          !votingAccount,
          rem.length,
        );
        return;
      }
      // Choose second food
      do {
        console.log(rem, "2");

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
      if (food1 && food2) {
        setRivalFoods([food1, food2]);
      } else if (foods.length > 1 && food1){
        getNewFoods(foods.filter(food => {food1 != food1}))
      }
    }
  };

  // const updateFoodStats = async (
  //   winnerName: string,
  //   food1: Food = rivalFoods[0] as Food,
  //   food2: Food = rivalFoods[1] as Food
  // ) => {
  //   // if (food1 && food2) {
  //   //   // Increment total votes for both foods
  //   //   food1.votes.total += 1;
  //   //   food2.votes.total += 1;

  //   //   // Increment won votes for the winner
  //   //   if (food1.name === winnerName) {
  //   //     food1.votes.won += 1;
  //   //   } else if (food2.name === winnerName) {
  //   //     food2.votes.won += 1;
  //   //   }
  //   // }
  //   // await setDoc(doc(db, "Foods", food1.imageId), food1);
  //   // await setDoc(doc(db, "Foods", food2.imageId), food2);
  // };
  switch (state) {
    case OptionChooserState.LOADING:
      return <p>Loading...</p>;
    case OptionChooserState.WAITING_FOR_SELECTION:
      return (
        <button className="btn-primary" onClick={() => { 
          getNewFoods(Foods?.value)
          dispatch({ type: 'VOTING_SESSION_STARTED' })}}
          >
          Start voting
        </button>
      );
    case OptionChooserState.VOTING_SESSION_STARTED:
      return (
        <Container className="w-full h-full">
          <div className="flex mt-6 flex-row justify-center align-center">
            {rivalFoods.map((food, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Choice food={food as Food} handleClick={processVote} />
              </Grid>
            ))}
          </div>
        </Container>
      );
    default:
      return null;
  }
}

export default OptionChooser;

//   if (!userLoggedIn) {
//     return <p>přihlašte se prosím</p>;
//   }

//   // if (rivalFoods[0] == undefined || rivalFoods[1] == undefined) {
//   //   return <p>už není co vybírat</p>;
//   // }
//   if (rivalFoods[0] == undefined && rivalFoods[1] == undefined && !votingSessionStarted) {
//     return (
//       <button className="btn-primary" onClick={() => getNewFoods(Foods.value? Foods.value : [])}>
//         Začít vybírat
//       </button>
//     );
//   }
//   if ( Foods.value === null ) {
//     console.log(Foods.value)
//     return <p>počkejte na načtení obědů </p>;
//   }
//   // add logic to handle state where all foods have been rated
//   return (
//     <Container className="w-full h-full  ">
//       <div className="flex mt-6 flex-row justify-center align-center">
//         {rivalFoods.map((food, index) => (
//           <Grid item xs={4} sm={4} md={4} key={index}>
//             <Choice food={food as Food} handleClick={processVote} />
//           </Grid>
//         ))}
//       </div>

//     </Container>
//   );
// };