import { Graphics } from "pixi.js";
export const WATER_COLOR = 0x4d35ff;
export const TERMINAL_COLOR = 0xffbd01;
export const TERMINAL_WIDTH = 50;
export const TERMINAL_LENGTH = 150;

export interface ITerminal {
    id: number;
    full: boolean;
    graph: Graphics;
    topLeft: number[];
    topRight: number[];
    bottomRight: number[];
    fillingIn(): void;
    fillingOut(): void;
}

export class Terminal implements ITerminal {
    id: number;
    full: boolean;
    graph: Graphics;
    topLeft: number[];
    topRight: number[];
    bottomRight: number[];

    constructor(
        id: number,
        full: boolean,
        graph: Graphics,
        topLeft: number[],
        topRight: number[],
        bottomRight: number[],
    ) {
        this.id = id;
        this.full = full;
        this.graph = graph;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomRight = bottomRight;
    }

    fillingIn() {
        this.full = true;
        console.log(`terminal ${this.id} is full`);
    }

    fillingOut() {
        this.full = false;
        console.log(`terminal ${this.id} is empty`);
    }
}
