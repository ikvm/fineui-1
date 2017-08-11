import React, {Component} from 'react';
import {Cell} from '../Component';
import {HorizontalLayout} from '../../../layout';

class TableRow extends Component {

    render() {

        const {array, rowIndex, colNum, colIndex, head, left, top, scrollable} = this.props;

        return(
            <HorizontalLayout className="table-row" scrollx={true} scrolly={false} scrollable={scrollable}
                              verticalAlign="_middle">
                {
                    array.map((i) => {
                        if (i === colIndex) {
                            return(
                                <Cell className="cell-complete" row={rowIndex} col={i} startIndex={colIndex}
                                              key={i + rowIndex * colNum} left={left} head={head} top={top}/>
                            );
                        } else {
                            return(
                                <Cell className="cell-lack-left" row={rowIndex} col={i} startIndex={colIndex}
                                              key={i + rowIndex * colNum} left={left} head={head} top={top}/>
                            );
                        }
                    })
                }
            </HorizontalLayout>
        );
    }
}

export default TableRow