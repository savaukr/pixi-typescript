import { appHeight, appWidth } from "..";
import { SHIPS_LENGTH, SHIPS_WIDTH } from "../consts";
import { IShip, Ship, SHIPS_COLORS, SHIPS_TYPE } from "./ship";

export class ShipTakeOut extends Ship {
    type: string;

    constructor(id: number, ships: IShip[]) {
        super(id, ships, false);
        this.type = SHIPS_TYPE.TAKEOUT;
        this.graph.beginFill(SHIPS_COLORS.GREEN, 0);
        this.graph.lineStyle(10, SHIPS_COLORS.GREEN, 1);
        this.graph.drawRect(0, 0, SHIPS_LENGTH, SHIPS_WIDTH);
        this.graph.x = appWidth - SHIPS_LENGTH / 10;
        this.graph.y = appHeight / 2 + 0.5 * SHIPS_WIDTH;
        this.graph.endFill();
    }
    fillingIn() {
        this.full = true;
        this.graph.clear();
        this.graph.beginFill(SHIPS_COLORS.GREEN, 1);
        this.graph.lineStyle(10, SHIPS_COLORS.GREEN, 1);
        this.graph.drawRect(this.graph.position.x, this.graph.position.y, SHIPS_WIDTH, SHIPS_LENGTH);
        this.graph.endFill();
        console.log(`ship ${this.id} is full`);
    }
    fillingOut() {
        this.full = true;
        this.graph.clear();
        this.graph.beginFill(SHIPS_COLORS.GREEN, 1);
        this.graph.lineStyle(10, SHIPS_COLORS.GREEN, 1);
        this.graph.drawRect(this.graph.position.x, this.graph.position.y, SHIPS_WIDTH, SHIPS_LENGTH);
        this.graph.endFill();
        console.log(`ship ${this.id} is empty`);
    }
}
