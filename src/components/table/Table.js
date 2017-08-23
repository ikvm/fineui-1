import React, {Component} from 'react';
import './Table.less';
import {ScrollBarBottom, ScrollBarRight, TableHead, TableBody, TableResizer, ResizerBar} from './Component';
import {AbsoluteLayout} from '../../layout';

const scrollBarCoreLength = 20;
let scrollBarRightLength;
let freezeColLength;
let resizeMark = false;
let tempLeft;

class MyTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            leftBodyLeft: 0,
            left: 0,
            top: 0,
            leftLayoutWidth: 0,
            rightLayoutWidth: 0,
            columnSize: [],
        };
    }
    
    static defaultProps = {
        headerRowSize: 40,
        rowSize: 40,
        header: [],
        columnSize: [],
        freezeCols: [],
        items: [],
        mergeCols: [],
        mergeRows: [],
    }

    _handleScrollChangeX = (dx, coreLength, width) => {
        let scrollBarBottomLength = width - coreLength;
        let newLeft = dx;

        this.setState((preState) => ({
            left: (newLeft > 0) ? (newLeft < scrollBarBottomLength ? newLeft : scrollBarBottomLength) : 0,
        }));
    }

    _handleLeftBodyScrollChangeX = (dx, coreLength, width) => {
        let scrollBarBottomLength = width - coreLength;
        let newLeft = dx;

        this.setState((preState) => ({
            leftBodyLeft: (newLeft > 0) ? (newLeft < scrollBarBottomLength ? newLeft : scrollBarBottomLength) : 0,
        }));
    }

    _handleScrollChangeY = (dy) => {
        let newTop = this.state.top + dy;

        this.setState((preState) => ({
            top: (newTop > 0) ? (newTop < scrollBarRightLength - scrollBarCoreLength ? newTop : scrollBarRightLength - scrollBarCoreLength) : 0,
        }));
    }

    _handleWheelY = (dy) => {
        let newY = this.state.top + dy * 0.2;
        this.setState((preState) => ({
            top: (newY > 0) ? (newY < scrollBarRightLength - scrollBarCoreLength ? newY : scrollBarRightLength - scrollBarCoreLength) : 0,
        }));
    }

    _handleTableResize = (dx) => {
        const {tableWidth} = this.props;
        let columnSize = this.state.columnSize;
        
        let newLeftWidth = this.state.leftLayoutWidth + dx;
        newLeftWidth = (newLeftWidth < 21) ? 21 : ((tableWidth - newLeftWidth < 21) ? (tableWidth - 21) : newLeftWidth);
        let newRightWidth = tableWidth - newLeftWidth;
        columnSize[freezeColLength - 1] = newLeftWidth - columnSize.slice(0, freezeColLength - 1).reduce((x, y) => {return x + y;});
        resizeMark = true;
        
        this.setState((preState) => ({
            leftLayoutWidth: newLeftWidth,
            rightLayoutWidth: newRightWidth,
            columnSize: columnSize,
        }));
    }

    _handleTableCellResize = (index, dx) => {
        let newCellWidth = this.state.columnSize[index] + dx;
        newCellWidth = (newCellWidth < 21) ? 21 : newCellWidth;
        let newColumnSize = this.state.columnSize;
        newColumnSize[index] = newCellWidth;

        this.setState({
            columnSize: newColumnSize,
        });
    }

    _renderLeftHead(leftHeadState, leftHeadArray, startCol, realLeft, leftLayoutWidth, leftLayoutHeight) {
        
        return <TableHead className="table-left-head" left={realLeft} top={0} array={leftHeadArray} layoutPosition="leftHead"
                          width={leftLayoutWidth} height={leftLayoutHeight} onTableCellResize={this._handleTableCellResize}
                          cellState={leftHeadState} startCol={startCol} layoutLeft={0}/>;
    }

    _renderRightHead(rightHeadState, rightHeadArray, startCol, realLeft, rightLayoutWidth, leftLayoutWidth, rightLayoutHeight, freezeColLength) {
        
        return <TableHead className="table-right-head" left={realLeft} top={0} array={rightHeadArray} layoutPosition="rightHead" 
                          width={rightLayoutWidth} height={rightLayoutHeight} onTableCellResize={this._handleTableCellResize}
                          cellState={rightHeadState} startCol={startCol} endCol={freezeColLength} layoutLeft={leftLayoutWidth}/>;
    }

    _renderLeftBody(leftBodyState, leftBodyArray, startCol, realLeft, realTop, onWheelY, leftLayoutWidth, leftLayoutHeight) {
        
        return <TableBody className="table-left-body-frame" left={realLeft} top={realTop} array={leftBodyArray} 
                          onWheelY={onWheelY} layoutPosition="leftBody" width={leftLayoutWidth} height={leftLayoutHeight}
                          cellState={leftBodyState} startCol={startCol} layoutLeft={0}/>;
    }

    _renderRightBody(rightBodyState, rightBodyArray, startCol, realLeft, realTop, onWheelY, rightLayoutWidth, leftLayoutWidth, rightLayoutHeight) {
        
        return <TableBody className="table-right-body-frame" left={realLeft} top={realTop} layoutPosition="rightBody"
                          array={rightBodyArray} onWheelY={onWheelY} cellState={rightBodyState} width={rightLayoutWidth}
                          height={rightLayoutHeight} layoutLeft={leftLayoutWidth} startCol={startCol}/>;
    }

    _renderScrollBarBottom(left, leftLayoutWidth, length, coreLength, onScrollChangeX, visibility, flag) {

        if (visibility) {
            return <ScrollBarBottom onScrollChange={onScrollChangeX} left={left} layoutLeft={leftLayoutWidth + 16} 
                                    height={3} width={length} coreLength={coreLength} flag={flag}/>;
        }
            
    }

    _renderScrollBarRight(top) {
        let onScrollChangeY = this._handleScrollChangeY;

        return <ScrollBarRight onScrollChange={onScrollChangeY} top={top} height={438} width={3}/>;
    }

    _renderTableResizer(tableHeight, leftLayoutWidth) {
        let onTableResize = this._handleTableResize;
        let left = leftLayoutWidth - 2;

        return <TableResizer height={tableHeight} left={left} onTableResize={onTableResize} tableWidth={this.props.tableWidth}/>;
    }

    _getFreezeColLength(isNeedFreeze, freezeCol) {
        return isNeedFreeze ? freezeCol.length : 0;
    }

    _calcScrollBarSize(tableWidth, leftLayoutWidth, rightColLength, rightLayoutWidth, mapIndexBottom) {
        let visibility = true;
        if (rightColLength <= rightLayoutWidth)
            visibility = false;
        let coreLength = (tableWidth - leftLayoutWidth - 2) + ((rightColLength - rightLayoutWidth) / mapIndexBottom);
        // -2 => 减去scroll bar边框

        let scrollBarBottomLength = tableWidth - leftLayoutWidth - coreLength;
    
        if (coreLength < 20) {
            coreLength = 20;
            scrollBarBottomLength = tableWidth - leftLayoutWidth - coreLength - 2;
            mapIndexBottom = -(rightColLength - rightLayoutWidth) / scrollBarBottomLength;
        }

        return {scrollBarBottomLength: scrollBarBottomLength, 
                coreLength: coreLength, 
                mapIndexBottom: mapIndexBottom,
                visibility: visibility};
    }

    _serialize = (items, startCol, endCol, rowHeight, columnSize, mergeCols, mergeRows, mergeRule) => {
        mergeCols = mergeCols || [];
        mergeRows = mergeRows || [];
        let result = [], cache = {}, map = {}, preCol = {}, preRow = {};
        let summaryColumnSize = [];
        for (let i = startCol; i < endCol; i++) {
            if (i === startCol) {
                summaryColumnSize[i] = columnSize[i];
            } else {
                summaryColumnSize[i] = summaryColumnSize[i - 1] + columnSize[i];
            }
        }
        let mergeRow = (i, j) => {
            preCol[j]._height += rowHeight;
            preCol[j].__mergeRows.push(i);
        };

        let mergeCol = (i, j) => {
            preRow[i]._width += columnSize[j];
            preRow[i].__mergeCols.push(j);
        };

        let createOneEl = (r, c) => {
            let width = columnSize[c];
            let height = rowHeight;
            map[r][c]._row = r;
            map[r][c]._col = c;
            map[r][c]._width = width;
            map[r][c]._height = height;
            preCol[c] = map[r][c];
            preCol[c].__mergeRows = [r];
            preRow[r] = map[r][c];
            preRow[r].__mergeCols = [c];

            result.push({
                x: summaryColumnSize[c] - columnSize[c],
                y: +r * rowHeight,
                item: map[r][c]
            });
        };  

        let array = [];
        
        items.map((cols, i) => {
            for (let j = startCol; j < endCol; j++) {
                if (!cache[i]) {
                    cache[i] = [];
                }
                if (!map[i]) {
                    map[i] = [];
                }
                cache[i][j] = cols[j];
                map[i][j] = {};
                if (mergeCols === true || mergeCols.indexOf(j) > -1 || mergeRows === true || mergeRows.indexOf(i) > -1) {
                    if (i === 0 && j === startCol) {
                        createOneEl(0, startCol);
                    } else if (j === startCol && i > 0) {
                        let isNeedMergeRow = mergeRule(cache[i][j], cache[i - 1][j]);
                        if (isNeedMergeRow === true) {
                            mergeRow(i, j);
                            preRow[i] = preCol[j];
                        } else {
                            createOneEl(i, j);
                        }
                    } else if (i === 0 && j > startCol) {
                        let isNeedMergeCol = mergeRule(cache[i][j], cache[i][j - 1]);
                        if (isNeedMergeCol === true) {
                            mergeCol(i, j);
                            preCol[j] = preRow[i];
                        } else {
                            createOneEl(i, j);
                        }
                    } else {
                        let isNeedMergeRow = mergeRule(cache[i][j], cache[i - 1][j]);
                        let isNeedMergeCol = mergeRule(cache[i][j], cache[i][j - 1]);
                        if (isNeedMergeCol && isNeedMergeRow) {
                            continue;
                            //mergeRow(i, j);//优先合并列
                        }
                        if (isNeedMergeCol) {
                            mergeCol(i, j);
                        }
                        if (isNeedMergeRow) {
                            mergeRow(i, j);
                        }
                        if (!isNeedMergeCol && !isNeedMergeRow) {
                            createOneEl(i, j);
                        }
                    }
                } else {
                    createOneEl(i, j);
                }
            }
        });
        return result.map((item, i) => {
            return {
                x: item.x,
                y: item.y,
                row: item.item._row,
                col: item.item._col,
                width: item.item._width,
                height: item.item._height,
            }
        });
    }

    
    componentWillMount() {
        const {headerRowSize, columnSize, freezeCols, isNeedFreeze, tableWidth, tableHeight} = this.props;        
        freezeColLength = this._getFreezeColLength(isNeedFreeze, freezeCols);
        scrollBarRightLength = tableHeight - headerRowSize;
        this.setState({
            leftLayoutWidth: columnSize[0] * freezeColLength,
            rightLayoutWidth: tableWidth - columnSize[0] * freezeColLength,
            columnSize: columnSize,
        });
    }
    

    render() {

        const {header, items, headerRowSize, rowSize, mergeCols, mergeRows, mergeRule, freezeCols, isNeedFreeze, 
               tableWidth, tableHeight} = this.props;

        let leftBodyLeft = this.state.leftBodyLeft;
        let left = this.state.left;
        let top = this.state.top;
        let leftLayoutWidth = this.state.leftLayoutWidth;
        let rightLayoutWidth = this.state.rightLayoutWidth;
        let columnSize = this.state.columnSize;

        let topLeftItems = this._serialize(header, 0, freezeColLength, headerRowSize, this.state.columnSize, mergeCols, false, mergeRule);
        let topRightItems = this._serialize(header, freezeColLength, this.state.columnSize.length, headerRowSize, this.state.columnSize, true, false, mergeRule);
        let bottomLeftItems = this._serialize(items, 0, freezeColLength, rowSize, this.state.columnSize, mergeCols, false, mergeRule);
        let bottomRightItems = this._serialize(items, freezeColLength, this.state.columnSize.length, rowSize, this.state.columnSize, mergeCols, false, mergeRule);

        let rightColLength = columnSize.slice(freezeColLength).reduce((x, y) => {return x + y;});
        let leftColLength = columnSize.slice(0, freezeColLength).reduce((x, y) => {return x + y;});

        let mapIndexRight = -(items.length * headerRowSize - (tableHeight - headerRowSize)) / (scrollBarRightLength - scrollBarCoreLength);
        
        let mapIndexBottom = -12.0;
        
        let rightBarInfo = this._calcScrollBarSize(tableWidth, leftLayoutWidth, rightColLength, rightLayoutWidth, mapIndexBottom);
        let leftBarInfo = this._calcScrollBarSize(leftLayoutWidth, 0, leftColLength, leftLayoutWidth, mapIndexBottom);

        let scrollBarBottomLengthRight = rightBarInfo["scrollBarBottomLength"];
        let coreLengthRight = rightBarInfo["coreLength"];
        let mapIndexBottomRight = rightBarInfo["mapIndexBottom"];
        let rightBarVisibility = rightBarInfo["visibility"];

        let scrollBarBottomLengthLeft = leftBarInfo["scrollBarBottomLength"]
        let coreLengthLeft = leftBarInfo["coreLength"];
        let mapIndexBottomLeft = leftBarInfo["mapIndexBottom"];
        let leftBarVisibility = leftBarInfo["visibility"];

        if (resizeMark) {
            left = tempLeft / mapIndexBottomRight;
            //window.console.log(rightColLength + " " + rightLayoutWidth + " " + mapIndexBottom);
            resizeMark = !resizeMark;
        }
        
        let realLeft = mapIndexBottomRight * left;
        tempLeft = realLeft;
        let leftBodyRealLeft = mapIndexBottomLeft * leftBodyLeft;
        let realTop = mapIndexRight * top;

        return(
            <AbsoluteLayout className="table-frame" width={tableWidth + 32} height={tableHeight + 32} 
                            lgap={16} tgap={16}>
                <AbsoluteLayout className="table" width={tableWidth} height={tableHeight} lgap={16} tgap={16}>
            
                    {this._renderLeftHead(topLeftItems, header, 0, leftBodyRealLeft, leftLayoutWidth, headerRowSize)}
                    {this._renderRightHead(topRightItems, header, freezeColLength, realLeft, rightLayoutWidth, leftLayoutWidth, headerRowSize)}
                    {this._renderLeftBody(bottomLeftItems, items, 0, leftBodyRealLeft, realTop, this._handleWheelY, leftLayoutWidth, tableHeight - headerRowSize)}
                    {this._renderRightBody(bottomRightItems, items, freezeColLength, realLeft, realTop, this._handleWheelY, rightLayoutWidth, leftLayoutWidth, tableHeight - headerRowSize)}
                    {this._renderTableResizer(tableHeight, leftLayoutWidth)}
                </AbsoluteLayout>
                {this._renderScrollBarBottom(left, leftLayoutWidth, scrollBarBottomLengthRight + coreLengthRight, coreLengthRight, this._handleScrollChangeX, rightBarVisibility, "right")}
                {this._renderScrollBarBottom(leftBodyLeft, 0, scrollBarBottomLengthLeft + coreLengthLeft, coreLengthLeft, this._handleLeftBodyScrollChangeX, leftBarVisibility, "left")}
                {this._renderScrollBarRight(top)}
            </AbsoluteLayout>
            );
    }
}

export default MyTable