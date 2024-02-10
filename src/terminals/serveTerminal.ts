import { COUNT_TERMINAL } from "./../consts";
import { Application, Graphics } from "pixi.js";
import { BOARD_BOTTOM, BOARD_PASSAGE, BOARD_TOP, PORT_WIDTH } from "../consts";
import { ITerminal, TERMINAL_COLOR, TERMINAL_LENGTH, TERMINAL_WIDTH, TIs_Terminal, Terminal } from "./terminal";
import { appHeight, appWidth } from "..";

export function initTerminals(app: Application): ITerminal[] {
    // board of port
    const portArea = new Graphics();
    portArea.lineStyle(10, TERMINAL_COLOR, 1);
    portArea.drawRect(appWidth * PORT_WIDTH, 0, 0, appHeight * BOARD_TOP);
    portArea.drawRect(appWidth * PORT_WIDTH, appHeight * (BOARD_PASSAGE + BOARD_TOP), 0, appHeight * BOARD_BOTTOM);
    // terminals
    const terminals: ITerminal[] = [];
    for (let i = 0; i < COUNT_TERMINAL; i++) {
        const graph = new Graphics();
        const topY = i * TERMINAL_LENGTH + i * 0.2 * TERMINAL_LENGTH;
        const topLeft = [0, topY];
        const topRight = [TERMINAL_WIDTH, topY];
        const bottomRight = [TERMINAL_WIDTH, topY + TERMINAL_LENGTH];
        const terminal = new Terminal(i + 1, false, graph, topLeft, topRight, bottomRight);
        terminals.push(terminal);
        graph.beginFill(TERMINAL_COLOR, 0);
        graph.lineStyle(10, TERMINAL_COLOR, 1);
        graph.drawRect(0, topRight[1], TERMINAL_WIDTH, TERMINAL_LENGTH);
        graph.endFill();
        app.stage.addChild(graph);
    }
    app.stage.addChild(portArea);
    return terminals;
}

export function checkTerminals(
    terminals: ITerminal[],
    shipId: string,
    queueTakeoutIds: string[],
    queueBringIds: string[],
): TIs_Terminal {
    let founded = null;
    let i = 0;
    while (i < terminals.length && !founded) {
        if (!terminals[i].full && queueBringIds.length) {
            if (queueBringIds[0] === shipId) {
                founded = terminals[i];
            }
        }
        if (terminals[i].full && queueTakeoutIds.length) {
            if (queueTakeoutIds[0] === shipId) {
                founded = terminals[i];
            }
        }
        i++;
    }
    return founded;
}

// export function updViewTerminal(portArea: Graphics, i: number, terminals: ITerminal[]): void {
//     const topY = i * TERMINAL_LENGTH + i * 0.2 * TERMINAL_LENGTH;
//     const topRight = [TERMINAL_WIDTH, topY];
//     portArea.beginFill(TERMINAL_COLOR, terminals[i].full ? 1 : 0);
//     portArea.lineStyle(10, TERMINAL_COLOR, 1);
//     portArea.drawRect(0, topRight[1], TERMINAL_WIDTH, TERMINAL_LENGTH);
//     portArea.endFill();
// }
