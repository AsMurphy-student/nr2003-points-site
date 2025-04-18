import { useState } from 'react'
import './App.css'
import { BarChart, LineChart, LineSeriesType } from '@mui/x-charts'
import { Container } from '@mui/material'

import { driversData } from './jsonFetchers/rosterData'
import { Driver } from './interfaces/driver'

function App() {
  // const [count, setCount] = useState(0);

  driversData.sort((a: Driver, b: Driver) => {
    return b.points - a.points;
  });

  driversData.forEach((value: Driver) => {
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

  type seriesType = {
    curve: string;
    data: number[];
    label: string;
  }

  let lineArray: LineSeriesType[] = [];

  for (let i=0;i<driversData.length;i++) {
    const newSeries: LineSeriesType = {
      curve: "step",
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

      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], scaleType: "point" }]}
        series={lineArray}
        height={1000}
        width={2000}
        grid={{ vertical: true, horizontal: true }}
      />
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
