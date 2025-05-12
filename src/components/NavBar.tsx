import { ThemeProvider } from "@emotion/react";
import { race } from "../interfaces/race";
import { defaultTheme } from "../variables/defaultTheme";
import { Box, AppBar, Toolbar, Typography, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { driver } from "../interfaces/driver";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar(props: {seasonName: string, raceData: race[], driverData: driver[], startingRacNum: number}) {

  const navigate = useNavigate();

  const { seasonName, raceData, driverData, startingRacNum } = props;

  console.log(driverData);

  const [raceNum, setRaceNum] = useState(startingRacNum);

  const handleChange = (event: SelectChangeEvent) => {
    if (Number(event.target.value) > 0) {
      setRaceNum(Number(event.target.value));
      navigate(`/nr2003-points-site/${seasonName}/race-${event.target.value}`);
    }
    else {
      setRaceNum(Number(event.target.value));
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
                onChange={handleChange}
              >
                <MenuItem value={0}>Select Race to View</MenuItem>
                {raceData.map((i, index) => {
                  return <MenuItem value={index + 1}>#{index + 1} {i.raceName.toUpperCase()}</MenuItem>
                })}

                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '2rem' }}>
              {seasonName}
            </Typography>

            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default NavBar
