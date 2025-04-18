import { useState } from 'react'
import './App.css'
import { LineChart } from '@mui/x-charts'
import { Container } from '@mui/material'

import { finishPositions as myFinishPositions } from '../data/testdir/a-murphy.json'
import { finishPositions as kurtFinishPositions } from '../data/testdir/k-busch.json'

function App() {
  const [count, setCount] = useState(0)

  let myPoints = myFinishPositions.map((i) => Number(i));

  for (let i=0; i<myPoints.length;i++) {
    const pt = (5 * (43 - (myPoints[i] - 1)));
    if (i > 0) {
      myPoints[i] = pt + myPoints[i-1];
    }
    else{
      myPoints[i] = pt;
    }
  }

  let kurtPoints = kurtFinishPositions.map((i) => Number(i));

  for (let i=0; i<kurtPoints.length;i++) {
    const pt = (5 * (43 - (kurtPoints[i] - 1)));
    if (i > 0) {
      kurtPoints[i] = pt + kurtPoints[i-1];
    }
    else{
      kurtPoints[i] = pt;
    }
  }

  return (
    <>
      <div>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
        <Container
          sx={{backgroundColor: 'white'}}
        >
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }]}
            series={[
              {
                curve: "linear",
                data: myPoints,
                label: "A Murphy",
              },
              {
                curve: "linear",
                data: kurtPoints,
                label: "K Busch",
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
      </p>
    </>
  )
}

export default App
