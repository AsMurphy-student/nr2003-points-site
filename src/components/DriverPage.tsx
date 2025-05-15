import { ThemeProvider } from "@emotion/react";
import { race } from "../interfaces/race";
import { Container, Grid } from "@mui/material";
import { defaultTheme } from "../variables/defaultTheme";
import { driver } from "../interfaces/driver";
import NavBar from "./NavBar";
import { LineChart, LineSeriesType } from "@mui/x-charts";
import { useOrientation } from "react-use";
import { useEffect, useState } from "react";
// import { GridColDef } from "@mui/x-data-grid";

function DriverPage(props: { driverData: driver, raceIndex: number, driverIndex: number, racesData: race[], driversData: driver[], seasonName: string }) {
  const { driverData, raceIndex, driverIndex, racesData, driversData, seasonName } = props;

  const xAxisRaceArray = Array(racesData.length).fill(null).map((_,i) => i + 1);

  const series: LineSeriesType = {
    curve: "linear",
    data: driverData.finishPositions.map((finish) => {
      if (finish > 0) {
        return finish;
      }
      else {
        return null;
      }
    }),
    label: 'Race Finish',
    type: 'line',
    showMark: true,
    valueFormatter: (value) => (value == null ? 'N/A' : value.toString()),  
  };
  const arrayAvg = (driverData.finishPositions.reduce((a, b) => a + b) / driverData.finishes).toFixed(2);
  const avgSeries: LineSeriesType = {
    curve: "linear",
    data: new Array(driverData.finishPositions.length).fill(arrayAvg),
    label: 'Average',
    type: 'line',
    showMark: false,
    valueFormatter: (value) => (value == null ? '?' : value.toString()),  
  };
  const lineSeries: LineSeriesType[] = [series, avgSeries];

  // const columns: GridColDef[] = [
  //     { 
  //       field: 'id', 
  //       headerName: 'Rank', 
  //       flex: 1,
  //       maxWidth: 90,
  //       type: 'number', 
  //     },
  // ];

  const orientation = useOrientation();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar seasonName={seasonName} raceData={racesData} driversData={driversData} startingRaceNum={raceIndex} startingDriverNum={driverIndex} />
      <Container maxWidth='xl' sx={{flexGrow: 1, minHeight: '100vh', minWidth: '100%', backgroundColor: 'secondary.main'}}>
        <h1 style={{ margin: 0, color: '#fff', paddingTop: '2rem'}}>{driverData.driverName}</h1>
        <Grid container spacing={0} direction='row'>
          <Grid sx={{width: '100%'}} height={orientation.type === 'landscape-primary' ? 
                windowHeight * 0.80
                :
                windowHeight * 0.40
              }>
            <LineChart
              xAxis={[{ data: xAxisRaceArray, scaleType: 'point', label: 'Races' }]}
              yAxis={[{label: 'Finishes', reverse: true, min: 1, max: 43, tickMaxStep: 1}]}
              series={lineSeries}
              height={orientation.type === 'landscape-primary' ? 
                windowHeight * 0.80
                :
                windowHeight * 0.40
              }
              hideLegend={false}
              grid={{ vertical: true, horizontal: true, }}
            />
          </Grid>
          {/* <Grid sx={{width: '100%'}} height={orientation.type === 'landscape-primary' ? 
            windowHeight * 0.80
            :
            windowHeight * 0.40
          }>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Stats</TableCell>
                  <TableCell>Values</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Grid> */}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default DriverPage

