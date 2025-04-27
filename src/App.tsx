import { useState } from 'react'
import './App.css'
// import { ChartContainer, LineChart, LinePlot, LineSeriesType } from '@mui/x-charts'
import { Button, Container, createTheme, Stack } from '@mui/material'

import { driversData, driversPointsPerRace, racesData } from './jsonFetchers/rosterData'

// import { DataGrid, GridColDef, GridColumnsPanel, GridRowsProp, GridValidRowModel } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react'
import ChartLineGraph from './components/ChartLineGraph'
// import LapPieChart from './components/LapPieChart'
import RaceInfo from './components/RaceInfo'


function App() {
  const [count, setCount] = useState(0);
  
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

  // const defaultTheme = createTheme({
  //   colorSchemes: {
  //     light: {
  //       palette: {
  //         DataGrid: {
  //           bg: '#f8fafc',
  //           pinnedBg: '#f1f5f9',
  //           headerBg: '#eaeff5',
  //         },
  //       },
  //     },
  //     dark: {
  //       palette: {
  //         DataGrid: {
  //           bg: '#334155',
  //           pinnedBg: '#293548',
  //           headerBg: '#1e293b',
  //         },
  //       },
  //     },
  //   },
  // });

  return (
        <ThemeProvider theme={defaultTheme}>
          {/* <Box sx={{flexGrow: 1, minHeight: '100vh', backgroundColor: 'secondary.main'}}> */}
          <Container maxWidth='xl' sx={{flexGrow: 1, minHeight: '100vh', minWidth: '100%', backgroundColor: 'secondary.main'}}>
            <ChartLineGraph driversData={driversData} driversPointsPerRace={driversPointsPerRace} racesData={racesData} />
            
            {/* <h1 style={{color: 'white'}}>{racesData[count].raceName}</h1>
            <LapPieChart raceData={racesData[count]} />
          <Button
          onClick={() => {
            if (count < racesData.length - 1) {
              setCount(count + 1);
            }
            else {
              setCount(0);
            }
          }}
          sx={{color: 'secondary.contrastText'}}>
            Button
          </Button> */}

            <Stack direction='row'>
              <Button
                sx={{color: '#fff', border: '1px solid white'}}
                onClick={() => {
                  if (count > 0) {
                    setCount(count - 1);
                  }
                  else {
                    setCount(racesData.length - 1);
                  }
                }}
              >Prev</Button>
              <RaceInfo raceData={racesData[count]} raceNumber={count + 1} />
              <Button
                sx={{color: '#fff', border: '1px solid white'}}
                onClick={() => {
                  if (count < racesData.length - 1) {
                    setCount(count + 1);
                  }
                  else {
                    setCount(0);
                  }
                }}
              >Next</Button>
            </Stack>
          </Container>


          {/* </Box> */}

          {/* <Accordion>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ChartLineGraph driversData={driversData} driversPointsPerRace={driversPointsPerRace} racesData={racesData} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion> */}
        </ThemeProvider>
  )
}

export default App
