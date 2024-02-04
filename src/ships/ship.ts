import { Graphics } from "pixi.js";
import { TERMINAL_WIDTH } from "../terminals/terminal";
import { PORT_WIDTH, SHIP_SPEED, SHIPS_LENGTH } from "../consts";

export enum SHIPS_COLORS {
    GREEN = 0x046a26,
    RED = 0xc4033e,
}

export enum SHIPS_TYPE {
    BRING = "bring",
    TAKEOUT = "takeout",
}

export interface IShip {
    id: number;
    full: boolean;
    frontLeft: number;
    frontRight: number;
    backLeft: number;
    backRight: number;
    graph: Graphics;
    fillingIn(): void;
    fillingOut(): void;
    move(): void;
    stop(): void;
    moveBack(): void;
    rotate(rad: number): void;
}

export class Ship implements IShip {
    id: number;
    full: boolean;
    frontLeft: number;
    frontRight: number;
    backLeft: number;
    backRight: number;
    graph: Graphics;
    private _timer: number;

    constructor(
        id: number,
        full: boolean,
        frontLeft: number,
        frontRight: number,
        backLeft: number,
        backRight: number,
        graph: Graphics,
    ) {
        this.id = id;
        this.full = full;
        this.frontLeft = frontLeft;
        this.frontRight = frontRight;
        this.backLeft = backLeft;
        this.backRight = backRight;
        this.graph = graph;
        this._timer = 0;
    }

    fillingIn() {
        console.log(`ship ${this.id} is full`);
    }

    fillingOut() {
        console.log(`ship ${this.id} is empty`);
    }
    // public move() {}
    protected changeX(dx: number) {
        if (this.graph.x < -(innerWidth - TERMINAL_WIDTH - SHIPS_LENGTH - 10)) return;
        this.graph.x -= dx;
    }
    rotate(rad: number) {
        this.graph.rotation += rad;
    }
    protected changeY(dy: number) {
        if (this.graph.y < -innerHeight / 2 || this.graph.y > innerHeight / 2) return;
        this.graph.y += dy;
    }
    move() {
        this._timer = setInterval(() => {
            this.changeX(SHIP_SPEED);
            if (this.graph.x < PORT_WIDTH * innerWidth - innerWidth) {
                this.stop();
            }
        }, 100) as unknown as number;
    }
    stop() {
        clearInterval(this._timer);
    }
    moveBack() {}
}
