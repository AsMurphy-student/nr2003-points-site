import { drivers } from '../../data/testdir/rosterData.json'
import { races } from '../../data/testdir/raceData.json'

import { driver } from '../interfaces/driver'

import { race, qualiDriver, raceDriver } from '../interfaces/race';

const racesData: race[] = [];

for (let r=0;r<races.length;r++) {

    const qualis: qualiDriver[] = [];
    for (let q=0;q<races[r].quali.length;q++) {
        const currentDriver = races[r].quali[q];
        const qDriver: qualiDriver = {
            driverName: currentDriver.driverName,
            carNumber: Number(currentDriver.carNumber),
            speed: currentDriver.speed,
        };

        qualis.push(qDriver);
    };

    const finishes: raceDriver[] = [];
    for (let f=0;f<races[r].race.length;f++) {
        const currentDriver = races[r].race[f];

        let lapsLed = currentDriver.lapsLed;

        if (lapsLed.slice(-1) == '*') {
            lapsLed = lapsLed.substring(0, lapsLed.length - 1);
        };

        const rDriver: raceDriver = {
            driverName: currentDriver.driverName,
            carNumber: Number(currentDriver.carNumber),
            interval: currentDriver.interval,
            lapsLed: Number(lapsLed),
            lapsCompleted: Number(currentDriver.lapsCompleted),
            status: currentDriver.status,
        };

        finishes.push(rDriver);
    };

    const race: race = {
        qualis: qualis,
        finishes: finishes,
        raceName: races[r].raceName,
        raceDate: races[r].raceDate,
        cautions: races[r].cautions,
        leadChanges: races[r].leadChanges,
        weather: races[r].weather,
        pitstopFrequency: races[r].pitstopFrequency,
        aiStrength: races[r].aiStrength,
    };

    racesData.push(race);
}

// console.log(racesData);

// racesData.forEach(element => {
//     console.log(element.races.length);
// })







let driversData: driver[] = [];

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
        else if (finish <= 5 && finish != 0) {
            t5++;
            t10++;
            t15++;
            t20++;
        }
        else if (finish <= 10 && finish != 0) {
            t10++;
            t15++;
            t20++;
        }
        else if (finish <= 15 && finish != 0) {
            t15++;
            t20++;
        }
        else if (finish <= 20 && finish != 0) {
            t20++;
        }
    });

    let avgSta = Number((drivers[d].startPositions.map((i) => Number(i)).reduce((acc, val) => acc + val, 0) / drivers[d].startPositions.length).toFixed(1));
    let avgFin = Number((drivers[d].finishPositions.map((i) => Number(i)).reduce((acc, val) => acc + val, 0) / drivers[d].finishPositions.length).toFixed(1));

    let newDriver: driver = {
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
        next: (d > 0 ? Number(drivers[d].points) - Number(drivers[d-1].points) : 0),
        ldr: (d > 0 ? Number(drivers[0].points) - Number(drivers[d].points) : 0),
        avgSta: avgSta,
        avgFin: avgFin,
    };
    driversData.push(newDriver);
}

driversData.sort((a: driver, b: driver) => {
    if (b.points == a.points) {
        if (b.wins != a.wins) {
            return b.wins - a.wins;
        }
        else if (b.t5 != a.t5) {
            return b.t5 - a.t5;
        }
        else if (b.t10 != a.t10) {
            return b.t10 - a.t10;
        }
        else if (b.t15 != a.t15) {
            return b.t15 - a.t15;
        }
        else if (b.t20 != a.t20) {
            return b.t20 - a.t20;
        }
        else if (b.racesLed != a.racesLed) {
            return b.racesLed - a.racesLed;
        }
        else if (b.lapsLed != a.lapsLed) {
            return b.lapsLed - a.lapsLed;
        }
        else if (b.lapsCompleted != a.lapsCompleted) {
            return b.lapsCompleted - a.lapsCompleted;
        }
    }
    
    return b.points - a.points;
});

for (let d=0;d<driversData.length;d++) {
    driversData[d].next = (d > 0 ? driversData[d-1].points - driversData[d].points : 0);
    driversData[d].ldr = (d > 0 ? driversData[0].points - driversData[d].points : 0);
};

let driversPointsPerRace: number[][] = [];

for (let d=0;d<driversData.length;d++) {
    let pointsPerRace: number[] = [];

    for (let p=0;p<driversData[d].finishPositions.length;p++) {
        const finishingPosition = driversData[d].finishPositions[p];
        if (finishingPosition == 0) {
            if (p > 0) {
                pointsPerRace[p] = pointsPerRace[p-1];
            }
            else{
                pointsPerRace[p] = 0;
            }
            continue;
        }
        let pt = (5 * (racesData[p].finishes.length - (driversData[d].finishPositions[p] - 1)));

        let lapsDriverLed = races[p].race[finishingPosition - 1].lapsLed;

        if (lapsDriverLed.slice(-1) == '*') {
           pt = pt + 10;  
        }
        else {
            lapsDriverLed = lapsDriverLed.substring(0, lapsDriverLed.length - 1);
            if ( Number(lapsDriverLed) > 0 ) {
                pt = pt + 5;
            }
        }

        if (p > 0) {
        pointsPerRace[p] = pt + pointsPerRace[p-1];
        }
        else{
        pointsPerRace[p] = pt;
        }

        
    }

    driversPointsPerRace.push(pointsPerRace);
}

export { driversData, driversPointsPerRace, racesData }
