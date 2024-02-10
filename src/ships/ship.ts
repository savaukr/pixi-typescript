import { Graphics } from "pixi.js";

import { PORT_WIDTH, SD, SHIPS_WIDTH, SHIP_SPEED } from "../consts";
import { appWidth } from "..";
import { ITerminal, TERMINAL_LENGTH } from "../terminals/terminal";

export enum SHIPS_COLORS {
    GREEN = 0x046a26,
    RED = 0xc4033e,
}

export enum SHIPS_TYPE {
    BRING = "bring",
    TAKEOUT = "takeout",
}

export enum SHIP_STATUS {
    START = "start",
    PORT = "port",
    TERMINAL = "terminal",
    OUT = "out",
}

export type TShips = { [id: string]: IShip };

export interface IShip {
    id: number;
    full: boolean;
    ships: TShips;
    graph: Graphics;
    type?: string;
    status: SHIP_STATUS;
    speedX: number;
    speedY: number;
    fillingIn(): void;
    fillingOut(): void;
    shipIntersect(shipOther: IShip): boolean;
    shipsIntersect(ships: TShips): boolean;
    moveTo(x: number, y: number): Promise<void>;
    moveToPort(): Promise<void>;
    moveToTerminal(terminal: ITerminal): Promise<number>;
    stop(): void;
}

export class Ship implements IShip {
    id: number;
    ships: TShips;
    full: boolean;
    graph: Graphics;
    status: SHIP_STATUS;
    private _stopX: number;
    private _stopY: number;
    speedX: number;
    speedY: number;

    constructor(id: number, ships: TShips, full: boolean) {
        this.id = id;
        this.ships = ships;
        this.full = full;
        this.graph = new Graphics();
        this.status = SHIP_STATUS.START;
        this.speedX = SHIP_SPEED;
        this.speedY = SHIP_SPEED;
        this._stopX = 0;
        this._stopY = 0;
    }

    fillingIn() {
        this.full = true;
    }

    fillingOut() {
        this.full = false;
    }

    protected changeX(direction: boolean | number, speed: number) {
        if (Boolean(direction)) this.graph.x += speed;
        else this.graph.x -= speed;
    }
    protected changeY(direction: boolean | number, speed: number) {
        if (Boolean(direction)) this.graph.y += speed;
        this.graph.y -= speed;
    }
    protected rotate(rad: number) {
        this.graph.rotation += rad;
    }

    async moveToPort(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this.graph.x > PORT_WIDTH * appWidth) {
                    this.changeX(0, this.speedX);
                } else if (this.status === SHIP_STATUS.START) {
                    this.status = SHIP_STATUS.PORT;
                    this.stop();
                    resolve();
                }
            } catch {
                reject();
            }
        });
    }
    async moveTo(x: number, y: number): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this.speedX !== 0 || this.speedY !== 0) {
                    this.changeX(this.graph.x < x, this.speedX);
                    this.changeY(this.graph.y < y, this.speedY);
                } else {
                    const distanceX: number = this._stopX - x;
                    const distanceY: number = this._stopY - y;
                    const distanceTotal: number = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    this.speedX = Math.abs((distanceX / distanceTotal) * SHIP_SPEED);
                    this.speedY = Math.abs((distanceY / distanceTotal) * SHIP_SPEED);
                    this.changeX(distanceX < 0, this.speedX);
                    this.changeY(distanceY < 0, this.speedY);
                }

                if (this.graph.x - x < this.speedX) {
                    this.graph.x = x;
                    this.speedX = 0;
                }
                if (this.graph.y - y < this.speedY) {
                    this.graph.y = y;
                    this.speedY = 0;
                }
                if (!this.speedX && !this.speedY) {
                    resolve();
                    // console.log(`${this.id} ship is stoped in moveTo`);
                }
            } catch {
                reject();
            }
        });
    }

    async moveToTerminal(terminal: ITerminal): Promise<number> {
        return this.moveTo(
            terminal.bottomRight[0],
            terminal.bottomRight[1] - TERMINAL_LENGTH / 2 - SHIPS_WIDTH / 2,
        ).then(() => {
            return this.id;
        });
    }

    shipIntersect(shipOther: IShip) {
        return (
            this.graph.x < shipOther.graph.x + shipOther.graph.width + SD &&
            this.graph.x + this.graph.width + SD > shipOther.graph.x &&
            this.graph.y < shipOther.graph.y + shipOther.graph.height + SD &&
            this.graph.y + this.graph.height + SD > shipOther.graph.y
        );
    }

    shipsIntersect(ships: TShips): boolean {
        const shipArr = Object.keys(ships);
        shipArr.forEach((id: string) => {
            if (this.id !== Number(id)) {
                if (this.shipIntersect(ships[id])) {
                    if (this.id > ships[id].id && this.speedX && this.speedY) {
                        // console.log(`${this.id} ship is stoped inshipsIntersect()`);
                        this.stop();
                    }
                    return true;
                }
            }
        });
        return false;
    }

    stop() {
        if (this.status === SHIP_STATUS.START) this.status = SHIP_STATUS.PORT;
        this._stopX = this.graph.x;
        this._stopY = this.graph.y;
        // console.log(`${this.id} ship is stoped in stop()`);

        this.speedX = 0;
        this.speedY = 0;
    }
}
