import { Application, Graphics } from "pixi.js";
import { ITerminal } from "../terminals/terminal";
import { PORT_WIDTH, SD, SHIP_SPEED } from "../consts";
import { appWidth } from "..";

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
    ships: IShip[];
    graph: Graphics;
    type?: string;
    fillingIn(): void;
    fillingOut(): void;
    shipIntersect(shipOther: IShip): boolean;
    shipsIntersect(ships: IShip[]): boolean;
    move(app: Application, terminals: ITerminal[]): void;
    stop(): void;
    rotate(rad: number): void;
    moveTo(x: number, y: number): void;
}

export class Ship implements IShip {
    id: number;
    ships: IShip[];
    full: boolean;
    graph: Graphics;
    private _timer: number;
    private _speed: number;

    constructor(id: number, ships: IShip[], full: boolean) {
        this.id = id;
        this.ships = ships;
        this.full = full;
        this._speed = SHIP_SPEED;
        this._timer = 0;
        this.graph = new Graphics();
    }

    fillingIn() {
        this.full = true;
        console.log(`ship ${this.id} is full`);
    }

    fillingOut() {
        this.full = false;
        console.log(`ship ${this.id} is empty`);
    }

    protected changeX(direction: boolean | number) {
        if (Boolean(direction)) this.graph.x += this._speed;
        else this.graph.x -= this._speed;
    }
    protected changeY(dy: number) {
        this.graph.y += dy;
    }
    rotate(rad: number) {
        this.graph.rotation += rad;
    }

    // move(app: Application, terminals: ITerminal[]) {
    //     // eslint-disable-next-line @typescript-eslint/no-this-alias
    //     const savedThis = this;

    //     this._timer = setInterval(() => {
    //         function update(): void {
    //
    //             if (savedThis.graph.x < PORT_WIDTH * appWidth && savedThis.id !== 0) {
    //                 savedThis.stop();
    //                 console.log("saved this.graph.x= ", savedThis.graph.x);
    //             }
    //             if (savedThis.id == 0 && savedThis.graph.x <appWidth / 2 + SHIPS_LENGTH) {
    //                 terminals[0].fillingIn();
    //                 savedThis.fillingOut();
    //                 savedThis.stop();
    //                 console.log("0 saved this.graph.x= ", savedThis.graph.x);
    //             }
    //             savedThis.changeX(-SHIP_SPEED);

    //             app.render();
    //         }
    //         requestAnimationFrame(update);
    //     }, 16.666666667) as unknown as number;
    // }

    // stop() {
    //     clearInterval(this._timer);
    // }

    move() {
        if (this.graph.x > PORT_WIDTH * appWidth) this.changeX(0);
    }
    moveTo(x: number, y: number) {
        // this._speed = SHIP_SPEED;
        // this.graph.x += this._speed;
        // this.graph.y += this._speed;
        this.graph.x = x;
        this.graph.y = y;
        this._speed = 0;
    }
    shipIntersect(shipOther: IShip) {
        return (
            this.graph.x < shipOther.graph.x + shipOther.graph.width + SD &&
            this.graph.x + this.graph.width + SD > shipOther.graph.x &&
            this.graph.y < shipOther.graph.y + shipOther.graph.height + SD &&
            this.graph.y + this.graph.height + SD > shipOther.graph.y
        );
    }

    shipsIntersect(ships: IShip[]): boolean {
        ships.forEach((ship) => {
            if (this.id !== ship.id) {
                if (this.shipIntersect(ship)) {
                    if (this.id > ship.id) this.stop();
                    return true;
                }
            }
        });
        return false;
    }

    stop() {
        this._speed = 0;
    }
}
