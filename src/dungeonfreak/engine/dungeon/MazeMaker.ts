import {Array2D, RNG, range}   from '../../../spaghetti/core';
import {Point, Rect, Vector2D} from '../../../spaghetti/geom';

namespace dungeon {


    export interface Cell {
        isOpen          : boolean;
        isLeftWallOpen  : boolean;
        isTopWallOpen   : boolean;
    }
    
    /*!
     * 迷路を作成するやつです。
     */
    export class MazeMaker {
        /*!
         * 迷路の大きさ width と height を渡して MazeMaker を初期化します。
         *
         * \param width  {number} 迷路の幅
         * \param height {number} 迷路の高さ
         */
        constructor(width : number, height : number) {
            this.cells_ = new Array2D<Cell>( width + 1, height + 1 );
            this.cells_.fillMap( pos => new Cell() );
        }

        /*!
         * 
         */
        get bounds() : Rect { return new Rect( 0, 0, this.cells_.width - 1, this.cells_.height - 1 ); }

        /*!
         * 
         */
        growTree() : void {
            let cells   : Point[] = [];

            let a_point : Point   = RNG.nextPoint( this.bounds );

            this.open( a_point );
            cells.push( a_point );

            while ( cell.length > 0 ) {
                let index : number = Math.abs( RNG.triangleInt( 0, cells.length - 1 ) );
                let cell  : Point  = cells[index];

                let unmade_cells : Direction[]  = [];
                for ( let a_direction of [ Direction.North, Direction.East, Direction.South, Direction.West ] ) {
                    if ( this.canCarve( cell, a_direction ) ) { unmade_cells.push( a_direction ); }
                }

                if ( unmade_cells.length > 0 ) {
                    let a_direction = RNG.choose( unmade_cells );

                    this.carve( cell, a_direction );

                    cells.push( cell.plusDirection( a_direction ) );
                } else {
                    let removee = cells[index];

                    cells.remove( removee );
                }
            }
        }

        /*!
         *
         */
        addLoops(change : number) : void {
            if ( change > 0 ) {
                let a_rect = this.bounds;

                for ( let y of range( 0, a_rect.height ) ) {
                    for ( let x of range( 0, a_rect.width ) ) {
                        let a_cell = new Vector2D( x, y );

                        for ( let a_direction of [ Direction.East, Direction.South ] ) {
                            if ( RNG.oneIn( change ) ) {
                                if ( this.isOpen( a_cell ) && this.isOpen( a_cell.pushDirection( a_direction ) ) ) {
                                    this.carve( a_cell, a_direction );
                                }
                            }
                        }
                    }
                }
            }
        }

        /*!
         *
         */
        sparsify(sparse_step : number) : void {
            for ( let i in range( 0, sparse_step - 1 ) ) {
                for ( let y of range( 0, this.bounds.height ) ) {
                    for ( let x of range( 0, this.bounds.width ) ) {
                        let a_cell = new Vector2D( x, y );

                        if ( this.getNumExists( a_cell ) == 1 ) {
                            this.fill( a_cell );
                        }
                    }
                }
            }
        }

        /*!
         *
         */
        draw(tiles : Array2D) : void {
            this.drawMap( pos => tiles[pos].type = TitleType.Floor );
        }

        /*!
         *
         */
        drawMap(carve_opening : (pos : Vector2D) => void) : void {
            for ( let y of range( 0, this.bounds.height ) ) {
                for ( let x of range( 0, this.bounds.width ) ) {
                    let position = new Vector2D( x, y );

                    if ( this.bounds.contains( position ) && this.cells_[position].isOpen ) {
                        let tile : Vector2D = ( position * 2 ) + 1;

                        carve_opening( tile );
                    }

                    if ( position.y < this.bounds.height && this.cell_[position].isLeftWallOpen ) {
                        let tile : Vector2D = ( position * 2 ) + new Vector2D( 0, 1 );

                        carve_opening( tile );
                    }

                    if ( position.x < this.bounds.width && this.cells_[position].isTopWallOpen ) {
                        let tile : Vector2D = ( position * 2 ) + new Vector2D( 0, 1 );

                        carve_opening( tile );
                    }
                }
            }
        }

        /*!
         *
         */
        private isOpen(position : Vector2D) : boolean {
            if ( !this.bounds.contains( position ) ) {
                ThrowHelper.argumentOutOfRange( 'position' );
            }

            return this.cells_[position].isOpen;
        }

        /*!
         *
         */
        private canCarve(position : Vector2D, a_direction : Direction) : boolean {
            if ( !this.bounds.contains( position ) ) {

                return false;
            }

            if ( !this.bounds.contains( position.plusDirection( a_direction ) ) ) {

                return false;
            }

            if ( this.cells_[position.plusDirection( a_direction )].isOpen ) {

                return false;
            }

            return true;
        }

        /*!
         *
         */
        private getNumExists(position : Vector2D) : number {
            if ( !this.bounds.contains( position ) ) {
                ThrowHelper.argumentOutOfRange( 'position' );
            }

            let exists = 0;
            if ( this.cells_[position].isLeftWallOpen )               { ++ exists; }
            if ( this.cells_[position].isTopWallOpen )                { ++ exists; }
            if ( this.cells_[position.offsetX( 1 )].isLeftWallOpen )  { ++ exists; }
            if ( this.cells_[position.offsetY( 1 )].isTopWallOpen )   { ++ exists; }

            return exists;
        }

        /*!
         *
         */
        private open(position : Vector2D) : void {
            if ( !this.bounds.contains( position ) ) {
                ThrowHelper.argumentOutOfRange( 'position' );
            }

            this.cells_[position].isOpen = true;
        }

        /*!
         *
         */
        private fill(position : Vector2D) : void {
            if ( !this.bounds.contains( position ) ) {
                ThrowHelper.argumentOutOfRange( 'position' );
            }

            this.cells_[position].isLeftWallOpen              = false;
            this.cells_[position].isTopWallOpen               = false;
            this.cells_[position.offsetX( 1 )].isLeftWallOpen = false;
            this.cells_[position.offsetY( 1 )].isTopWallOpen  = false;
        }

        /*!
         *
         */
        private carve(position : Vector2D, a_direction : Direction) : void {
            if ( !this.bounds.contains( position ) ) {
                ThrowHelper.argumentOutOfRange( 'position' );
            }

            let directed_pos = position.plusDirection( a_direction );
            if ( this.bounds.contains( directed_pos ) ) {
                this.cells_[directed_pos].isOpen = true;
            }

            switch ( a_direction ) {
            case Direction.North:
                this.cells_[position].isLeftWallOpen              = true;
                break;

            case Direction.South:
                this.cells_[position].isTopWallOpen               = true;
                break;

            case Direction.West:
                this.cells_[position.offsetX( 1 )].isLeftWallOpen = true;
                break;

            case Direction.East:
                this.cells_[position.offsetY( 1 )].isTopWallOpen  = true;
                break;

            default:
                ThrowHelper.argument( 'The direction must be one of North, South, East or West' );
                break;
            }
        }


        private cells_  : Array2D<Cell>;
        private bounds_ : Rect;
    }


}
