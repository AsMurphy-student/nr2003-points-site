import { useState } from 'react'
import * as React from 'react';
import './App.css'
import { BarChart, LineChart, LineSeriesType } from '@mui/x-charts'
import { Box, Container } from '@mui/material'

import { driversData } from './jsonFetchers/rosterData'
import { Driver } from './interfaces/driver'

import { DataGrid, GridColDef, GridRowsProp, GridValidRowModel } from '@mui/x-data-grid';

function App() {
  // const [count, setCount] = useState(0);

  driversData.sort((a: Driver, b: Driver) => {
    return b.points - a.points;
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

  let driversPointsPerRace: number[][] = [];

  for (let d=0;d<driversData.length;d++) {
    let pointsPerRace: number[] = [];

    for (let p=0;p<driversData[d].finishPositions.length;p++) {
        if (driversData[d].finishPositions[p] == 0) {
          if (p > 0) {
            pointsPerRace[p] = pointsPerRace[p-1];
          }
          else{
            pointsPerRace[p] = 0;
          }
          continue;
        }
        const pt = (5 * (43 - (driversData[d].finishPositions[p] - 1)));
        if (p > 0) {
          pointsPerRace[p] = pt + pointsPerRace[p-1];
        }
        else{
          pointsPerRace[p] = pt;
        }
    }

    driversPointsPerRace.push(pointsPerRace);
  }

  let lineArray: LineSeriesType[] = [];

  const [count, setCount] = useState(driversData.length);

  for (let i=0;i<count;i++) {
    const newSeries: LineSeriesType = {
      curve: "linear",
      data: driversPointsPerRace[i],
      label: driversNames[i],
      type: 'line',
      showMark: false,
    };
    lineArray.push(newSeries);
  }

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
      width: 90, 
      type: 'number', 
    },
    {
      field: 'driverName',
      headerName: 'Driver Name',
      width: 150,
      type: 'string',
    },
    {
      field: 'carNumber',
      headerName: 'Car Number',
      width: 150,
      type: 'number',
    },
    {
      field: 'points',
      headerName: 'Points',
      width: 150,
      type: 'number',
    },
    {
      field: 'wins',
      headerName: 'Wins',
      width: 150,
      type: 'number',
    },
    {
      field: 't5',
      headerName: 'T5',
      width: 150,
      type: 'number',
    },
    {
      field: 't10',
      headerName: 'T10',
      width: 150,
      type: 'number',
    },
    {
      field: 't15',
      headerName: 'T15',
      width: 150,
      type: 'number',
    },
    {
      field: 't20',
      headerName: 'T20',
      width: 150,
      type: 'number',
    },
  ];

  let temprows = [];
  
  for (let d=0;d<driversData.length;d++) {
    const driverRow: GridValidRowModel = {
      id: d+1,
      driverName: driversData[d].driverName,
      carNumber: driversData[d].carNumber,
      points: driversData[d].points,
      wins: driversData[d].wins,
      t5: driversData[d].t5,
      t10: driversData[d].t10,
      t15: driversData[d].t15,
      t20: driversData[d].t20,
    }

    temprows.push(driverRow);

  }

  const rows: GridRowsProp = temprows;

  return (
    <>
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

      <Box sx={{ height: 400, width: '1500px', margin: 0, display: 'flex', flexDirection: 'column' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10]}
        />
      </Box>

      {/* <BarChart
        series={[
          { data: driversPoints },
        ]}
        height={1000}
        width={2460}
        xAxis={[{ data: driversNames, scaleType: 'band' }]}
      /> */}
    </>
  )
}

export default App
