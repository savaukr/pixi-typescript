import { ShipBring } from "./shipBring";
import { ShipTakeOut } from "./shipTakeOut";
import { IShip, Ship, TShips } from "./ship";
import { Application } from "pixi.js";

export function initShip(
    app: Application,
    id: number,
    ships: TShips,
    queueBringIds: string[],
    queueTakeoutIds: string[],
): IShip {
    let ship: Ship;
    // const rand = Math.floor(1 + Math.random() * (2 + 1 - 1));
    // if (rand < 2) {
    if (false) {
        ship = new ShipTakeOut(id, ships);
        ships[id] = ship;
        queueTakeoutIds.push(id.toString());
        app.stage.addChild(ship.graph);
        return ship;
    } else {
        ship = new ShipBring(id, ships);
        ships[id] = ship;
        queueBringIds.push(id.toString());
        app.stage.addChild(ship.graph);

        return ship;
    }
}

export function initShips(app: Application, queueBringIds: string[], queueTakeoutIds: string[]): TShips {
    let id = 0;
    const ships: TShips = {};
    const ship = initShip(app, id, ships, queueBringIds, queueTakeoutIds);
    ships[id] = ship;
    id++;
    const timerId = setInterval(createShip, 3000);

    function createShip(): void {
        if (id < 1) {
            const ship = initShip(app, id, ships, queueBringIds, queueTakeoutIds);
            ships[id] = ship;
            app.stage.addChild(ship.graph);
            id++;
        } else clearInterval(timerId);
    }
    return ships;
}
