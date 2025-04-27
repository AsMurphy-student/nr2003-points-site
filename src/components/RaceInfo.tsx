import { Box, Stack, ThemeProvider } from "@mui/material";
import { race } from "../interfaces/race";
import LapPieChart from "./LapPieChart";
import { Theme } from "@emotion/react";

function RaceInfo(props: {raceData: race, raceNumber: number}) {
  const { raceData, raceNumber } = props;

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Stack direction='row' sx={{minHeight: '10vh', flexGrow: 1}}>
      <Box sx={{backgroundColor: 'black', flexGrow: 1, minWidth: '60%'}}>
        <h1 style={{color: '#fff'}}>#{raceNumber}: {raceData.raceName}</h1>
        <h2 style={{color: '#fff'}}>{raceData.raceDate}</h2>
        <h3 style={{color: '#fff'}}>Winner: {raceData.finishes[0].driverName}</h3>
        <h3 style={{color: '#fff'}}>{raceData.leadChanges}</h3>
        <h3 style={{color: '#fff'}}>{raceData.cautions}</h3>
        <h3 style={{color: '#fff'}}>{raceData.weather}</h3>
        <h3 style={{color: '#fff'}}>{raceData.pitstopFrequency}</h3>
      </Box>
      <Box sx={{backgroundColor: 'black', placeContent: 'center', flexGrow: 0.1, padding: '2rem'}}>
        <h2 style={{color: '#fff', textAlign: 'center'}}>Laps Led</h2>
        <LapPieChart raceData={raceData}/>
      </Box>
    </Stack>
    // </ThemeProvider>
  );
}

export default RaceInfo
