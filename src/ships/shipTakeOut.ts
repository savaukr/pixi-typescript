import { Graphics } from "pixi.js";
import { Ship, SHIPS_TYPE } from "./ship";
// import { SHIP_SPEED } from "../const";
// import { TERMINAL_WIDTH } from "../terminals/terminal";

export class ShipTakeOut extends Ship {
    type: string;

    constructor(
        id: number,
        full: boolean,
        // frontLeft: number,
        // frontRight: number,
        // backLeft: number,
        // backRight: number,
        graph: Graphics,
    ) {
        super(id, full, graph);
        this.type = SHIPS_TYPE.TAKEOUT;
    }
    // private changeX(dx: number) {
    //     if (this.graph.x < -(innerWidth - TERMINAL_WIDTH)) return;
    //     this.graph.x -= dx;
    // }
    // private changeY(dy: number) {
    //     if (this.graph.y < -innerHeight / 2 || this.graph.y > innerHeight / 2) return;
    //     this.graph.y += dy;
    // }
    // move() {
    //     this._timer = setInterval(() => {
    //         this.changeX(SHIP_SPPED);
    //         // this.changeY(1);
    //     }, 100);
    //     console.log(`ship BRING ${this.id} is moving`);
    // }
}
