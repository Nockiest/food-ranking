// 'use client'


import { Container, Grid, Paper,Theme, makeStyles } from '@mui/material';
import Image from 'next/image';
import Choice from '@/components/Choice';
import Navbar from '@/components/Navbar';
import { User } from 'firebase/auth';
import {   getUserAuthentication  } from "../firebase";
// import { Foods } from '@/signals';
import Refresher from '@/UniComponents/Refresher';
import Chooser from '@/components/Chooser';
import { useEffect, useState } from 'react';
import { AuthProvider } from './authContext';
import { FoodsProvider } from './foodContext';



export default function Home() {
  // const [key,setKey] = useState(1)
  //  useEffect(()=> {
  //   setKey(Math.random())
  //   console.log('val changed')
  //  }, [Foods.value])

    return (
      <AuthProvider> {/* Wrap your component tree with AuthProvider */}
      <FoodsProvider>

      <Chooser   />

      </FoodsProvider>
        {/* <Refresher refreshers={[Foods.value, ]} /> */}
      </AuthProvider>
    );
}
