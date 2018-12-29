import {Size} from './Size';


namespace geom {

    export interface IPointable {
        x : number;
        y : number;
    }

    /*!
     *
     */
    export class Point implements IPointable {

        /*!
         *
         */
        constructor(x : number, y : number) {
            this.x = x;
            this.y = y;
        }

        /*!
         *
         */
        static fromSize(a_size : Size) : Point {
            return new Point( a_size.width, a_size.height );
        }

        /*!
         *
         */
        offset(dx : number, dy : number) : void {
            this.x += dx;
            this.y += dy;
        }

        /*!
         *
         */
        offsetPoint(a_point : Point) : void {
            this.x += a_point.x;
            this.y += a_point.y;
        }

        /*!
         *
         */
        equals(other : Point) : boolean {
            return this.x == other.x && this.y == other.y;
        }

        x : number;
        y : number;
    }


}
