'use client'

import { useState } from 'react';
import { Container, Grid, Paper,Theme, makeStyles } from '@mui/material';
import Image from 'next/image';
import Choice from '@/components/Choice';




export default function Home() {

  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = (image: string) => {
    console.log(`You clicked on ${image}`);
    setClicked(true);
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={4} >
         <Choice imageURL="/test.png" name={'img1'} percentPerformance={50}  handleClick={  handleClick  }  />
         </Grid>
         <Grid item xs={4} >
         <Choice imageURL="/mil.jpeg"  name={'img2'} percentPerformance={50}  handleClick={  handleClick  }  />
         </Grid>

      </Grid>
    </Container>
  );
}

 
