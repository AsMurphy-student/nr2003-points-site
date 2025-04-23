import { useState } from 'react'
import './App.css'
import { ChartContainer, LineChart, LinePlot, LineSeriesType } from '@mui/x-charts'
import { Box, createTheme, Stack } from '@mui/material'

import { driversData, driversPointsPerRace, racesData } from './jsonFetchers/rosterData'

import { DataGrid, GridColDef, GridColumnsPanel, GridRowsProp, GridValidRowModel } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react'
import ChartLineGraph from './components/ChartLineGraph'

function App() {
  // const [count, setCount] = useState(0);
  
  const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
      text: {
        primary: '#fff'
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
      }
    },
    
  });

  return (
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{padding: '2rem', backgroundColor: 'secondary.main'}}>
            <ChartLineGraph driversData={driversData} driversPointsPerRace={driversPointsPerRace} racesData={racesData} />
          </Box>
        </ThemeProvider>
  )
}

export default App
