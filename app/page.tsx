'use client'


import { Container, Grid, Paper,Theme, makeStyles } from '@mui/material';
import Image from 'next/image';
import Choice from '@/components/Choice';
import Navbar from '@/components/Navbar';
import { User } from 'firebase/auth';
import {   getUserAuthentication  } from "../firebase";
import { Foods, USER } from '@/signals';
import Refresher from '@/UniComponents/Refresher';
import Chooser from '@/components/Chooser';
import { useEffect } from 'react';



export default function Home() {

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       // You can await here
  //       const auth = await getUserAuthentication();
  //       return auth;
  //     } catch (error) {
  //       // Handle errors here
  //       console.error('Error fetching user authentication:', error);
  //       return null;
  //     }
  //   }

  //   async function updateUser() {
  //     const user = await fetchUser();
  //     USER.value = user;
  //   }

  //   updateUser();

  // }, []);

  return (
   <div>
<Chooser />
<Refresher  refreshers={[Foods.value, USER.value]} />
   </div>
  );
}
