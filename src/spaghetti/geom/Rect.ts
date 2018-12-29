import {Point} from './Point';


namespace geom {

    /*!
     *
     */
    export class Rect {
        /*!
         * 
         * 
         * \param x      {number}   x 軸座標の値
         * \param y      {number}   y 軸座標の値
         * \param width  {number}   幅
         * \param height {number}   高さ
         */
        constructor(x : number, y : number, width: number, height: number) {
            this.x      = x;
            this.y      = y;
            this.width  = width;
            this.height = height;
        }

        /*!
         *
         */
        get left()   : number { return this.x; }

        /*!
         *
         */
        get top()    : number { return this.y; }

        /*!
         *
         */
        get right()  : number { return this.x + this.width; }

        /*!
         *
         */
        get bottom() : number { return this.y + this.height; }

        /*!
         *
         */
        get topLeft()   : Point { return new Point( this.left, this.top ); }

        /*!
         *
         */
        get topRight()  : Point { return new Point( this.right, this.top ); }

        /*!
         *
         */
        get bottomLeft() : Point { return new Point( this.left, this.bottom ); }

        /*!
         *
         */
        get bottomRight() : Point { return new Point( this.right, this.bottom ); }

        /*!
         *
         */
        get center()      : Point { return new Point( Math.floor( ( this.left + this.right)   / 2 ),
                                                      Math.floor( ( this.top  + this.bottom ) / 2 ) ); }

        /*!
         *
         */
        contains(x : number, y : number) : boolean {
            if ( x < this.x ) {

                return false;
            }

            if ( x >= this.right ) {

                return false;
            }

            if ( y < this.y ) {

                return false;
            }

            if ( y >= this.bottom ) {

                return false;
            }

            return true;
        }

        /*!
         *
         */
        containsPoint(a_point : Point) : boolean {
            return this.contains( a_point.x, a_point.y );
        }

        /*!
         *
         */
        containsRect(other : Rect) : boolean {
            if ( other.left < this.left ) {

                return false;
            }

            if ( other.right > this.right ) {

                return false;
            }

            if ( other.top < this.top ) {

                return false;
            }

            if ( other.bottom > this.bottom ) {

                return false;
            }

            return true;
        }

        /*!
         *
         */
        overlaps(other : Rect) : boolean {
            if ( this.left > other.right ) {

                return false;
            }

            if ( this.right < other.left ) {

                return false;
            }

            if ( this.top > other.bottom ) {

                return false;
            }

            if ( this.bottom < other.top ) {

                return false;
            }

            return true;
        }

        x      : number;
        y      : number;
        width  : number;
        height : number;
    }

}
