import { COUNT_TERMINAL } from "./../consts";
import { Graphics } from "pixi.js";
import { BOARD_BOTTOM, BOARD_PASSAGE, BOARD_TOP, PORT_WIDTH } from "../consts";
import { ITerminal, TERMINAL_COLOR, TERMINAL_LENGTH, TERMINAL_WIDTH, Terminal } from "./terminal";

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
    for (let i = 0; i < COUNT_TERMINAL; i++) {
        const topY = i * TERMINAL_LENGTH + i * 0.2 * TERMINAL_LENGTH;
        const topLeft = [0, topY];
        const topRight = [TERMINAL_WIDTH, topY];
        const bottomRight = [TERMINAL_WIDTH, topY + TERMINAL_LENGTH];
        const terminal = new Terminal(i + 1, false, topLeft, topRight, bottomRight);
        terminals.push(terminal);
        portArea.beginFill(TERMINAL_COLOR, 0);
        portArea.lineStyle(10, TERMINAL_COLOR, 1);
        portArea.drawRect(0, topRight[1], TERMINAL_WIDTH, TERMINAL_LENGTH);
        portArea.endFill();
    }

    return terminals;
}
