import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './table.less';
import { ScrollBarBottom, ScrollBarRight, TableHead, TableBody, TableResizer, ResizerBar } from './Component';
import { AbsoluteLayout } from '../../layout';
import debounce from 'lodash/debounce';
import emptyFunction from 'fbjs/lib/emptyFunction'

const scrollBarCoreLength = 20;
let scrollBarRightLength;
let freezeColLength;
let resizeMark = false;
let resizeLeft = false;
let preLeft;
let preScrollBarLengthRight;
let preScrollBarLengthLeft;
let topLeftItems;
let topRightItems;
let bottomLeftItems;
let bottomRightItems;
let rightColLength;
let leftColLength;
let mapIndexRight;
let mapIndexBottomInit = -20.0;
let mapIndexBottom = mapIndexBottomInit;
let mapIndexBottomLeft = -0.5;
let rightBarInfo;
let leftBarInfo;
let realLeft;
let leftBodyRealLeft;
let mark;
let tempLeftLock;
let tempRightLock;

class Table extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            leftBodyLeft: 0,
            left: 0,
            top: 0,
            leftLayoutWidth: 0,
            rightLayoutWidth: 0,
            columnSize: [],
            leftScrollLock: false,
            rightScrollLock: false
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
        mergeRule: emptyFunction,
        headerCreator: emptyFunction,
        itemCreator: emptyFunction
    }

    _handleScrollChangeX = (dx, coreLength, width) => {
        let scrollBarBottomLength = width - coreLength;
        let newLeft = this.state.left + dx;
        let temp = scrollBarBottomLength - 4;
        newLeft = (newLeft > 0) ? (newLeft < temp ? newLeft : temp) : 0;
        
        this._debounceRelease();
        this._setScrollLeft(newLeft, true, true);
    }

    _handleLeftBodyScrollChangeX = (dx, coreLength, width) => {
        let scrollBarBottomLength = width - coreLength;
        let newLeft = this.state.leftBodyLeft + dx;
        let temp = scrollBarBottomLength - 4;
        newLeft = (newLeft > 0) ? (newLeft < temp ? newLeft : temp) : 0;

        this._debounceRelease();
        this._setScrollLeftBodyLeft(newLeft, true, true);
    }

    _handleScrollChangeY = (dy) => {
        const {items, rowSize, tableHeight, headerRowSize} = this.props;
        let newTop = this.state.top - dy * mapIndexRight;
        let lengthScrollable = items.length * rowSize - (tableHeight - headerRowSize);
        newTop = newTop > 0 ? (newTop < lengthScrollable ? newTop : lengthScrollable) : 0;
        this._debounceRelease();
        this._setScrollTop(newTop, true, true);
    }

    _setScrollLock() {
        this.setState({
            leftScrollLock: false,
            rightScrollLock: false
        })
    }

    _setScrollLeft(scrollLeft, leftLock, rightLock) {
        this.setState({
            left: scrollLeft,
            leftLock: leftLock,
            rightLock: rightLock
        });
    }

    _setScrollLeftBodyLeft(scrollLeft, leftLock, rightLock) {
        this.setState({
            leftBodyLeft: scrollLeft,
            leftLock: leftLock,
            rightLock: rightLock
        });
    }

    _setScrollTop(scrollTop, leftLock, rightLock) {
        this.setState({
            top: scrollTop,
            leftScrollLock: leftLock,
            rightScrollLock: rightLock
        });
    }

    _handleLeftScroll = (that) => {
        let scrollLeft = ReactDom.findDOMNode(that.scrollDiv);
        this._debounceRelease();
        this._setScrollTop(scrollLeft.scrollTop, false, true);
    }

    _handleRightScroll = (that) => {
        let scrollRight = ReactDom.findDOMNode(that.scrollDiv);
        this._debounceRelease();
        this._setScrollTop(scrollRight.scrollTop, true, false);
    }

    _handleTableResize = (dx) => {
        const { tableWidth } = this.props;
        let columnSize = this.state.columnSize;
        let newLeft = this.state.left;

        let newLeftWidth = this.state.leftLayoutWidth + dx;
        newLeftWidth = (newLeftWidth < 21) ? 21 : ((tableWidth - newLeftWidth < 21) ? (tableWidth - 21) : newLeftWidth);
        let newRightWidth = tableWidth - newLeftWidth;
        let leftBodyLeft = this.state.leftBodyLeft;

        let preBarLength = rightBarInfo.scrollBarBottomLength;  // 前一状态可滑动轨道长度
        let preLeftBarLength = leftBarInfo.scrollBarBottomLength;

        if (dx < 0) {
            resizeLeft = true; // 不能合并至下方if语句中，_calcScrollBarSize需用到
        }

        rightBarInfo = this._calcScrollBarSize(tableWidth, newLeftWidth, rightColLength, newRightWidth, mapIndexBottom);
        leftBarInfo = this._calcScrollBarSize(newLeftWidth, 0, leftColLength, newLeftWidth, mapIndexBottomLeft);

        if (leftBodyLeft === 0) {
            if (leftColLength <= newLeftWidth || (dx < 0 && columnSize[freezeColLength - 1] > 50)) {
                columnSize[freezeColLength - 1] = newLeftWidth - columnSize.slice(0, freezeColLength - 1).reduce((x, y) => {
                    return x + y;
                });
            }
        } else if (leftBodyLeft === preLeftBarLength) {
            if (leftColLength <= newLeftWidth) {
                columnSize[freezeColLength - 1] = newLeftWidth - columnSize.slice(0, freezeColLength - 1).reduce((x, y) => {
                    return x + y;
                });
                leftBodyLeft = 0;
            } else {

            }
        }
        
        resizeMark = true;
        if (dx < 0) {
            if (newLeft >= preBarLength) { // 前一状态下滑块已至最右
                newLeft = rightBarInfo.scrollBarBottomLength;
            } else {
                newLeft = realLeft / rightBarInfo.mapIndexBottom;

                if (newLeft + rightBarInfo.coreLength >= newRightWidth - 2 - 4) { // 修复由上一行代码导致的滑块超出轨道长度的bug
                    newLeft = rightBarInfo.scrollBarBottomLength;
                }
            }
        } else {
            newLeft = realLeft / rightBarInfo.mapIndexBottom;
        }

        this.setState((preState) => ({
            leftLayoutWidth: newLeftWidth,
            rightLayoutWidth: newRightWidth,
            columnSize: columnSize,
            left: newLeft,
            leftBodyLeft: leftBodyLeft
        }));
    }

    _handleTableCellResize = (index, dx) => {
        let newCellWidth = this.state.columnSize[index] + dx;
        newCellWidth = (newCellWidth < 21) ? 21 : newCellWidth;
        let newColumnSize = this.state.columnSize;
        newColumnSize[index] = newCellWidth;

        let leftColLength = this.state.columnSize.slice(0, freezeColLength).reduce((x, y) => {
            return x + y;
        });

        if (index < freezeColLength - 1 && leftColLength < this.state.leftLayoutWidth) {
            let newFreezWidth = this.state.columnSize[freezeColLength - 1] - dx;
            newColumnSize[freezeColLength - 1] = newFreezWidth;
        }

        this.setState({
            columnSize: newColumnSize
        });
    }

    _renderLeftHead(leftHeadState, leftHeadArray, startCol, realLeft, leftLayoutWidth, leftLayoutHeight) {

        return <TableHead left={realLeft} array={leftHeadArray}
                layoutPosition="leftHead"
            width={leftLayoutWidth} height={leftLayoutHeight} colLength={leftColLength}
            onTableCellResize={this._handleTableCellResize} endCol={freezeColLength - 1}
            cellState={leftHeadState} startCol={startCol} layoutLeft={0} />;
    }

    _renderRightHead(rightHeadState, rightHeadArray, startCol, realLeft, rightLayoutWidth, leftLayoutWidth, rightLayoutHeight, freezeColLength) {

        return <TableHead left={realLeft} array={rightHeadArray}
            layoutPosition="rightHead"
            width={rightLayoutWidth} height={rightLayoutHeight} colLength={rightColLength}
            onTableCellResize={this._handleTableCellResize}
            cellState={rightHeadState} startCol={startCol}
            layoutLeft={leftLayoutWidth} />;
    }

    _renderLeftBody(leftBodyState, leftBodyArray, startCol, realLeft, realTop, leftLayoutWidth, leftLayoutHeight, leftColLength, rowSize) {

        return <TableBody left={realLeft} top={realTop} array={leftBodyArray}
            width={leftLayoutWidth} rowSize={rowSize}
            height={leftLayoutHeight} colLength={leftColLength} handleScroll={this._handleLeftScroll}
            cellState={leftBodyState} startCol={startCol} layoutLeft={0} scrollLock={this.state.leftScrollLock} />;
    }

    _renderRightBody(rightBodyState, rightBodyArray, startCol, realLeft, realTop, rightLayoutWidth, leftLayoutWidth, rightLayoutHeight, rightColLength, rowSize) {

        return <TableBody left={realLeft} top={realTop}
            array={rightBodyArray} cellState={rightBodyState} width={rightLayoutWidth}
            height={rightLayoutHeight} layoutLeft={leftLayoutWidth} startCol={startCol} colLength={rightColLength}
            handleScroll={this._handleRightScroll} rowSize={rowSize} scrollLock={this.state.rightScrollLock} />;
    }

    _renderScrollBarBottom(left, top, leftLayoutWidth, length, coreLength, onScrollChangeX, visibility, flag) {

        if (visibility) {
            return <ScrollBarBottom onScrollChange={onScrollChangeX} left={left} top={top} layoutLeft={leftLayoutWidth}
                height={10} width={length} coreLength={coreLength} />;
        }
    }

    _renderScrollBarRight(top, headerRowSize, tableHeight) {
        let onScrollChangeY = this._handleScrollChangeY;
        let height = tableHeight - headerRowSize - 2;

        return <ScrollBarRight onScrollChange={onScrollChangeY} top={top} headerRowSize={headerRowSize}
            height={height} width={10} />;
    }

    _renderTableResizer(tableHeight, leftLayoutWidth) {
        let onTableResize = this._handleTableResize;
        let left = leftLayoutWidth - 2;

        return <TableResizer height={tableHeight} width={1} left={left} top={0} onTableResize={onTableResize}
            tableWidth={this.props.tableWidth} />;
    }

    _getFreezeColLength(isNeedFreeze, freezeCol) {
        return isNeedFreeze ? freezeCol.length : 0;
    }

    _calcScrollBarSize(tableWidth, leftLayoutWidth, rightColLength, rightLayoutWidth, mapIndexBottom) {
        let visibility = true;
        if (rightColLength <= rightLayoutWidth)
            visibility = false;

        let coreLength, scrollBarBottomLength;

        coreLength = (tableWidth - leftLayoutWidth - 2 - 4) + ((rightColLength - rightLayoutWidth) / mapIndexBottom);
        scrollBarBottomLength = tableWidth - leftLayoutWidth - coreLength - 2 - 4;
        if (coreLength <= 20 || (resizeLeft && mapIndexBottom < mapIndexBottomInit)) {
            coreLength = 20;
            scrollBarBottomLength = tableWidth - leftLayoutWidth - coreLength - 2 - 4;
            mapIndexBottom = -(rightColLength - rightLayoutWidth) / scrollBarBottomLength;
            if (resizeLeft)
                resizeLeft = !resizeLeft;
        }

        return {
            scrollBarBottomLength: scrollBarBottomLength,
            coreLength: coreLength,
            mapIndexBottom: mapIndexBottom,
            visibility: visibility
        };
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
                height: item.item._height
            }
        });
    }


    componentWillMount() {
        const { header, items, headerRowSize, rowSize, columnSize, freezeCols, isNeedFreeze, tableWidth, tableHeight, mergeCols, mergeRule } = this.props;
        freezeColLength = this._getFreezeColLength(isNeedFreeze, freezeCols);
        let leftLayoutWidth = columnSize[0] * freezeColLength;
        let rightLayoutWidth = tableWidth - columnSize[0] * freezeColLength;
        scrollBarRightLength = tableHeight - headerRowSize;

        topLeftItems = this._serialize(header, 0, freezeColLength, headerRowSize, columnSize, mergeCols, false, mergeRule);
        topRightItems = this._serialize(header, freezeColLength, columnSize.length, headerRowSize, columnSize, true, false, mergeRule);
        bottomLeftItems = this._serialize(items, 0, freezeColLength, rowSize, columnSize, mergeCols, false, mergeRule);
        bottomRightItems = this._serialize(items, freezeColLength, columnSize.length, rowSize, columnSize, mergeCols, false, mergeRule);

        rightColLength = columnSize.slice(freezeColLength).reduce((x, y) => {
            return x + y;
        });
        leftColLength = columnSize.slice(0, freezeColLength).reduce((x, y) => {
            return x + y;
        });

        mapIndexRight = -(items.length * headerRowSize - (tableHeight - headerRowSize)) / (scrollBarRightLength - scrollBarCoreLength - 4 - 2);

        rightBarInfo = this._calcScrollBarSize(tableWidth, leftLayoutWidth, rightColLength, rightLayoutWidth, mapIndexBottom);
        leftBarInfo = this._calcScrollBarSize(leftLayoutWidth, 0, leftColLength, leftLayoutWidth, mapIndexBottomLeft);
        mapIndexBottom = rightBarInfo.mapIndexBottom;
        mapIndexBottomLeft = leftBarInfo.mapIndexBottom;

        let self = this;
        this._debounceRelease = debounce(function () {
            self._setScrollLock();
        }, 100);

        this.setState({
            leftLayoutWidth: leftLayoutWidth,
            rightLayoutWidth: rightLayoutWidth,
            columnSize: columnSize
        });
    }

    render() {
        const { header, items, headerRowSize, tableWidth, tableHeight, rowSize } = this.props;

        realLeft = -rightBarInfo.mapIndexBottom * this.state.left;
        leftBodyRealLeft = -leftBarInfo.mapIndexBottom * this.state.leftBodyLeft;

        let realTop = mapIndexRight * this.state.top;

        let scrollBarBottomTotalLength = rightBarInfo.scrollBarBottomLength + rightBarInfo.coreLength + 4;
        let scrollBarBottomLeftTotalLength = leftBarInfo.scrollBarBottomLength + leftBarInfo.coreLength + 4

        return (
            <AbsoluteLayout style={{ position: "absolute", backgroundColor: "white" }} width={tableWidth + 16} height={tableHeight + 16}
                lgap={16} tgap={16}>
                <AbsoluteLayout.Item left={0} top={0}>
                    {this._renderLeftHead(topLeftItems, header, 0, leftBodyRealLeft, this.state.leftLayoutWidth, headerRowSize)}
                </AbsoluteLayout.Item>

                <AbsoluteLayout.Item left={this.state.leftLayoutWidth} top={0}>
                    {this._renderRightHead(topRightItems, header, freezeColLength, realLeft, this.state.rightLayoutWidth, this.state.leftLayoutWidth, headerRowSize)}
                </AbsoluteLayout.Item>

                <AbsoluteLayout.Item left={0} top={headerRowSize}>
                    {this._renderLeftBody(bottomLeftItems, items, 0, leftBodyRealLeft, this.state.top, this.state.leftLayoutWidth, tableHeight - headerRowSize, leftColLength, rowSize)}
                </AbsoluteLayout.Item>

                <AbsoluteLayout.Item left={this.state.leftLayoutWidth} top={headerRowSize}>
                    {this._renderRightBody(bottomRightItems, items, freezeColLength, realLeft, this.state.top, this.state.rightLayoutWidth, this.state.leftLayoutWidth, tableHeight - headerRowSize, rightColLength, rowSize)}
                </AbsoluteLayout.Item>

                {this._renderTableResizer(tableHeight, this.state.leftLayoutWidth)}

                <AbsoluteLayout.Item left={this.state.leftLayoutWidth} top={tableHeight}>
                    {this._renderScrollBarBottom(this.state.left, tableHeight, this.state.leftLayoutWidth, scrollBarBottomTotalLength, rightBarInfo.coreLength, this._handleScrollChangeX, rightBarInfo.visibility, "right")}
                </AbsoluteLayout.Item>

                <AbsoluteLayout.Item left={0} top={tableHeight}>
                    {this._renderScrollBarBottom(this.state.leftBodyLeft, tableHeight, 0, scrollBarBottomLeftTotalLength, leftBarInfo.coreLength, this._handleLeftBodyScrollChangeX, leftBarInfo.visibility, "left")}
                </AbsoluteLayout.Item>

                <AbsoluteLayout.Item left={tableWidth} top={headerRowSize}>
                    {this._renderScrollBarRight(-this.state.top / mapIndexRight, headerRowSize, tableHeight)}
                </AbsoluteLayout.Item>
            </AbsoluteLayout>
        );
    }

    componentWillUpdate(nextProps, nextState) {
        const { header, items, headerRowSize, rowSize, mergeCols, mergeRule, tableWidth } = nextProps;

        topLeftItems = this._serialize(header, 0, freezeColLength, headerRowSize, nextState.columnSize, mergeCols, false, mergeRule);
        topRightItems = this._serialize(header, freezeColLength, nextState.columnSize.length, headerRowSize, nextState.columnSize, true, false, mergeRule);
        bottomLeftItems = this._serialize(items, 0, freezeColLength, rowSize, nextState.columnSize, mergeCols, false, mergeRule);
        bottomRightItems = this._serialize(items, freezeColLength, nextState.columnSize.length, rowSize, nextState.columnSize, mergeCols, false, mergeRule);

        rightColLength = this.state.columnSize.slice(freezeColLength).reduce((x, y) => {
            return x + y;
        });
        leftColLength = this.state.columnSize.slice(0, freezeColLength).reduce((x, y) => {
            return x + y;
        });

        if (!resizeMark) {
            rightBarInfo = this._calcScrollBarSize(tableWidth, nextState.leftLayoutWidth, rightColLength, nextState.rightLayoutWidth, mapIndexBottom);
            resizeMark = !resizeMark;
        }

        leftBarInfo = this._calcScrollBarSize(nextState.leftLayoutWidth, 0, leftColLength, nextState.leftLayoutWidth, mapIndexBottomLeft);

        mapIndexBottom = rightBarInfo.mapIndexBottom;
        mapIndexBottomLeft = leftBarInfo.mapIndexBottom;

    }

    componentDidMount() {
    }
}

export default Table