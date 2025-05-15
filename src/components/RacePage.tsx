import { ThemeProvider } from "@emotion/react";
import { race } from "../interfaces/race";
import { Container, Grid } from "@mui/material";
import { defaultTheme } from "../variables/defaultTheme";
import { driver } from "../interfaces/driver";
import NavBar from "./NavBar";
import { DataGrid, GridColDef, GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import LapPieChart from "./LapPieChart";

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
      { 
        field: 'driverName', 
        headerName: 'Driver Name', 
        flex: 1,
        maxWidth: 120,
        type: 'string', 
      },
      { 
        field: 'carNumber', 
        headerName: 'Car Number', 
        flex: 1,
        maxWidth: 100,
        type: 'number', 
      },
      { 
        field: 'interval', 
        headerName: 'Interval', 
        flex: 1,
        maxWidth: 90,
        type: 'string', 
      },
      { 
        field: 'lapsLed', 
        headerName: 'Laps Led', 
        flex: 1,
        maxWidth: 90,
        type: 'number', 
      },
      { 
        field: 'lapsCompleted', 
        headerName: 'Laps Completed', 
        flex: 1,
        maxWidth: 130,
        type: 'number', 
      },
      { 
        field: 'status', 
        headerName: 'Status', 
        flex: 1,
        maxWidth: 90,
        type: 'string', 
      },
  ];

  let temprows: GridValidRowModel[] = [];
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    temprows = [];
    for (let d=0;d<raceData.finishes.length;d++) {
      const driverRow: GridValidRowModel = {
        id: d+1,
        driverName: raceData.finishes[d].driverName,
        carNumber: raceData.finishes[d].carNumber,
        interval: raceData.finishes[d].interval,
        lapsLed: raceData.finishes[d].lapsLed,
        lapsCompleted: raceData.finishes[d].lapsCompleted,
        status: raceData.finishes[d].status,
      };
      temprows.push(driverRow);
    };
    setRows(temprows);
  }, [raceData]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar seasonName={seasonName} raceData={racesData} driversData={driverData} startingRaceNum={raceIndex} startingDriverNum={0} />
        <Container maxWidth='xl' sx={{flexGrow: 1, minHeight: '100vh', minWidth: '100%', backgroundColor: 'secondary.main'}}>
          <h1 style={{ margin: 0, color: '#fff', paddingTop: '2rem'}}>{raceData.raceName}</h1>
            <Grid container spacing={0} direction='row'>
              <Grid height='86vh' sx={{width: '30%'}}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  autoPageSize
                  disableRowSelectionOnClick
                />
              </Grid>
              <Grid height='86vh' sx={{width: '30%'}}>
                <h2 style={{color: '#fff', textAlign: 'center'}}>Laps Led</h2>
                <LapPieChart raceData={raceData}/>
              </Grid>
            </Grid>
        </Container>
    </ThemeProvider>
  );
}

export default RacePage
