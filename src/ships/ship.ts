export enum SHIPS_COLORS {
    GREEN = 0x046a26,
    RED = 0xc4033e,
}

export const SHIPS_WIDTH = 55;
export const SHIPS_LENGTH = 130;

export interface IShip {
    id: number;
    full: boolean;
    frontLeft: number;
    frontRight: number;
    backmLeft: number;
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
    backmLeft: number;
    backRight: number;

    constructor(
        id: number,
        full: boolean,
        frontLeft: number,
        frontRight: number,
        backmLeft: number,
        backRight: number,
    ) {
        this.id = id;
        this.full = full;
        this.frontLeft = frontLeft;
        this.frontRight = frontRight;
        this.backmLeft = backmLeft;
        this.backRight = backRight;
    }

    fillingIn() {
        console.log(`ship ${this.id} is full`);
    }

    fillingOut() {
        console.log(`ship ${this.id} is empty`);
    }
    move() {
        console.log(`ship ${this.id} is moving`);
    }
}
