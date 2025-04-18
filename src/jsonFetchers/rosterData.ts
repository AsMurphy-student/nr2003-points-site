import { drivers } from '../../data/testdir/rosterData.json'

import { Driver } from '../interfaces/driver'

let driversData: Driver[] = [];

for (let d=0;d<drivers.length;d++) {
    let newDriver: Driver = {
        driverName: drivers[d].driverName,
        carNumber: Number(drivers[d].carNumber),
        lapsCompleted: Number(drivers[d].lapsCompleted),
        lapsLed: Number(drivers[d].lapsLed),
        dnfs: Number(drivers[d].dnfs),
        racesLed: Number(drivers[d].racesLed),
        startPositions: drivers[d].startPositions.map((i) => Number(i)),
        starts: Number(drivers[d].starts),
        finishPositions: drivers[d].finishPositions.map((i) => Number(i)),
        finishes: Number(drivers[d].finishes),
        points: Number(drivers[d].points)
    };
    driversData.push(newDriver);
}

export { driversData }
