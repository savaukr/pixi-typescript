import { Application } from "pixi.js";
import { checkTerminals, initTerminals } from "./terminals/serveTerminal";

import { initShips } from "./ships/serveShip";
import "./style.css";
import { ITerminal } from "./terminals/terminal";
import { SHIPS_TYPE, SHIP_STATUS } from "./ships/ship";

import { TIME_IN_TERMINAL } from "./consts";

export const app = new Application<HTMLCanvasElement>({
    background: "#4d35FF",
    resizeTo: window,
});

export const appHeight = app.renderer.height;
export const appWidth = app.renderer.width;
document.body.appendChild(app.view);

//init elements
const queueBringIds: string[] = [];
const queueTakeoutIds: string[] = [];
const terminals: ITerminal[] = initTerminals(app);
const ships = initShips(app, queueBringIds, queueTakeoutIds);

function gameLoop() {
    const shipArr = Object.keys(ships);
    if (shipArr.length) {
        shipArr.forEach((id: string) => {
            if (ships[id] && !ships[id].shipsIntersect(ships) && ships[id].status === SHIP_STATUS.START) {
                ships[id].moveToPort();
            }

            if (ships[id] && ships[id].status === SHIP_STATUS.PORT) {
                const terminal = checkTerminals(terminals, id, queueTakeoutIds, queueBringIds);
                if (terminal) {
                    ships[id].moveToTerminal(terminal).then((id) => {
                        ships[id].status = SHIP_STATUS.TERMINAL;

                        if (ships[id].type === SHIPS_TYPE.BRING) {
                            //if nee a few ship of one type  one time  in port
                            // queueBringIds.shift();
                            // terminal.full = true;
                            return new Promise((resolve) => {
                                function fillOut() {
                                    terminal?.fillingIn();
                                    ships[id].fillingOut();
                                    queueBringIds.shift();
                                    ships[id].status = SHIP_STATUS.BEFORE_OUT;
                                    // ships[id].rotate(5 * Math.PI);
                                    // ships[id].graph.rotation = -90;
                                    resolve(id);
                                }
                                ships[id].timer = window.setTimeout(fillOut, TIME_IN_TERMINAL);
                            });
                        } else {
                            //if need a few ship of one type  one time  in port
                            // queueTakeoutIds.shift();
                            // terminal.full = false;
                            return new Promise((resolve) => {
                                function fillIn() {
                                    terminal?.fillingOut();
                                    ships[id].fillingIn();
                                    queueTakeoutIds.shift();
                                    ships[id].status = SHIP_STATUS.BEFORE_OUT;
                                    // ships[id].rotate(5 * Math.PI);
                                    // ships[id].graph.rotation = 180;

                                    resolve(id);
                                }
                                ships[id].timer = window.setTimeout(fillIn, TIME_IN_TERMINAL);
                            });
                        }
                    });
                }
            }
            if (ships?.[id] && ships[id].status === SHIP_STATUS.BEFORE_OUT) {
                ships[id].moveToMiddle().then(() => {
                    ships[id].rotate(5 * Math.PI);
                    ships[id].status = SHIP_STATUS.OUT;
                });
            }
            if (ships?.[id] && ships?.[id].status === SHIP_STATUS.OUT) {
                ships[id].moveToOut().then(() => {
                    ships[id].remove();
                    delete ships[id];
                });
            }
        });
    }
}

app.ticker.add(() => {
    try {
        gameLoop();
    } catch (err) {
        console.log("ERROR", err);
    }
});
