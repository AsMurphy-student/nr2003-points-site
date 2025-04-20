import { drivers } from '../../data/testdir/rosterData.json'

import { Driver } from '../interfaces/driver'

let driversData: Driver[] = [];

for (let d=0;d<drivers.length;d++) {
    const finishes = drivers[d].finishPositions.map((i) => Number(i));
    let wins: number = 0;
    let t5: number = 0;
    let t10: number = 0;
    let t15: number = 0;
    let t20: number = 0;
    finishes.forEach((finish: number) => {
        if (finish == 1) {
            wins++;
            t5++;
            t10++;
            t15++;
            t20++;
        }
        else if (finish <= 5) {
            t5++;
            t10++;
            t15++;
            t20++;
        }
        else if (finish <= 10) {
            t10++;
            t15++;
            t20++;
        }
        else if (finish <= 15) {
            t15++;
            t20++;
        }
        else if (finish <= 20) {
            t20++;
        }
    })

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
        points: Number(drivers[d].points),
        wins: wins,
        t5: t5,
        t10: t10,
        t15: t15,
        t20: t20,
    };
    driversData.push(newDriver);
}

export { driversData }
