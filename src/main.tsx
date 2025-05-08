import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigateToDefault from './components/NavigateToDefault.tsx'
import { racesData } from './jsonFetchers/rosterData.ts'
import Test from './components/Test.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}

    <BrowserRouter>
      <Routes>
        <Route path='/nr2003-points-site/'>
          <Route index element={<NavigateToDefault />}/>
          <Route path='2025season/' element={<App />}/>
          {racesData.map((i, index) => {
            return <Route path={`2025season/race-${index + 1}/`} element={<Test raceData={i} />}/>
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
