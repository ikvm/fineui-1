import React, {Component} from 'react';
import {HeadCell, Cell} from '../Component';
import {HorizontalLayout} from '../../../layout'

class TableRow extends Component {

    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        cellWidth: 100,
        cellHeight: 40,
    }

    render() {

        const {array, rowIndex, scrollable, colIndex, width, height, layoutPosition, 
               cellHeight, cellWidth, startIndexCol, colWidth, ...props} = this.props;

        let myProps = props;

        return(
            <HorizontalLayout className="table-row" scrollx={true} scrolly={false} scrollable={scrollable}
                              verticalAlign="_middle" width={width} height={cellHeight}>
                {
                    array.map((i, index) => {

                        switch(layoutPosition) {
                            case "leftHead":
                                if (index === colIndex) {
                                    
                                    return <HeadCell className="cell-complete" row={rowIndex} col={index + colIndex + startIndexCol}
                                                 key={i} width={colWidth[startIndexCol + index] - 2} height={cellHeight - 2} head={true} 
                                                 startIndex={colIndex} position="absolute" colWidth={colWidth} {...props}/>;
                                } else {
                                    return <Cell className="cell-lack-left" row={rowIndex} col={index + colIndex + startIndexCol}
                                                 key={i} width={colWidth[startIndexCol + index] - 1} height={cellHeight - 2} head={true}
                                                 startIndex={colIndex} position="absolute" colWidth={colWidth} {...props}/>;
                                }
                                break;
                            case "rightHead":
                                return <HeadCell className="cell-lack-left" row={rowIndex} col={index + colIndex + startIndexCol}
                                             key={i} width={colWidth[startIndexCol + index] - 1} height={cellHeight - 2} head={true}
                                             startIndex={colIndex} position="absolute" colWidth={colWidth} {...props}/>;
                                break;
                            case "leftBody":
                                
                                if (index === colIndex) {
                                    return <Cell className="cell-lack-top" row={rowIndex} col={index + colIndex + startIndexCol}
                                                 key={i} width={colWidth[startIndexCol + index] - 2} height={cellHeight - 1} 
                                                 startIndex={colIndex} colWidth={colWidth}
                                                 position="absolute" {...props}/>;
                                } else {
                                    return <Cell className="cell-lack-left-top" row={rowIndex} col={index + colIndex + startIndexCol}
                                                 key={i} width={colWidth[startIndexCol + index] - 1} height={cellHeight - 1}
                                                 startIndex={colIndex} colWidth={colWidth}
                                                 position="absolute" {...props}/>;
                                }
                                
                                break;
                            default:
                            /* 
                                if (startIndexCol <= index && index <= startIndexCol + (width / cellWidth)) {
                                    
                                    return <Cell className="cell-lack-left-top" row={rowIndex} col={index + colIndex + startIndexCol}
                                                 key={i} width={cellWidth - 1} height={cellHeight - 1} startIndex={colIndex + startIndexCol} 
                                                 position="absolute" {...props}/>;
                                } else {
                                    return null;
                                }
                                */
                               // window.console.log(index + " " + startIndexCol + " " + colIndex);
                                return <Cell className="cell-lack-left-top" row={rowIndex} col={index + colIndex + startIndexCol}
                                             key={i} width={colWidth[startIndexCol + index] - 1} height={cellHeight - 1} startIndex={colIndex} 
                                             position="absolute" colWidth={colWidth} {...props}/>;
                                break;
                        }
                    })
                }
            </HorizontalLayout>
        );
    }
}

export default TableRow