import { race } from "../interfaces/race";

function Test(props: { raceData: race }) {
  const { raceData } = props;

  return (
    <h1>{raceData.raceName}</h1>
  );
}

export default Test
