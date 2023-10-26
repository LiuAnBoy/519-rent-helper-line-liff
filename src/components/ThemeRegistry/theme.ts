import { orange, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: orange[500],
    },
    text: {
      primary: '#293264',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  zIndex: {
    snackbar: 1500,
  },

  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#ccc',
          borderWidth: '0.2px',
          width: '100%',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#293264',
          padding: '4px 24px',
          border: '1px solid !important',
          borderRadius: '0',
          fontSize: 'medium',
          '&.Mui-selected': {
            backgroundColor: '#556cd6',
            border: '1px solid !important',
            borderColor: '#556cd6 !important',
            color: '#fff',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#556cd6',
            border: '1px solid !important',
            borderColor: '#556cd6 !important',
            color: '#fff',
          },
          '&:hover': {
            backgroundColor: '#556cd6',
            border: '1px solid !important',
            borderColor: '#556cd6 !important',
            color: '#fff',
          },
        },
      },
    },
  },
});

export default theme;
