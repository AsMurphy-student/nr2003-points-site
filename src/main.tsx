import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter, Route, Routes } from 'react-router-dom'
import NavigateToDefault from './components/NavigateToDefault.tsx'
import { driversData, racesData } from './jsonFetchers/rosterData.ts'
import RacePage from './components/RacePage.tsx'
import DriverPage from './components/DriverPage.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}

    <HashRouter>
      <Routes>
        <Route path='/' element={<NavigateToDefault />} />
        <Route path='/nr2003-points-site/'>
          <Route index element={<NavigateToDefault />}/>
          <Route path='2025-season/' element={<App />}/>
          {racesData.map((race, index) => {
            return <Route path={`2025-season/race-${index + 1}/`} element={<RacePage raceData={race} raceIndex={index + 1} racesData={racesData} driverData={driversData} seasonName='2025-season' />}/>
          })}
          {driversData.map((driver, index) => {
            return <Route path={`2025-season/${driver.driverName.replace(/\s+/g, '-').toLowerCase()}/`} element={<DriverPage driverData={driver} raceIndex={0} driverIndex={index + 1} racesData={racesData} driversData={driversData} seasonName='2025-season' />}/>
          })}
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
