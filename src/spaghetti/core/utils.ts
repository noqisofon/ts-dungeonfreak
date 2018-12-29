namespace core {


    /*!
     * begin..end を返します。
     */
    export function* range(begin, end, interval = 1) {
        for ( let i = begin; i < end; i += interval ) {
            yield i;
        }
    }


}
