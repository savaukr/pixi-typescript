import { Graphics } from "pixi.js";

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
    fillingIn(): void;
    fillingOut(): void;
    shipIntersect(shipOther: IShip): boolean;
    shipsIntersect(ships: TShips): boolean;
    moveToPort(): Promise<void>;
    stop(): void;
    rotate(rad: number): void;
    moveTo(x: number, y: number): Promise<void>;
}

export class Ship implements IShip {
    id: number;
    ships: TShips;
    full: boolean;
    graph: Graphics;
    status: SHIP_STATUS;
    private _stopX: number;
    private _stopY: number;
    private _speedX: number;
    private _speedY: number;

    constructor(id: number, ships: TShips, full: boolean) {
        this.id = id;
        this.ships = ships;
        this.full = full;
        this.graph = new Graphics();
        this.status = SHIP_STATUS.START;
        this._speedX = SHIP_SPEED;
        this._speedY = SHIP_SPEED;
        this._stopX = 0;
        this._stopY = 0;
    }

    fillingIn() {
        this.full = true;
        console.log(`ship ${this.id} is full`);
    }

    fillingOut() {
        this.full = false;
        console.log(`ship ${this.id} is empty`);
    }

    protected changeX(direction: boolean | number, speed: number) {
        if (Boolean(direction)) this.graph.x += speed;
        else this.graph.x -= speed;
    }
    protected changeY(direction: boolean | number, speed: number) {
        if (Boolean(direction)) this.graph.y += speed;
        this.graph.y += speed;
    }
    rotate(rad: number) {
        this.graph.rotation += rad;
    }

    async moveToPort(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this.graph.x > PORT_WIDTH * appWidth) {
                    this.changeX(0, this._speedX);
                } else {
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
                if (this._speedX !== 0 || this._speedY !== 0) {
                    this.changeX(this.graph.x < x, this._speedX);
                    this.changeY(this.graph.y < y, this._speedY);
                } else {
                    const distanceX: number = this._stopX - x;
                    const distanceY: number = this._stopY - y;
                    const distanceTotal: number = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    this._speedX = (distanceX / distanceTotal) * SHIP_SPEED;
                    this._speedY = (distanceY / distanceTotal) * SHIP_SPEED;

                    this.changeX(distanceX > 0, this._speedX);
                    this.changeY(distanceY > 0, this._speedY);
                }

                if (this.graph.x - x < this._speedX) {
                    this.graph.x = x;
                    this._speedX = 0;
                }
                if (this.graph.y - y < this._speedY) {
                    this.graph.y = y;
                    this._speedY = 0;
                }
                if (!this._speedX && !this._speedY) resolve();
            } catch {
                reject();
            }
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
                    if (this.id > ships[id].id) this.stop();
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
        this._speedX = 0;
        this._speedY = 0;
    }
}
