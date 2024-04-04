

import { Container, Grid, Paper,Theme, makeStyles } from '@mui/material';
import Image from 'next/image';
import Choice from '@/components/Choice';
import Navbar from '@/components/Navbar';
import { User } from 'firebase/auth';
import { signInWithGoogle, auth, fetchFoods  } from "../firebase";
import { Foods, USER } from '@/signals';
import Refresher from '@/UniComponents/Refresher';
import Chooser from '@/components/Chooser';



export default function Home() {
  return (
   <div>
<Chooser />
<Refresher  refreshers={[Foods.value, USER.value]} />
   </div>
  );
}
