import { ThemeProvider } from "@emotion/react";
import { race } from "../interfaces/race";
import { defaultTheme } from "../variables/defaultTheme";
import { Box, AppBar, Toolbar, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { driver } from "../interfaces/driver";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar(props: {seasonName: string, raceData: race[], driversData: driver[], startingRaceNum: number, startingDriverNum: number, onRacePage: boolean, onDriverPage: boolean}) {
  const navigate = useNavigate();

  const { seasonName, raceData, driversData, startingRaceNum, startingDriverNum, onRacePage, onDriverPage } = props;

  const [raceNum, setRaceNum] = useState(startingRaceNum);
  const [driverNum, setDriverNum] = useState(startingDriverNum);

  const raceHandleChange = (event: SelectChangeEvent) => {
    if (Number(event.target.value) > 0) {
      setRaceNum(Number(event.target.value));
      navigate(`/nr2003-points-site/${seasonName}/race-${event.target.value}`);
    }
    else {
      setRaceNum(Number(event.target.value));
      navigate(`/nr2003-points-site/${seasonName}/`);
    }
  };

  const driverHandleChange = (event: SelectChangeEvent) => {
    if (Number(event.target.value) > 0) {
      const selection = driversData[Number(event.target.value) - 1];
      setDriverNum(Number(event.target.value));
      navigate(`/nr2003-points-site/${seasonName}/${selection.driverName.replace(/\s+/g, '-').toLowerCase()}/`);
    }
    else {
      setDriverNum(0);
      navigate(`/nr2003-points-site/${seasonName}/`);
    }
  };

  // useEffect(() => {
  //   setRaceLabel(raceData[0].raceName);
  // }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            
            {/* <Button
              aria-label="menu"
              sx={{ mr: 2, color: '#fff' }}
            >
              {seasonName}
            </Button>

            <Button
              aria-label="menu"
              sx={{ mr: 2, color: '#fff' }}
            >
              Races
            </Button>

            <Button
              aria-label="menu"
              sx={{ mr: 2, color: '#fff' }}
            >
              Drivers
            </Button> */}

            <FormControl>
              <InputLabel id="demo-simple-select-label">Race</InputLabel>
              <Select
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(raceNum)}
                label="Race"
                onChange={raceHandleChange}
              >
                <MenuItem value={0}>{onRacePage ? "Back to Standings" : "Select Race to View"}</MenuItem>
                {raceData.map((i, index) => {
                  return <MenuItem value={index + 1}>#{index + 1} {i.raceName.toUpperCase()}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-label">Driver</InputLabel>
              <Select
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(driverNum)}
                label="Driver"
                onChange={driverHandleChange}
              >
                <MenuItem value={0}>{onDriverPage ? "Back to Standings" : "Select Driver to View"}</MenuItem>
                {driversData.map((i, index) => {
                  return <MenuItem value={index + 1}>#{index + 1} {i.driverName}</MenuItem>
                })}
              </Select>
            </FormControl>

            <Typography variant="h6" component="div" textAlign='right' sx={{ flexGrow: 1, marginLeft: '2rem' }}>
              {seasonName}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default NavBar
