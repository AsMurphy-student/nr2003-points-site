interface driver {
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
    wins: number;
    t5: number;
    t10: number;
    t15: number;
    t20: number;
    next: number;
    ldr: number;
    avgSta: number;
    avgFin: number;
}

export type { driver }