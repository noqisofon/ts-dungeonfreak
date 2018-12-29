namespace geom {

    /*!
     *
     */
    export interface ISizable {
        width  : number;
        height : number;
    }

    /*!
     *
     */
    export class Size {
        /*!
         *
         */
        constructor(width : number = 0, height : number = 0) {
            this.width  = width;
            this.height = height;
        }

        width  : number;
        height : number;
    }

}
