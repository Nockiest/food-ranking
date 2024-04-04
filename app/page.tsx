'use client'

import { useState,useEffect } from 'react';
import { Container, Grid, Paper,Theme, makeStyles } from '@mui/material';
import Image from 'next/image';
import Choice from '@/components/Choice';
import Navbar from '@/components/Navbar';
import { User } from 'firebase/auth';
import { signInWithGoogle, auth  } from "../firebase";
import { USER } from '@/signals';



export default function Home() {

  const [clicked, setClicked] = useState<boolean>(false);
  const [storedImages, setStoredImages] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const handleClick = (image: string) => {
    console.log(`You clicked on ${image}`);
    setClicked(true);
  };

  return (
    <Container className='w-full mx-0' >
      {USER.value?  (<Grid container justifyContent="center">
        <Grid item xs={4} >
         <Choice imageURL="/test.png" name={'img1'} percentPerformance={50}  handleClick={  handleClick  }  />
         </Grid>
         <Grid item xs={4} >
         <Choice imageURL="/mil.jpeg"  name={'img2'} percentPerformance={50}  handleClick={  handleClick  }  />
         </Grid>

      </Grid> ): (<p>přihlašte se prosím
      </p>)}

    </Container>
  );
}
 