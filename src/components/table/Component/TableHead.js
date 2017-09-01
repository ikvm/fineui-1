import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HeadCell, Cell } from '../Component';
import { AbsoluteLayout, HorizontalLayout, VerticalLayout } from '../../../core/layout';

class TableHead extends Component {

    render() {

        const { className, array, cellState, width, height, layoutPosition, top, left, startCol, layoutLeft, endCol,
            onTableCellResize, colLength, ...props } = this.props;

        return (

            <VerticalLayout ref={(div) => this._headDiv = div} scrollable={true} width={width + 6} height={height * array.length + 6}>
                <AbsoluteLayout width={colLength} height={height * array.length}>
                    {
                        cellState.map((item, index) => {
                            let r = item.row;
                            let c = item.col;
                            let text = array[r][c];
                            let newLeft = item.x;
                            let newTop = item.y + top;
                            let children = <span>{text}</span>;
                            switch (layoutPosition) {
                                case "leftHead":
                                    if (c === startCol) {
                                        return <HeadCell className="cell-complete" col={item.col} key={text}
                                            width={item.width - 2} height={item.height - 2} text={text}
                                            left={newLeft} top={0} children={children}
                                            onTableCellResize={onTableCellResize} {...props} />;
                                    }
                                    else if (c !== endCol) {
                                        return <HeadCell className="cell-lack-left" col={item.col} key={text}
                                            width={item.width - 1} height={item.height - 2} text={text}
                                            left={newLeft} top={0} children={children}
                                            onTableCellResize={onTableCellResize} {...props} />;
                                    } else {
                                        return <Cell className="cell-lack-left" key={text} width={item.width - 1}
                                            height={item.height - 2} text={text} children={children}
                                            left={newLeft} top={0} {...props} />;
                                    }
                                    
                                default:
                                    if (item.x - left < width && item.x - left > -item.width) {
                                        if (c === startCol) {
                                            return <HeadCell className="cell-complete" col={item.col} key={text}
                                                width={item.width - 2} height={item.height - 2} text={text}
                                                left={newLeft} top={0} children={children}
                                                onTableCellResize={onTableCellResize} {...props} />;
                                        } else {
                                            return <HeadCell className="cell-lack-left" col={item.col} key={text}
                                                width={item.width - 1} height={item.height - 2}
                                                text={text} left={newLeft} top={0} children={children}
                                                onTableCellResize={onTableCellResize} {...props} />;
                                        }
                                    }

                            }
                        })
                    }
                </AbsoluteLayout>
            </VerticalLayout>
        );
    }

    componentWillUpdate(nextProps, nextState) {
        let divE = ReactDOM.findDOMNode(this._headDiv);
        divE.scrollLeft = nextProps.left;
    }

}

export default TableHead