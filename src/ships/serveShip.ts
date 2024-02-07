import { ShipBring } from "./shipBring";
import { ShipTakeOut } from "./shipTakeOut";
import { IShip, Ship } from "./ship";
import { Application } from "pixi.js";

export function initShip(
    app: Application,
    id: number,
    ships: IShip[],
    queueBring: number[],
    queueTakeout: number[],
): IShip {
    let ship: Ship;
    const rand = Math.floor(1 + Math.random() * (2 + 1 - 1));
    if (rand < 2) {
        ship = new ShipTakeOut(id, ships);
        queueTakeout.push(ship.id);
        app.stage.addChild(ship.graph);
        return ship;
    } else {
        ship = new ShipBring(id, ships);
        queueBring.push(ship.id);
        app.stage.addChild(ship.graph);

        return ship;
    }
}

export function initShips(app: Application, queueBring: number[], queueTakeout: number[]): IShip[] {
    let id = 0;
    const ships: IShip[] = [];
    const ship = initShip(app, id, ships, queueBring, queueTakeout);
    id++;
    ships.push(ship);
    // ship.move(app, terminals);

    function createShip(): void {
        if (ships.length < 4) {
            const ship = initShip(app, id, ships, queueBring, queueTakeout);
            ships.push(ship);
            app.stage.addChild(ship.graph);
            // ship.move(app, terminals);
            id++;
        }
    }
    setInterval(createShip, 8000);
    return ships;
}
