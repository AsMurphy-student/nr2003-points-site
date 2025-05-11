import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
    palette: {
      
      mode: 'dark',
      background: {
        default: '#000',
      },
      text: {
        primary: '#fff',
        secondary: '#fff',
      },
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#fff',
      },
      secondary: {
        main: '#000000',
        contrastText: '#fff',
      },
    },
});

export { defaultTheme }
