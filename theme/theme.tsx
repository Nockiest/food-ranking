'use client'

import React from 'react';
import ReactDOM from 'react-dom/client';


// import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme} from "@mui/material"


const theme = createTheme({
    palette: {
      primary: {
        main: "#ffadff"
      }
    },
    spacing: 5,

  });

export default theme
