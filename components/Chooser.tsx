"use client";
import { fetchFoods } from "@/firebase";
import { Foods, USER } from "@/signals";
import React, { useEffect } from "react";
import Choice from "./Choice";
import { Container, Grid } from "@mui/material";
import { chooseRandomArrayValue } from "@/utils";

const Chooser = () => {
  const handleClick = (image: string) => {
    console.log(`You clicked on ${image}`);
    const food = chooseRandomArrayValue(Foods.value)
    console.log(food)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        Foods.value = await fetchFoods();
        console.log("Data fetched successfully:", Foods.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="w-full mx-0">
      {USER.value ? (
        <Grid container justifyContent="center">
          <Grid item xs={4}>
            <Choice
              imageURL="/test.png"
              name={"img1"}
              percentPerformance={50}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={4}>
            <Choice
              imageURL="/mil.jpeg"
              name={"img2"}
              percentPerformance={50}
              handleClick={handleClick}
            />
          </Grid>
        </Grid>
      ) : (
        <p>
          přihlašte se prosím <span>{USER.value}</span> x
        </p>
      )}
    </Container>
  );
};

export default Chooser;
