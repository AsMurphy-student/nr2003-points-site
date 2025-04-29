import { Box, Grid, Stack } from "@mui/material";
import { race } from "../interfaces/race";
import LapPieChart from "./LapPieChart";

function RaceInfo(props: {raceData: race, raceNumber: number}) {
  const { raceData, raceNumber } = props;

  return (
    <Grid container spacing={2} direction={{sm: 'column', md: 'row'}} sx={{backgroundColor: 'black'}}>
      <Grid minHeight='100%' sx={{maxWidth: {sm: '100%', md: '50%'}}}>
        <h1 style={{color: '#fff'}}>#{raceNumber}: {raceData.raceName}</h1>
        <h2 style={{color: '#fff'}}>{raceData.raceDate}</h2>
        <h3 style={{color: '#fff'}}>Winner: {raceData.finishes[0].driverName}</h3>
        <h3 style={{color: '#fff'}}>{raceData.leadChanges}</h3>
        <h3 style={{color: '#fff'}}>{raceData.cautions}</h3>
        <h3 style={{color: '#fff'}}>{raceData.weather}</h3>
        <h3 style={{color: '#fff'}}>{raceData.pitstopFrequency}</h3>
      </Grid>

      <Grid minHeight='100%' sx={{maxWidth: {sm: '100%', md: '50%'}}}>
        <h2 style={{color: '#fff', textAlign: 'center'}}>Laps Led</h2>
        <LapPieChart raceData={raceData}/>
      </Grid>
    </Grid>
    
  );
}

export default RaceInfo
