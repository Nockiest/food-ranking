'use client'

import { useState,useEffect } from 'react';
import { Container, Grid, Paper,Theme, makeStyles } from '@mui/material';
import Image from 'next/image';
import Choice from '@/components/Choice';
import Navbar from '@/components/Navbar';
import { User } from 'firebase/auth';
import { signInWithGoogle, auth  } from "../firebase";



export default function Home() {

  const [clicked, setClicked] = useState<boolean>(false);
  const [storedImages, setStoredImages] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [user, setUser] = useState<null|User>(null)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const handleClick = (image: string) => {
    console.log(`You clicked on ${image}`);
    setClicked(true);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []); // this exist for refreshing purpouses
  return (
    <Container className='w-full mx-0' >
         
     
      {user?  (<Grid container justifyContent="center">
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
//user={user} setUser={setUser}