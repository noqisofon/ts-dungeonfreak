import {TileType}     from './TileType';

namespace dungeon {

    /*!
     * ダンジョンのタイル
     */
    export class Tile {
        /*!
         *
         * \param title_type {TitleType}     タイルの種類
         * \param self_light {boolean}          自分自身で光るかどうか
         */
        constructor(tile_type : TileType, self_light : boolean = false) {
            this.type_                 = tile_type;
            this.self_light_           = self_light;

            this.visible_              = false;
            this.explored_             = false;
            this.light_by_thing_       = false;
            this.tile_permanent_light_ = false;
        }

        /*!
         *
         */
        get type()                 : TileType { return this.type_; }
        set type(value : TileType) : void     {        this.type_ = value; }

        /*!
         *
         */
        get isVisible()            : boolean  { return this.visible_; }

        /*!
         *
         */
        get isExplored()           : boolean  { return this.explored_; }

        /*!
         *
         */
        get isTileThingLight()     : boolean  { return this.light_by_thing_; }

        private type_                 : TileType;
        private self_light_           : boolean;

        private visible_              : boolean;
        private explored_             : boolean;
        private light_by_thing_       : boolean;
        private tile_permanent_light_ : boolean;
    }


}
