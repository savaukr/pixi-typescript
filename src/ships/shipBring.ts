import { appHeight, appWidth } from "..";
import { SHIPS_LENGTH, SHIPS_WIDTH } from "../consts";
import { SHIPS_COLORS, SHIPS_TYPE, Ship, TShips } from "./ship";

export class ShipBring extends Ship {
    type: string;
    constructor(id: number, ships: TShips) {
        super(id, ships, true);
        this.type = SHIPS_TYPE.BRING;
        this.graph.beginFill(SHIPS_COLORS.RED, 1);
        this.graph.lineStyle(10, SHIPS_COLORS.RED, 1);
        this.graph.drawRect(0, 0, SHIPS_LENGTH, SHIPS_WIDTH);
        this.graph.x = appWidth - SHIPS_LENGTH / 10;
        this.graph.y = appHeight / 2 - 3.2 * SHIPS_WIDTH;
        this.graph.endFill();
    }
    fillingIn() {
        this.full = true;
        this.graph.clear();
        this.graph.beginFill(SHIPS_COLORS.RED, 1);
        this.graph.lineStyle(10, SHIPS_COLORS.RED, 1);
        this.graph.drawRect(this.graph.position.x, this.graph.position.y, SHIPS_WIDTH, SHIPS_LENGTH);
        this.graph.endFill();
        console.log(`ship ${this.id} is full`);
    }
    fillingOut() {
        this.full = true;
        this.graph.clear();
        this.graph.beginFill(SHIPS_COLORS.RED, 1);
        this.graph.lineStyle(10, SHIPS_COLORS.RED, 1);
        this.graph.drawRect(this.graph.position.x, this.graph.position.y, SHIPS_WIDTH, SHIPS_LENGTH);
        this.graph.endFill();
        console.log(`ship ${this.id} is empty`);
    }
}
