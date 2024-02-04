import { Graphics } from "pixi.js";
import { BOARD_BOTTOM, BOARD_PASSAGE, BOARD_TOP, PORT_WIDTH } from "../consts";
import { ITerminal, TERMINAL_COLOR, TERMINAL_LENGTH, TERMINAL_WIDTH, Terminal } from "./terminal";

export type TTerminal = Graphics | ITerminal;

export function initTerminals(portArea: Graphics): ITerminal[] {
    // board of port

    portArea.lineStyle(10, TERMINAL_COLOR, 1);
    portArea.drawRect(innerWidth * PORT_WIDTH, 0, 0, innerHeight * BOARD_TOP);
    portArea.drawRect(
        innerWidth * PORT_WIDTH,
        innerHeight * (BOARD_PASSAGE + BOARD_TOP),
        0,
        innerHeight * BOARD_BOTTOM,
    );
    // terminals
    const terminals: ITerminal[] = [];
    for (let i = 0; i < 4; i++) {
        const topLeft = 0;
        const topRight = i * TERMINAL_LENGTH + i * 0.2 * TERMINAL_LENGTH;
        const bottomRight = topRight + TERMINAL_LENGTH;
        const terminal = new Terminal(i, false, topLeft, topRight, bottomRight);
        terminals.push(terminal);
        portArea.beginFill(TERMINAL_COLOR, 0);
        portArea.lineStyle(10, TERMINAL_COLOR, 1);
        portArea.drawRect(0, topRight, TERMINAL_WIDTH, TERMINAL_LENGTH);
        portArea.endFill();
    }
    return terminals;
}

//init elements
const portArea = new Graphics();
export const terminals: TTerminal[] = [portArea, ...initTerminals(portArea)];
