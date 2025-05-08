import { Grid } from "@mui/material";
import { race } from "../interfaces/race";
import LapPieChart from "./LapPieChart";

function RaceInfo(props: { raceData: race }) {
  const { raceData } = props;

  console.log(raceData);

  return (
    <Grid container spacing={2} direction={{sm: 'column', md: 'row'}} sx={{backgroundColor: 'black'}} width='100%'>
      <Grid minHeight='100%'>
        <h2 style={{color: '#fff'}}>{raceData.raceName}</h2>
        <h2 style={{color: '#fff'}}>{raceData.raceDate}</h2>
        <h3 style={{color: '#fff'}}>Winner: {raceData.finishes[0].driverName}</h3>
        <h3 style={{color: '#fff'}}>{raceData.leadChanges}</h3>
        <h3 style={{color: '#fff'}}>{raceData.cautions}</h3>
        <h3 style={{color: '#fff'}}>{raceData.weather}</h3>
        <h3 style={{color: '#fff'}}>{raceData.pitstopFrequency}</h3>
      </Grid>

      <Grid minHeight='100%' size='grow'>
        <h2 style={{color: '#fff', textAlign: 'center'}}>Laps Led</h2>
        <LapPieChart raceData={raceData}/>
        
      </Grid>

      {/* <Grid minHeight='100%' size='auto'>
        <img src="https://placehold.co/600x400"></img>
      </Grid> */}

    </Grid>
    
  );
}

export default RaceInfo
