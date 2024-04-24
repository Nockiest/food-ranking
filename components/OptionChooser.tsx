"use client";
// import { addFoodVote } from "@/firebase";
import { useEffect, useState, useReducer } from "react";
import Choice from "./Choice";
import { Container, Grid } from "@mui/material";
import { chooseRandomArrayValue } from "@/utils";
import { Food, Voter, isFood } from "@/types/types";
import { useAuth } from "@/app/authContext";
import { useFood } from "@/app/foodContext";
import { effect } from "@preact/signals";

enum OptionChooserState {
  NO_USER,
  WAITING_TO_BEGIN,
  MISSING_FOOD,
  VOTING,
}

const optionChooserReducer = (state: OptionChooserState, action: any) => {
  switch (action.type) {
    case "NO_USER":
      return OptionChooserState.NO_USER;
    case "WAITING_TO_BEGIN":
      return OptionChooserState.WAITING_TO_BEGIN;
    case "MISSING_FOOD":
      return OptionChooserState.MISSING_FOOD;
    case "VOTING":
      return OptionChooserState.VOTING;
    default:
      return state;
  }
};

const OptionChooser = () => {
  const [rivalFoods, setRivalFoods] = useState<
    [Food | undefined, Food | undefined]
  >([undefined, undefined]);
  const { votingAccount, makeDbVoterUpdate } = useAuth();
  const { Foods, addFoodVote } = useFood();
  const [undecidedFoods, setUndecidedFoods] = useState<Food[]>([]);
  const [state, dispatch] = useReducer(
    optionChooserReducer,
    OptionChooserState.NO_USER
  );
  useEffect(() => {
    if (votingAccount) {
      const foods = getFoodsWithUndecidedVotes();
      // console.log("undecided", foods.length);
      setUndecidedFoods(foods);
    }
  }, [Foods.value, votingAccount, votingAccount?.votedFoods]);

  useEffect(() => {
    if (votingAccount) {
      dispatch({ type: "WAITING_TO_BEGIN" });
    } else {
      dispatch({ type: "NO_USER" });
    }
  }, [votingAccount]);

  const processVote = async (food1: Food, food2: Food, name: string) => {
    if (name !== food1.name && name !== food2.name) {
      throw new Error(
        "Name argument must be equal to the name property of either food1 or food2"
      );
    } else if (!votingAccount) {
      throw new Error("Voting account not defined");
    }
    let updatedAccount = votingAccount;
    updatedAccount.votes += 1;
    if (!updatedAccount.votedFoods[food1.name]) {
      updatedAccount.votedFoods[food1.name] = [];
    }
    if (!updatedAccount.votedFoods[food2.name]) {
      updatedAccount.votedFoods[food2.name] = [];
    }
    updatedAccount.votedFoods[food1.name].push(food2);
    updatedAccount.votedFoods[food2.name].push(food1);
    await makeDbVoterUpdate(updatedAccount)

    addFoodVote(food1, food1.name === name);
    addFoodVote(food2, food2.name === name);
    const newUndecided = getFoodsWithUndecidedVotes()
    setUndecidedFoods(  newUndecided)
    Foods.value && getNewFoods(newUndecided);
  };

  const getNewFoods = async (foods: Food[] = undecidedFoods) => {
    setRivalFoods([undefined, undefined]);
    if (!votingAccount) {
      throw new Error("no voting account");
    }
    let rem = [...foods]; // Create a copy of Foods.value
    let food1: Food | undefined;
    let food2: Food | undefined;
    console.log(rem, " 1");
    food1 = chooseRandomArrayValue(rem);
    if (food1 && food1.name) {
      const foodIndex = rem.indexOf(food1);
      rem.splice(foodIndex, 1); // Remove the chosen food1 from rem
      // filter values that food1 cant vote anymore
      if (votingAccount.votedFoods[food1.name as string]) {
         rem.filter((food) => {
          votingAccount.votedFoods[food1.name as string]
            ? votingAccount.votedFoods[food1.name as string].indexOf(food) !== -1
            : true;
        });
      }
    }
    console.log(rem);
    if (!food1 || votingAccount.votedFoods[food1.name]?.length > rem.length) {
      console.log("Food is undefined. Exiting loop.", !food1, rem.length);
      dispatch({ type: "MISSING_FOOD" });
      return;
    }
    food2 = chooseRandomArrayValue(rem);
    if (food2) {
      console.log(
        votingAccount.votedFoods[food1.name]?.length,
        votingAccount.votedFoods[food1.name]?.indexOf(food2)
      );
      const foodIndex = rem.indexOf(food2);
      rem.splice(foodIndex, 1); // Remove the chosen food from rem
    }
    if (food1 && food2) {
      setRivalFoods([food1, food2]);
      dispatch({ type: "VOTING" });
    } else if (food1 && !food2) {
      const filteredFoods = foods.filter((food) => {
        food != food1;
      });
      getNewFoods(filteredFoods);
    } else {
      console.log("didnt found foods");
      dispatch({ type: "MISSING_FOOD" });
    }
  };

  function getFoodsWithUndecidedVotes(
    voter: Voter | null = votingAccount,
    foods: Food[] = Foods.value,
    allFoods: Food[] = Foods.value
  ) {
    if (!voter) {
      throw new Error("voter doesnt exist");
    }
    const allRecordedFoodLength = allFoods.length;
    // console.log("getting new undecided foods from: ", foods);
    const undecided = foods.filter((food) => {
      const voteLength = voter.votedFoods[food.name]?.length;
      console.log(
        voteLength,
        voter.votedFoods[food.name],
        allRecordedFoodLength
      );
      return voteLength ? voteLength < allRecordedFoodLength - 1 : true;
    });

    // console.log("undecided ", undecidedFoods);
    return undecided;
  }

  switch (state) {
    case OptionChooserState.NO_USER:
      return <p>Pro začátek se přihlašte</p>;
    case OptionChooserState.WAITING_TO_BEGIN:
      return (
        <button
          className="btn-primary"
          onClick={() => {
            const undecide = getFoodsWithUndecidedVotes();
            getNewFoods(undecide);
          }}
        >
          Začít Výbírat
        </button>
      );
    case OptionChooserState.MISSING_FOOD:
      return (
        <div>
          <p>Problém s načítáním jídel</p>
          <p>Počet jídel v databázi: {Foods.value ? Foods.value.length : 0}</p>
          <p>
            Počet jídel kde zbývá provést výběr:{" "}
            {undecidedFoods ? undecidedFoods.length : 0}
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              getNewFoods();
            }}
          >
            zkusit jiný pár
          </button>
        </div>
      );

    case OptionChooserState.VOTING:
      if (rivalFoods.indexOf(undefined) !== -1) {
        throw new Error(
          `rival foods contains undefined value when making vote ${rivalFoods}`
        );
      }
      return (
        <Container className="w-full h-full">
          <div className="flex mt-6 flex-row justify-center align-center">
            {rivalFoods.map((food, index) =>
              food ? (
                <Grid container   key={index} spacing={2} columns={{ xs: 1, sm: 1, md: 1 }} >
                  <Choice
                    food={food}
                    handleClick={() => {
                      processVote(
                        rivalFoods[0] as Food,
                        rivalFoods[1] as Food,
                        food.name
                      );
                    }}
                  />
                </Grid>
              ) : (
                <div key={index}>Food does not exist</div>
              )
            )}
          </div>
        </Container>
      );
    default:
      return <p>this state doesnt exist</p>;
  }
};

export default OptionChooser;
