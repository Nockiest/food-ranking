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
import { AuthProvider } from './context';



export default function Home() {



    return (
      <AuthProvider> {/* Wrap your component tree with AuthProvider */}
        <Chooser />
        <Refresher refreshers={[Foods.value, ]} />
      </AuthProvider>
    );
}
