import { Application } from "pixi.js";
import { checkTerminals, initTerminals } from "./terminals/serveTerminal";

import { initShips } from "./ships/serveShip";
import "./style.css";
import { ITerminal } from "./terminals/terminal";
import { SHIPS_TYPE, SHIP_STATUS } from "./ships/ship";

import { TIME_IN_TERMINAL } from "./consts";

const app = new Application<HTMLCanvasElement>({
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
            if (!ships[id].shipsIntersect(ships) && ships[id].status === SHIP_STATUS.START) {
                ships[id].moveToPort();
            }

            if (ships[id].status === SHIP_STATUS.PORT) {
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
                                    ships[id].status = SHIP_STATUS.OUT;
                                    resolve(id);
                                }
                                ships[id].timer = window.setTimeout(fillOut, TIME_IN_TERMINAL);
                            });
                        } else {
                            //if nee a few ship of one type  one time  in port
                            // queueTakeoutIds.shift();
                            // terminal.full = false;
                            return new Promise((resolve) => {
                                function fillIn() {
                                    terminal?.fillingOut();
                                    ships[id].fillingIn();
                                    queueTakeoutIds.shift();
                                    ships[id].status = SHIP_STATUS.OUT;
                                    resolve(id);
                                }
                                ships[id].timer = window.setTimeout(fillIn, TIME_IN_TERMINAL);
                            });
                        }
                    });
                }
            }
            if (ships[id].status === SHIP_STATUS.OUT) {
                console.log("OUT");
                ships[id].moveToOut();
            }
        });
    }
}

app.ticker.add(() => {
    gameLoop();
});

// setTimeout(() => {
//     console.log("ships:", ships);
//     console.log("terminals", terminals);
// }, 15000);
// console.log(checkTerminals);

// if (ships[0]) ships[0].fillingIn();
// app.view.removeChild(app.view.children[2]);

// Add it to the stage to render
// console.log(
//     `%cPixiJS V7\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
//     "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
//     "color: #D81B60; font-weight: bold;",
//     "color: #C2185B; font-weight: bold; text-decoration: underline;",
//     "color: #ff66a1;",
// );

// import { Application, Assets } from "pixi.js";
// import { getSpine } from "./utils/spine-example";
// import { createBird } from "./utils/create-bird";
// import { attachConsole } from "./utils/attach-console";

// const gameWidth = 1280;
// const gameHeight = 720;

// const app = new Application<HTMLCanvasElement>({
//     backgroundColor: 0xd3d3d3,
//     width: gameWidth,
//     height: gameHeight,
// });

// window.onload = async (): Promise<void> => {
//     await loadGameAssets();

//     document.body.appendChild(app.view);

//     resizeCanvas();

//     const birdFromSprite = createBird();
//     birdFromSprite.anchor.set(0.5, 0.5);
//     birdFromSprite.position.set(gameWidth / 2, gameHeight / 4);

//     const spineExample = await getSpine();

//     app.stage.addChild(birdFromSprite);
//     app.stage.addChild(spineExample);
//     app.stage.interactive = true;

//     if (VERSION.includes("d")) {
//         // if development version
//         attachConsole(app.stage, gameWidth, gameHeight);
//     }
// };

// async function loadGameAssets(): Promise<void> {
//     const manifest = {
//         bundles: [
//             {
//                 name: "bird",
//                 assets: [
//                     {
//                         name: "bird",
//                         srcs: "./assets/simpleSpriteSheet.json",
//                     },
//                 ],
//             },
//             {
//                 name: "pixie",
//                 assets: [
//                     {
//                         name: "pixie",
//                         srcs: "./assets/spine-assets/pixie.json",
//                     },
//                 ],
//             },
//         ],
//     };

//     await Assets.init({ manifest });
//     await Assets.loadBundle(["bird", "pixie"]);
// }

// function resizeCanvas(): void {
//     const resize = () => {
//         app.renderer.resize(window.innerWidth, window.innerHeight);
//         app.stage.scale.x = window.innerWidth / gameWidth;
//         app.stage.scale.y = window.innerHeight / gameHeight;
//     };

//     resize();

//     window.addEventListener("resize", resize);
// }
