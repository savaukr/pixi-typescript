import { SHIPS_TYPE, Ship } from "./ship";

export class ShipBring extends Ship {
    type: string;
    constructor(id: number, full: boolean, frontLeft: number, frontRight: number, backLeft: number, backRight: number) {
        super(id, full, frontLeft, frontRight, backLeft, backRight);
        this.type = SHIPS_TYPE.BRING;
    }
}
