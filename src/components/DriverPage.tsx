import { ThemeProvider } from "@emotion/react";
import { race } from "../interfaces/race";
import { Container } from "@mui/material";
import { defaultTheme } from "../variables/defaultTheme";
import { driver } from "../interfaces/driver";
import NavBar from "./NavBar";
import { GridColDef } from "@mui/x-data-grid";

function RacePage(props: { raceData: race, raceIndex: number, racesData: race[], driverData: driver[], seasonName: string }) {
  const { raceData, raceIndex, racesData, driverData, seasonName } = props;

  const columns: GridColDef[] = [
      { 
        field: 'id', 
        headerName: 'Rank', 
        flex: 1,
        maxWidth: 90,
        type: 'number', 
      },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar seasonName={seasonName} raceData={racesData} driverData={driverData} startingRacNum={raceIndex} />
      <Container maxWidth='xl' sx={{flexGrow: 1, minHeight: '100vh', minWidth: '100%', backgroundColor: 'secondary.main'}}>
        <h1 style={{ margin: 0, color: '#fff', paddingTop: '2rem'}}>{raceData.raceName}</h1>
      </Container>
    </ThemeProvider>
  );
}

export default RacePage
