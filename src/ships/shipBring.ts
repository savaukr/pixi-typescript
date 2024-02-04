import { Graphics } from "pixi.js";
import { SHIPS_TYPE, Ship } from "./ship";
import { TERMINAL_WIDTH } from "../terminals/terminal";

export class ShipBring extends Ship {
    type: string;
    private _timer: unknown | null;
    constructor(
        id: number,
        full: boolean,
        frontLeft: number,
        frontRight: number,
        backLeft: number,
        backRight: number,
        graph: Graphics,
    ) {
        super(id, full, frontLeft, frontRight, backLeft, backRight, graph);
        this.type = SHIPS_TYPE.BRING;
        this._timer = null;
    }
    private changeX(dx: number) {
        if (this.graph.x < -(innerWidth - TERMINAL_WIDTH)) return;
        this.graph.x -= dx;
    }
    private changeY(dy: number) {
        if (this.graph.y < -innerHeight / 2 || this.graph.y > innerHeight / 2) return;
        this.graph.y += dy;
    }
    move() {
        this._timer = setInterval(() => {
            this.changeX(5);
            // this.changeY(-1);
        }, 100);
        console.log(`ship BRING ${this.id} is moving`);
    }
}
