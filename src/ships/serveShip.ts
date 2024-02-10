import { ShipBring } from "./shipBring";
import { ShipTakeOut } from "./shipTakeOut";
import { IShip, Ship, TShips } from "./ship";
import { Application } from "pixi.js";

export function initShip(
    app: Application,
    id: number,
    ships: TShips,
    queueBring: number[],
    queueTakeout: number[],
): IShip {
    let ship: Ship;
    const rand = Math.floor(1 + Math.random() * (2 + 1 - 1));
    if (rand < 2) {
        ship = new ShipTakeOut(id, ships);
        ships[id] = ship;
        queueTakeout.push(ship.id);
        app.stage.addChild(ship.graph);
        return ship;
    } else {
        ship = new ShipBring(id, ships);
        ships[id] = ship;
        queueBring.push(ship.id);
        app.stage.addChild(ship.graph);

        return ship;
    }
}

export function initShips(app: Application, queueBring: number[], queueTakeout: number[]): TShips {
    let id = 0;
    const ships: TShips = {};
    const ship = initShip(app, id, ships, queueBring, queueTakeout);
    ships[id] = ship;
    id++;
    // ship.move(app, terminals);
    const timerId = setInterval(createShip, 8000);
    function createShip(): void {
        if (id < 4) {
            const ship = initShip(app, id, ships, queueBring, queueTakeout);
            ships[id] = ship;
            app.stage.addChild(ship.graph);
            // ship.move(app, terminals);
            id++;
        } else clearInterval(timerId);
    }
    return ships;
}
