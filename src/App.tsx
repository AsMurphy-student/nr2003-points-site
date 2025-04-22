import { useState } from 'react'
import './App.css'
import { ChartContainer, LineChart, LinePlot, LineSeriesType } from '@mui/x-charts'
import { Box, createTheme, Stack } from '@mui/material'

import { driversData, driversPointsPerRace, racesData } from './jsonFetchers/rosterData'

import { DataGrid, GridColDef, GridRowsProp, GridValidRowModel } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react'

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

  driversData.forEach((value) => {
    console.log(value);
  });

  const driversPoints = driversData.map((i) => {
    return i.points
  });

  const driversNames = driversData.map((i) => {
    return i.driverName
  });

  // let lineArray: LineSeriesType[] = [];

  const [lineArray, setLineArray] = useState<LineSeriesType[]>([]);

  // const [count, setCount] = useState(driversData.length);

  // for (let i=0;i<count;i++) {
  //   const newSeries: LineSeriesType = {
  //     curve: "linear",
  //     data: driversPointsPerRace[i],
  //     label: driversNames[i],
  //     type: 'line',
  //     showMark: false,
  //   };
  //   lineArray.push(newSeries);
  // }

  // let myPoints = myFinishPositions.map((i) => Number(i));

  // for (let i=0; i<myPoints.length;i++) {
  //   const pt = (5 * (43 - (myPoints[i] - 1)));
  //   if (i > 0) {
  //     myPoints[i] = pt + myPoints[i-1];
  //   }
  //   else{
  //     myPoints[i] = pt;
  //   }
  // }

  // let kurtPoints = kurtFinishPositions.map((i) => Number(i));

  // for (let i=0; i<kurtPoints.length;i++) {
  //   const pt = (5 * (43 - (kurtPoints[i] - 1)));
  //   if (i > 0) {
  //     kurtPoints[i] = pt + kurtPoints[i-1];
  //   }
  //   else{
  //     kurtPoints[i] = pt;
  //   }
  // }

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
      minWidth: 150,
      type: 'string',
    },
    {
      field: 'carNumber',
      headerName: 'Car Number',
      flex: 1,
      minWidth: 100,
      type: 'number',
    },
    {
      field: 'points',
      headerName: 'Points',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'next',
      headerName: 'Next',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'ldr',
      headerName: 'Ldr',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'starts',
      headerName: 'Starts',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'wins',
      headerName: 'Wins',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 't5',
      headerName: 'T5',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 't10',
      headerName: 'T10',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 't15',
      headerName: 'T15',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 't20',
      headerName: 'T20',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'dnfs',
      headerName: 'DNFS',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'lapsCompleted',
      headerName: 'Laps Completed',
      flex: 1,
      minWidth: 120,
      type: 'number',
    },
    {
      field: 'lapsLed',
      headerName: 'Laps Led',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'racesLed',
      headerName: 'Races Led',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'avgSta',
      headerName: 'AvgSta',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'avgFin',
      headerName: 'AvgFin',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
  ];

  let temprows: GridValidRowModel[] = [];
  
  for (let d=0;d<driversData.length;d++) {
    const driverRow: GridValidRowModel = {
      id: d+1,
      driverName: driversData[d].driverName,
      carNumber: driversData[d].carNumber,
      points: driversData[d].points,
      next: driversData[d].next,
      ldr: driversData[d].ldr,
      starts: driversData[d].starts,
      wins: driversData[d].wins,
      t5: driversData[d].t5,
      t10: driversData[d].t10,
      t15: driversData[d].t15,
      t20: driversData[d].t20,
      dnfs: driversData[d].dnfs,
      lapsCompleted: driversData[d].lapsCompleted,
      lapsLed: driversData[d].lapsLed,
      racesLed: driversData[d].racesLed,
      avgSta: driversData[d].avgSta,
      avgFin: driversData[d].avgFin,
    }

    temprows.push(driverRow);

  }

  const rows: GridRowsProp = temprows;

  const xAxisRaceArray = new Array(racesData.length).fill(null).map((_,i) => i + 1)

  return (
    
      
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{flexGrow: 1, minHeight: '100vh', backgroundColor: 'secondary.main'}}>
            <Stack direction='row' sx={{ flexGrow: 1}}>
              <Box sx={{ height: 1000, width: '50%', margin: 0, padding: '1rem' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  autoPageSize
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={(ids) => {
                    setLineArray([]);

                    let newArray: LineSeriesType[] = [];

                    ids.ids.forEach(row => {
                      const index = Number(row) - 1;

                      const newSeries: LineSeriesType = {
                        curve: "linear",
                        data: driversPointsPerRace[index],
                        label: driversNames[index],
                        type: 'line',
                        showMark: false,
                      };
                      
                      newArray.push(newSeries);
                      
                    });

                    newArray.sort((a: LineSeriesType, b: LineSeriesType) => {
                      return b.data![b.data!.length - 1]! - a.data![a.data!.length - 1]!;
                    });

                    setLineArray(newArray);
                  }}
                  showToolbar
                />
              </Box>

              <Box sx={{ height: 1000, width: '100%', margin: 0, padding: '1rem' }}>
                <LineChart
                  slotProps={{
                    noDataOverlay: {
                        message: "Check Drivers in Table to Add Data",
                    }
                  }}
                  // sx={{
                  //   //change left yAxis label styles
                  //   "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                  //     strokeWidth:"1.0",
                  //     fill:"#ffffff"
                  //   },
                  //   // change all labels fontFamily shown on both xAxis and yAxis
                  //   // "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                  //   //     fontFamily: "Roboto",
                  //   //   },
                  //     // change bottom label styles
                  //     "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                  //         strokeWidth:"0.5",
                  //         fill:"#ffffff"
                  //     },
                  //     "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
                  //         strokeWidth:"0.5",
                  //         fill:"#ffffff"
                  //     },
                  //     // "& .MuiChartsGrid-root .MuiChartsGrid-verticalLine":{
                  //     //     strokeWidth:"0.5",
                  //     //     fill:"#ffffff"
                  //     // },
                  //     ".MuiChartsGrid-line":{
                  //         strokeWidth:"0.5",
                  //         fill:"#1976d2",
                  //         shapeRendering: 'crispEdges',
                  //     },
                  //       // bottomAxis Line Styles
                  //     "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                  //       stroke:"#ffffff",
                  //       strokeWidth:1.0
                  //     },
                  //     // leftAxis Line Styles
                  //     "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                  //       stroke:"#ffffff",
                  //       strokeWidth:1.0
                  //     },
                  //       // bottomAxis Line Styles
                  //       "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
                  //         stroke:"#ffffff",
                  //         strokeWidth:1.0
                  //       },
                  //       // leftAxis Line Styles
                  //       "& .MuiChartsAxis-left .MuiChartsAxis-tick":{
                  //         stroke:"#ffffff",
                  //         strokeWidth:1.0
                  //       },
                  //       // leftAxis Line Styles
                  //       "& .MuiChartsXAxis-line":{
                  //         stroke:"#ffffff",
                  //         strokeWidth:1.0
                  //       }
                  // }}  
                  xAxis={[{ data: xAxisRaceArray, scaleType: "point", label: 'Races' }]}
                  yAxis={[{label: 'Points'}]}
                  series={lineArray}
                  height={1000}
                  hideLegend
                  grid={{ vertical: true, horizontal: true, }}
                />
              </Box>

              {/* <ChartContainer
                height={300}
                series={[
                  {
                    type: 'line',
                    data: [13, 13, 54, 651, 657, 987, 64, 654, 954, 654, 897, 84],
                  },
                ]}
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], position: 'none' }]}
                yAxis={[{ position: 'none' }]}
              >
                <LinePlot />
              </ChartContainer> */}

            </Stack>
          </Box>

          {/* <div>
        
        <Container
          sx={{backgroundColor: 'white'}}
        >
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }]}
            series={[
              {
                curve: "linear",
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                label: "A Murphy",
              },
            ]}
            height={300}
            grid={{ vertical: true, horizontal: true }}
          />
        </Container>

      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      {/* <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], scaleType: "point" }]}
        series={lineArray}
        height={1000}
        width={2000}
        grid={{ vertical: true, horizontal: true }}
      />
      <button onClick={() => setCount((count) => count - 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

{/* <BarChart
        series={[
          { data: driversPoints },
        ]}
        height={1000}
        width={2460}
        xAxis={[{ data: driversNames, scaleType: 'band' }]}
      /> */}

        </ThemeProvider>
      
    
  )
}

export default App
