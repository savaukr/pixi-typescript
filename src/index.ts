// import { IShip } from "./ships/ship";
import { Application } from "pixi.js";
import { initTerminals } from "./terminals/serveTerminal";

import { initShips } from "./ships/serveShip";
import "./style.css";
import { ITerminal, TERMINAL_LENGTH } from "./terminals/terminal";

const app = new Application<HTMLCanvasElement>({
    background: "#4d35FF",
    resizeTo: window,
});

export const appHeight = app.renderer.height;
export const appWidth = app.renderer.width;
document.body.appendChild(app.view);

//init elements
const queueBringIds: number[] = [];
const queueTakeoutIds: number[] = [];
const terminals: ITerminal[] = initTerminals(app);
const ships = initShips(app, queueBringIds, queueTakeoutIds);

function gameLoop() {
    if (ships.length) {
        ships.forEach((ship) => {
            if (!ship.shipsIntersect(ships)) {
                ship.move(app, terminals);
            }
        });
    }
    checkTerminals(terminals);
}

app.ticker.add(() => {
    gameLoop();
});

function checkTerminals(terminals: ITerminal[]): void {
    terminals.forEach((terminal) => {
        if (terminal.full) {
            const pickingId = queueTakeoutIds.shift();
            if (pickingId) ships[pickingId].moveTo(terminal.topRight[0], terminal.topRight[1] + TERMINAL_LENGTH / 2);
            setTimeout(() => {
                if (pickingId) ships[pickingId].moveTo(innerWidth, innerHeight / 2);
            }, 5000);
        } else {
            const bringingId = queueBringIds.shift();
            if (bringingId) ships[bringingId].moveTo(terminal.topRight[0], terminal.topRight[1] + TERMINAL_LENGTH / 2);
            setTimeout(() => {
                if (bringingId) ships[bringingId].moveTo(innerWidth, innerHeight / 2);
            }, 5000);
        }
    });
}
// checkTerminals(terminals);
console.log("terminals:", terminals);
console.log("ships:", ships);
console.log("queueBring:", queueBringIds);
console.log("queueTakeout:", queueTakeoutIds);

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
