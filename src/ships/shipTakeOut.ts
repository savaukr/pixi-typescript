import { Ship, SHIPS_TYPE } from "./ship";

export class ShipTakeOut extends Ship {
    type: string;
    constructor(id: number, full: boolean, frontLeft: number, frontRight: number, backLeft: number, backRight: number) {
        super(id, (full = false), frontLeft, frontRight, backLeft, backRight);
        this.type = SHIPS_TYPE.TAKEOUT;
    }
}
