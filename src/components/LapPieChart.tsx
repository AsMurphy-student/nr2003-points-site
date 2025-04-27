
// import { Box} from '@mui/material'
import { race } from '../interfaces/race';
import { PieChart, PieValueType } from '@mui/x-charts';

function LapPieChart(props: {raceData: race, height: number, hideLegend: boolean}) {
  const { raceData, height = 400, hideLegend = true} = props;
  
  let dataArray: PieValueType[] = [];

  for (let d=0;d<raceData.finishes.length;d++) {
    if (raceData.finishes[d].lapsLed > 0) {
      const data: PieValueType = {
        id: dataArray.length,
        value: raceData.finishes[d].lapsLed,
        label: raceData.finishes[d].driverName,
      };

      dataArray.push(data);
    }
  }

  dataArray.sort((a, b) => {
    return b.value - a.value;
  });

  return (
            <PieChart
              series={[
                {
                  data: dataArray,
                  innerRadius: 20,
                  outerRadius: 150,
                  paddingAngle: 2,
                  cornerRadius: 5,
                },
              ]}
              hideLegend={hideLegend}
              height={height}
            />
  )
}

// Does not actually work just gets rid of error
LapPieChart.defaultProps = {
  height: 400,
  hideLegend: true,
}

export default LapPieChart
