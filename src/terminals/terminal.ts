export const TERMINAL_COLOR = 0xffbd01;
export const TERMINAL_WIDTH = 50;
export const TERMINAL_LENGTH = 150;

export interface ITerminal {
    id: number;
    full: boolean;
    topRight: number;
    bottomRight: number;
    fillingIn(): void;
    fillingOut(): void;
}

export class Terminal implements ITerminal {
    id: number;
    full: boolean;
    topRight: number;
    bottomRight: number;

    constructor(id: number, full: boolean, topRight: number, bottomRight: number) {
        this.id = id;
        this.full = full;
        this.topRight = topRight;
        this.bottomRight = bottomRight;
    }

    fillingIn() {
        console.log(`terminal ${this.id} is full`);
    }

    fillingOut() {
        console.log(`terminal ${this.id} is empty`);
    }
}