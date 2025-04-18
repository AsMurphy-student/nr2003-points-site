interface Driver {
    driverName: string;
    carNumber: number;
    lapsCompleted: number;
    lapsLed: number;
    dnfs: number;
    racesLed: number;
    startPositions: number[];
    starts: number;
    finishPositions: number[];
    finishes: number;
    points: number;
}

export type { Driver }