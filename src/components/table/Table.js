import React, {Component} from 'react';
import './Table.less';
import {ScrollBarBottom, ScrollBarRight, TableHead, TableBody, TableResizer, ResizerBar} from './Component';
import {AbsoluteLayout} from '../../layout';

const LEFT_HEAD_NUM = 2;
const RIGHT_HEAD_NUM = 6;
const BOTTOM_BODY_NUM = 11;
const CELL_HEIGHT = 40;
const CELL_WIDTH = 100
const TABLE_WIDTH = (LEFT_HEAD_NUM + RIGHT_HEAD_NUM) * CELL_WIDTH;
const TABLE_BODY_HEIGHT = BOTTOM_BODY_NUM * CELL_HEIGHT;
const TABLE_HEIGHT = TABLE_BODY_HEIGHT + CELL_HEIGHT;

const LEFT_COLUMN = 2;
const SCROLL_BAR_CORE_LENGTH = 20;
const SCROLL_BAR_RIGHT_LENGTH = TABLE_BODY_HEIGHT - SCROLL_BAR_CORE_LENGTH;

class MyTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            left: 0,
            top: 0,
            leftLayoutWidth: LEFT_HEAD_NUM * CELL_WIDTH,
            rightLayoutWidth: TABLE_WIDTH - LEFT_HEAD_NUM * CELL_WIDTH,
            columnSize: props.columnSize, 
        };
    }
    
    static defaultProps = {
        cellWidth: 100,
        cellHeight: 40,
    }

    _handleScrollChangeX = (dx, coreLength) => {
        let scrollBarBottomLength = TABLE_WIDTH - this.state.leftLayoutWidth - coreLength;
        let newLeft = this.state.left + dx;

        this.setState((preState) => ({
            left: (newLeft > 0) ? (newLeft < scrollBarBottomLength ? newLeft : scrollBarBottomLength) : 0,
        }));
    }

    _handleScrollChangeY = (dy) => {
        let newTop = this.state.top + dy;

        this.setState((preState) => ({
            top: (newTop > 0) ? (newTop < SCROLL_BAR_RIGHT_LENGTH ? newTop : SCROLL_BAR_RIGHT_LENGTH) : 0,
        }));
    }

    _handleWheelY = (dy) => {
        let newY = this.state.top + dy * 0.2;
        this.setState((preState) => ({
            top: (newY > 0) ? (newY < SCROLL_BAR_RIGHT_LENGTH ? newY : SCROLL_BAR_RIGHT_LENGTH) : 0,
        }));
    }

    _handleTableResize = (dx) => {
        let newLeftWidth = LEFT_HEAD_NUM * CELL_WIDTH + dx;
        newLeftWidth = (newLeftWidth < 21) ? 21 : ((TABLE_WIDTH - newLeftWidth < 21) ? (TABLE_WIDTH - 21) : newLeftWidth);
        let newRightWidth = TABLE_WIDTH - newLeftWidth;
        this.setState((preState) => ({
            leftLayoutWidth: newLeftWidth,
            rightLayoutWidth: newRightWidth,
        }));
    }

    _handleTableCellResize = (index, dx) => {
        let newCellWidth = this.state.columnSize[index] + dx;
        newCellWidth = (newCellWidth < 21) ? 21 : newCellWidth;
        let newColumnSize = this.state.columnSize;
        newColumnSize[index] = newCellWidth;
        //window.console.log("index: " + index + " newCellWidth: " + newCellWidth + " dx: " + dx);
        this.setState({
            columnSize: newColumnSize,
        });
    }

    /*
    _handleResizerBar = (newX, dx, width) => {
        let newLeft = this.state.cellResizerLeft + dx;
        this.setState({
            cellResizerLeft: (newLeft + width < 21) ? (21 - width) : newLeft,
            resizerBarLeft: newX,
            flag: "move",
        });
    }
    */

    _renderLeftHead(leftHeadNum ,leftHeadArray, leftLayoutWidth, leftColWidth, headerRowSize) {
        return <TableHead className="table-left-head" left={0} top={0} colIndex={0} colNum={leftHeadNum} array={leftHeadArray}
                          layoutPosition="leftHead" width={leftLayoutWidth} height={headerRowSize} startIndexCol={0} startIndexRow={0}
                          colWidth={leftColWidth} onTableCellResize={this._handleTableCellResize}
                          />;
    }

    _renderRightHead(realLeft, startIndexCol, leftCol, rightHeadNum, rightHeadArray, rightLayoutWidth, rightColWidth, headerRowSize) {
        return <TableHead className="table-right-head" left={realLeft} top={0} colIndex={leftCol}
                          colNum={rightHeadNum} array={rightHeadArray} layoutPosition="rightHead" width={rightLayoutWidth} 
                          height={headerRowSize} startIndexCol={startIndexCol} startIndexRow={0} colWidth={rightColWidth}
                          onTableCellResize={this._handleTableCellResize}/>;
    }

    _renderLeftBody(realTop, startIndexRow, leftHeadNum, onWheelY, leftBodyArray, leftLayoutWidth, leftColWidth, leftCellsHeight) {
        return <TableBody className="table-left-body-frame" left={0} top={realTop} colIndex={0} colNum={leftHeadNum}
                          array={leftBodyArray.slice(startIndexRow, startIndexRow + 12)} onWheelY={onWheelY} layoutPosition="leftBody" 
                          scrollable={false} scrollx={false} scrolly={false} width={leftLayoutWidth} height={TABLE_BODY_HEIGHT}
                          startIndexRow={startIndexRow} startIndexCol={0} colWidth={leftColWidth} colHeight={leftCellsHeight}/>;
    }

    _renderRightBody(realLeft, realTop, startIndexCol, startIndexRow, leftCol, rightHeadNum, onWheelY, rightBodyArray, rightLayoutWidth, leftLayoutWidth, rightColWidth, rowSize) {
        return <TableBody className="table-right-body-frame" left={realLeft} top={realTop} colIndex={leftCol} 
                          colNum={rightHeadNum} array={rightBodyArray.slice(startIndexRow, startIndexRow + 12)} onWheelY={onWheelY} layoutPosition="rightBody"
                          width={rightLayoutWidth} height={TABLE_BODY_HEIGHT} scrollable={false} scrollx={false} scrolly={false} 
                          startIndexCol={startIndexCol} startIndexRow={startIndexRow} layoutLeft={leftLayoutWidth}
                          colWidth={rightColWidth} colHeight={rowSize}/>;
    }

    _renderScrollBarBottom(left, leftLayoutWidth, length, coreLength) {
        let onScrollChangeX = this._handleScrollChangeX;

        return <ScrollBarBottom onScrollChange={onScrollChangeX} left={left} layoutLeft={leftLayoutWidth + 16} 
                                height={3} width={length} coreLength={coreLength}/>;
    }

    _renderScrollBarRight(top) {
        let onScrollChangeY = this._handleScrollChangeY;

        return <ScrollBarRight onScrollChange={onScrollChangeY} top={top} height={438} width={3}/>;
    }

    _renderTableResizer(tableHeight, leftLayoutWidth) {
        let onTableResize = this._handleTableResize;
        let left = leftLayoutWidth - 2;

        return <TableResizer height={tableHeight} left={left} onTableResize={onTableResize} tableWidth={TABLE_WIDTH}/>;
    }

    render() {

        const {leftHeadArray, rightHeadArray, leftBodyArray, rightBodyArray, headerRowSize, rowSize, 
               leftCellsHeight} = this.props;

        let left = this.state.left;
        let top = this.state.top;
        let leftLayoutWidth = this.state.leftLayoutWidth;
        let rightLayoutWidth = this.state.rightLayoutWidth;
        let columnSize = this.state.columnSize;

        columnSize[1] = leftLayoutWidth - columnSize[0];

        let leftColWidth = columnSize.slice(0, LEFT_COLUMN);
        let rightColWidth = columnSize.slice(LEFT_COLUMN);

        let rightColLength = rightColWidth.reduce((x, y) => {return x + y;});

        let mapIndexRight = -((leftBodyArray.length - BOTTOM_BODY_NUM) * CELL_HEIGHT) / SCROLL_BAR_RIGHT_LENGTH;
        
        let mapIndexBottom = -18.0;

        let coreLength = (TABLE_WIDTH - leftLayoutWidth) + ((rightColLength - rightLayoutWidth) / mapIndexBottom);
    
        let scrollBarBottomLength = TABLE_WIDTH - leftLayoutWidth - coreLength;;
        if (coreLength < 20) {
            coreLength = 20;
            scrollBarBottomLength = TABLE_WIDTH - leftLayoutWidth - coreLength;
            mapIndexBottom = -(rightColLength - rightLayoutWidth) / scrollBarBottomLength;
        }
        
        let realLeft = mapIndexBottom * left;
        let realTop = mapIndexRight * top;

        let tempLeft = realLeft;
        let count = 0;
        while(tempLeft <= 0) {
            tempLeft += rightColWidth[count];
            count++;
        }
        let startIndexCol = --count;

        let startIndexRow = Math.floor(-realTop / CELL_HEIGHT);

        return(
            <AbsoluteLayout className="table-frame" width={TABLE_WIDTH + 32} height={TABLE_HEIGHT + 32} 
                            lgap={16} tgap={16}>
                <AbsoluteLayout className="table" width={TABLE_WIDTH} height={TABLE_HEIGHT} lgap={16} tgap={16}>
            
                    {this._renderLeftHead(LEFT_HEAD_NUM, leftHeadArray, leftLayoutWidth, leftColWidth, headerRowSize)}
                    {this._renderRightHead(realLeft, startIndexCol, LEFT_COLUMN, RIGHT_HEAD_NUM, rightHeadArray, rightLayoutWidth, rightColWidth, headerRowSize)}
                    {this._renderLeftBody(realTop, startIndexRow, LEFT_HEAD_NUM, this._handleWheelY, leftBodyArray, leftLayoutWidth, leftColWidth, leftCellsHeight)}
                    {this._renderRightBody(realLeft, realTop, startIndexCol, startIndexRow, LEFT_COLUMN, RIGHT_HEAD_NUM, 
                                           this._handleWheelY, rightBodyArray, rightLayoutWidth, leftLayoutWidth, rightColWidth, rowSize)}
                    {this._renderTableResizer(TABLE_HEIGHT, leftLayoutWidth)}
                </AbsoluteLayout>
                {this._renderScrollBarBottom(left, leftLayoutWidth, scrollBarBottomLength + coreLength + 2, coreLength)}
                {this._renderScrollBarRight(top)}
            </AbsoluteLayout>
            );
    }
}

export default MyTable