import { Container, Stack } from "@mui/material";
import DaytonaImage from '../../../data/testdir/trackimages/daytona-international-speedway.png'

function Daytona() {
  
  return (
    <Container sx={{margin: 0, width: '100%'}}>
      <Stack direction='row' spacing={4} width='100vw'>
        <div style={{width: '50%'}}>
          <h1 style={{color: "#fff"}}>Track Overhead</h1>
          <img src={DaytonaImage} alt="Daytona International Speedway" />
        </div>
        <div style={{width: '50%'}}>
          <h1 style={{color: '#fff'}}>Track Information: (Coming soon)</h1>
        </div>
      </Stack>
    </Container>
  );
}

export default Daytona

