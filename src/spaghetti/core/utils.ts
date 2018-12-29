namespace core {


    /*!
     * begin..end を返します。
     */
    export function* range(begin : number, end : number, interval : number = 1) {
        for ( let i = begin; i < end; i += interval ) {
            yield i;
        }
    }


}
