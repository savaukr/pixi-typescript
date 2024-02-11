import { ShipBring } from "./shipBring";
import { ShipTakeOut } from "./shipTakeOut";
import { IShip, Ship, TShips } from "./ship";
import { Application } from "pixi.js";
import { MAX_SHIP_COUNT, SHIP_CREATE_TIME } from "../consts";

export function initShip(
    app: Application,
    id: number,
    ships: TShips,
    queueBringIds: string[],
    queueTakeoutIds: string[],
): IShip {
    let ship: Ship;
    const rand = Math.floor(Math.random() * 1000);
    if (rand <= 500) {
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
    const timerId = setInterval(createShip, SHIP_CREATE_TIME);

    function createShip(): void {
        if (id < MAX_SHIP_COUNT) {
            const ship = initShip(app, id, ships, queueBringIds, queueTakeoutIds);
            ships[id] = ship;
            app.stage.addChild(ship.graph);
            id++;
        } else clearInterval(timerId);
    }
    return ships;
}
