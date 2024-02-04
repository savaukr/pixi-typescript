import { ShipBring } from "./shipBring";
import { ShipTakeOut } from "./shipTakeOut";
import { IShip, SHIPS_COLORS, Ship } from "./ship";
import { Application, Graphics } from "pixi.js";
import { SHIPS_LENGTH, SHIPS_WIDTH } from "../consts";

export function initShip(id: number, width: number, length: number): IShip {
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
        graph.drawRect(innerWidth, innerHeight / 2 + 0.5 * width, length, width);
        graph.endFill();
        return ship;
    } else {
        ship = new ShipBring(id, true, frontLeft, frontRight, backLeft, backRight, graph);
        graph.beginFill(SHIPS_COLORS.RED, 1);
        graph.lineStyle(10, SHIPS_COLORS.RED, 1);
        graph.drawRect(innerWidth, innerHeight / 2 - 3.3 * width, length, width);
        graph.endFill();
        return ship;
    }
}

export function initShips(app: Application): IShip[] {
    let id = 0;
    const ships: IShip[] = [];
    const ship = initShip(id, SHIPS_WIDTH, SHIPS_LENGTH);
    ships.push(ship);
    ship.move(app);
    app.stage.addChild(ship.graph);

    function createShip(): void {
        if (ships.length < 4) {
            const ship = initShip(id, SHIPS_WIDTH, SHIPS_LENGTH);
            ships.push(ship);
            app.stage.addChild(ship.graph);
            ship.move(app);
            id++;
        }
        console.log(ships);
    }
    setInterval(createShip, 8000);
    return ships;
}

// export function updateWrapper(graph: Graphics, app: Application) {
//     function update(): void {
//         graph.position.x += 1;
//         app.render();
//         requestAnimationFrame(update);
//     }
//     update();
// }
