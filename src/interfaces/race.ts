type qualiDriver = {
    driverName: string;
    carNumber: number;
    speed: string;
}

type raceDriver = {
    driverName: string;
    carNumber: number;
    interval: string;
    lapsLed: number;
    lapsCompleted: number;
    status: string;
}

interface race {
    qualis: qualiDriver[];
    finishes: raceDriver[];
    raceName: string;
    raceDate: string;
    cautions: string;
    leadChanges: string;
    weather: string;
    pitstopFrequency: string;
    aiStrength: string;
}

export type { qualiDriver, raceDriver, race }
