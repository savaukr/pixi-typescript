export enum SHIPS_COLORS {
    GREEN = 0x046a26,
    RED = 0xc4033e,
}

export enum SHIPS_TYPE {
    BRING = "bring",
    TAKEOUT = "takeout",
}

export const SHIPS_WIDTH = 55;
export const SHIPS_LENGTH = 130;

export interface IShip {
    id: number;
    full: boolean;
    frontLeft: number;
    frontRight: number;
    backLeft: number;
    backRight: number;
    fillingIn(): void;
    fillingOut(): void;
    move(): void;
}

export class Ship implements IShip {
    id: number;
    full: boolean;
    frontLeft: number;
    frontRight: number;
    backLeft: number;
    backRight: number;

    constructor(id: number, full: boolean, frontLeft: number, frontRight: number, backLeft: number, backRight: number) {
        this.id = id;
        this.full = full;
        this.frontLeft = frontLeft;
        this.frontRight = frontRight;
        this.backLeft = backLeft;
        this.backRight = backRight;
    }

    public fillingIn() {
        console.log(`ship ${this.id} is full`);
    }

    public fillingOut() {
        console.log(`ship ${this.id} is empty`);
    }
    public move() {
        console.log(`ship ${this.id} is moving`);
    }
}
