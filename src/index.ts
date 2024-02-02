import "pixi-spine";
import "./style.css";
import { Terminal, ITerminal, TERMINAL_COLOR, TERMINAL_WIDTH, TERMINAL_LENGTH } from "./terminals/terminal";
import { IShip, Ship, SHIPS_COLORS, SHIPS_WIDTH, SHIPS_LENGTH } from "./ships/ship";

import { Application, Graphics } from "pixi.js";

const app = new Application<HTMLCanvasElement>({
    background: "#4d35FF",
    resizeTo: window,
});
document.body.appendChild(app.view);

const portArea = new Graphics();

function initTerminals(portArea: Graphics): ITerminal[] {
    // board of port
    const PORT_WIDTH = 0.35;
    const BOARD_TOP = 0.3;
    const BOARD_PASSAGE = 0.3;
    const BOARD_BOTTOM = 1 - BOARD_TOP - BOARD_PASSAGE;

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
        const topRight = i * TERMINAL_LENGTH + i * 0.2 * TERMINAL_LENGTH;
        const bottomRight = topRight + TERMINAL_LENGTH;
        const terminal = new Terminal(i, false, topRight, bottomRight);
        terminals.push(terminal);
        portArea.beginFill(TERMINAL_COLOR, 0);
        portArea.lineStyle(10, TERMINAL_COLOR, 1);
        portArea.drawRect(0, topRight, TERMINAL_WIDTH, TERMINAL_LENGTH);
        portArea.endFill();
    }
    return terminals;
}

//ships
function initShip(portArea: Graphics, full: boolean, id: number, color: number, width: number, length: number): IShip {
    const frontRight = innerWidth - length;
    const frontLeft = frontRight + width;
    const backRight = innerWidth;
    const backLeft = backRight + width;
    const ship = new Ship(1, full, frontLeft, frontRight, backLeft, backRight);
    portArea.beginFill(color, 0);
    portArea.lineStyle(10, color, 1);
    portArea.drawRect(innerWidth - length, innerHeight / 2, length, width);
    portArea.endFill();
    return ship;
}
function initShips(portArea: Graphics): IShip[] {
    const ships: IShip[] = [];
    const ship = initShip(portArea, false, 0, SHIPS_COLORS.GREEN, SHIPS_WIDTH, SHIPS_LENGTH);
    ships.push(ship);
    // ships.push(initShip(portArea, true, 0, SHIPS_COLORS.RED, SHIPS_WIDTH, SHIPS_LENGTH));
    return ships;
}

console.log(initTerminals(portArea));
console.log(initShips(portArea));

// Add it to the stage to render
app.stage.addChild(portArea);

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
