import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Cell } from '../Component';
import { VerticalLayout, AbsoluteLayout } from '../../../layout';
import throttle from 'lodash/throttle';

class TableLeftBody extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let self = this;
        const { className, array, cellState, width, height, layoutPosition, layoutLeft, top, left, startCol, handleScroll, colLength, flag, rowSize, scrollLock, ...props } = this.props;

        return (

            <VerticalLayout ref={(div) => { this.leftScrollDiv = div }} scrollable={true} width={width + 6} height={height + 6}
                {...{
                    onScroll: throttle(function () {
                        if (!scrollLock) {
                            handleScroll(self)
                        }
                    }, 150)
                }}>
                <AbsoluteLayout width={colLength} height={array.length * rowSize}>
                    {
                        cellState.map((item, index) => {
                            let text = array[item.row][item.col];
                            let newLeft = item.x;
                            let children = <span>{text}</span>;

                            if (item.y - top < height && item.y - top > -(item.height) && item.x - left < width && item.x - left > -item.width) {
                                if (item.col === startCol) {
                                    return <Cell className="cell-lack-top" key={item.col + item.row * array.length} width={item.width - 2}
                                        height={item.height - 1} text={text} children={children}
                                        left={newLeft} top={item.y} />;
                                } else {
                                    return <Cell className="cell-lack-left-top" key={item.col + item.row * array.length} width={item.width - 1}
                                        height={item.height - 1} text={text} children={children}
                                        left={newLeft} top={item.y} />;
                                }
                            }
                        })
                    }
                </AbsoluteLayout>
            </VerticalLayout>

        );
    }



    componentWillUpdate(nextProps, nextState) {
        let divE = ReactDom.findDOMNode(this.leftScrollDiv);
        if (nextProps.scrollLock) {
            divE.scrollTop = nextProps.top;
        }
        divE.scrollLeft = nextProps.left;
    }
}

export default TableLeftBody