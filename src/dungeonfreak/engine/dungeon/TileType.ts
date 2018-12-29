import {DoorStatus}   from './DoorStatus';
import {StairStatus}  from './StairStatus';
import {WallMaterial} from './WallMaterial';


namespace dungeon {

    /*!
     *
     */
    export abstract class TileType {
    }

    /*!
     * 床を表します。
     */
    export class Floor extends TileType {
    }

    /*!
     * 壁を表します。
     */
    export class Wall extends TileType {
        constructor(material : WallMaterial) {
            super();

            this.material = material;
        }

        material : WallMaterial;
    }

    /*!
     * ドアを表します。
     */
    export class Door extends TileType {
        constructor(status : DoorStatus) {
            super();

            this.status = status;
        }

        status : DoorStatus;
    }

    /*!
     * 階段を表します。
     */
    export class Stairs extends TileType {
        constructor(status : StairStatus) {
            super();

            this.status = status;
        }

        status : StairStatus;
    }

}
