import { useOrientation } from 'react-use';
import { race } from '../interfaces/race';
import { PieChart, PieValueType } from '@mui/x-charts';
import { useEffect, useState } from 'react';

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

  const orientation = useOrientation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const radius = windowWidth >= 900 ? 
                windowWidth / 8
                :
                windowWidth / 4
              
  console.log(radius);

  return (
            <PieChart
              series={[
                {
                  data: dataArray,
                  innerRadius: 20,
                  outerRadius: radius,
                  paddingAngle: 2,
                  cornerRadius: 5,
                },
              ]}
              hideLegend={hideLegend}
              height={windowWidth >= 900 ? 
                windowWidth / 4
                :
                windowWidth / 2}
            />
  )
}

// Does not actually work just gets rid of error
LapPieChart.defaultProps = {
  height: 400,
  hideLegend: true,
}

export default LapPieChart
