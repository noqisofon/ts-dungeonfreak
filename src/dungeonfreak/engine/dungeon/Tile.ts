import {IDungeonTile} from './IDungeonTile';
import {TileType}     from './TileType';

namespace dungeon {


    /*!
     *
     */
    export class Tile extends IDungeonTile {
        /*!
         *
         * \param title_type {TitleType}     タイルの種類
         * \param self_light {bool}          自分自身で光るかどうか
         */
        constructor(tile_type : TileType, self_light : bool = false) {
            this.type_                = tile_type;
            this.self_light_          = self_light;

            this.visible_             = false;
            this.explored_            = false;
            this.light_by_thing_      = false;
            this.tile_permanent_light = false;
        }

        /*!
         *
         */
        get type()                 : TileType { return this.type_; }
        set type(value : TileType) : void     {        this.type_ = value; }
    }


}
