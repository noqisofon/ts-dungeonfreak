namespace dungeon {

    /*!
     * ドアの状態を表します。
     */
    export enum DoorStatus {
        /*!
         * ドアは開いています。
         *
         * (')
         */
        Open,
        /*!
         * ドアは閉まっています。
         *
         * (+)
         */
        Close,
        /*!
         * ドアは壊れています。
         *
         * 壊れたドアは空けたり閉めたりできません。
         * 通ることができます。
         */
        Broken
    }
}
