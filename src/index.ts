// import "pixi-spine";
import "./style.css";
import { Terminal, ITerminal, TERMINAL_COLOR, TERMINAL_WIDTH, TERMINAL_LENGTH } from "./terminals/terminal";
import { IShip, Ship, SHIPS_COLORS, SHIPS_WIDTH, SHIPS_LENGTH } from "./ships/ship";
import { ShipTakeOut } from "./ships/shipTakeOut";
import { ShipBring } from "./ships/shipBring";
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

//ships
function initShip(id: number, width: number, length: number): IShip {
    const graph = new Graphics();
    const frontRight = innerWidth - length;
    const frontLeft = frontRight + width;
    const backRight = innerWidth;
    const backLeft = backRight + width;
    const rand = Math.random();
    let ship: Ship;
    if (rand < 0.5) {
        ship = new ShipTakeOut(id, false, frontLeft, frontRight, backLeft, backRight, graph);
        graph.beginFill(SHIPS_COLORS.GREEN, 0);
        graph.lineStyle(10, SHIPS_COLORS.GREEN, 1);
        graph.drawRect(innerWidth - length, innerHeight / 2 + 0.5 * width, length, width);
        graph.endFill();
        return ship;
    } else {
        ship = new ShipBring(id, true, frontLeft, frontRight, backLeft, backRight, graph);
        graph.beginFill(SHIPS_COLORS.RED, 1);
        graph.lineStyle(10, SHIPS_COLORS.RED, 1);
        graph.drawRect(innerWidth - length, innerHeight / 2 - 3.3 * width, length, width);
        graph.endFill();
        return ship;
    }
}

function initShips(): IShip[] {
    let id = 0;
    const ships: IShip[] = [];
    const ship = initShip(id, SHIPS_WIDTH, SHIPS_LENGTH);
    ships.push(ship);
    ship.move();
    app.stage.addChild(ship.graph);

    function createShip(): void {
        if (ships.length < 20) {
            const ship = initShip(id, SHIPS_WIDTH, SHIPS_LENGTH);
            ships.push(ship);
            app.stage.addChild(ship.graph);
            ship.move();
            id++;
        }
        console.log(ships);
    }
    setInterval(createShip, 8000);
    return ships;
}

const ships = initShips();
const terminals = initTerminals(portArea);

// ships[0].y += 5;
console.log(terminals);
console.log(ships);

//Filling terminal
// portArea.beginFill(TERMINAL_COLOR, 1);
// portArea.lineStyle(10, TERMINAL_COLOR, 1);
// portArea.drawRect(terminals[0].topRight, terminals[0].topRight, TERMINAL_WIDTH, TERMINAL_LENGTH);
// portArea.endFill();

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
