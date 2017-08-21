import React, {Component} from 'react';
import {TableRow} from '../Component';
import {VerticalLayout} from '../../../layout';

class TableBody extends Component {

    constructor(props, context) {
        super(props, context);
    }

    _handleWheel = (e) => {
        e.preventDefault();
        let dy = e.deltaY;
        this.props.onWheelY(dy);
    }

    render() {

        const {array, className, width, height, scrollx, scrolly, scrollable, cellHeight, cellIndex, 
               startIndexRow, startIndexCol, layoutLeft, colWidth, ...props} = this.props;

        return(
                <VerticalLayout className={className} scrollx={scrollx} scrolly={scrolly} scrollable={scrollable} 
                                width={width} height={height} left={layoutLeft}>
                    <div className="body-cover" onWheel={this._handleWheel} >
                        {
                            array.map((arrayRow, index) => {
                                return( 
                                    <TableRow key={startIndexRow + index} rowIndex={startIndexRow + index}
                                              array={arrayRow.slice(startIndexCol, startIndexCol + width / 100 + 2)} 
                                              width={width} startIndexCol={startIndexCol} 
                                              colWidth={colWidth} {...props}/>
                                );
                            })
                        }
                    </div>
                </VerticalLayout>
            );
    }
}

export default TableBody