import './TileType' as {TileType};

namespace dungeon {

    /*!
     * ダンジョンのタイル
     */
    export interface IDungeonTile {
        tileType           : TileType;
        visible            : bool;
        explored           : bool;
        tileThingLight     : bool;
        tilePermanentLight : bool;
    }


}
