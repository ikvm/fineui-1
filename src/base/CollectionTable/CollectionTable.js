/**
 * Created by NieShichao on 2017/09/05
 */

import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize'
import { Collection } from '../Collection';
import HorizontalScrollbar from './HorizontalScrollbar';
import Scrollbar from './Scrollbar'
import {emptyFunction, each, map, shallowEqual, ReactComponentWithPureRenderMixin} from 'utils'
import { HorizontalLayout, VerticalLayout, AbsoluteLayout, Layout, HorizontalAdaptLayout, VerticalAdaptLayout, CenterLayout, LeftLayout } from '../../core/layout';
import debounce from 'lodash/debounce';

const SECTION_SIZE = 100;
const MERGE_RULE = (col1, col2) => {
    return col1 === col2
}

class CollectionTable extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this._scrollBarSize = getScrollbarSize()
        this.state = {
            leftScrollLeft: 0,
            rightScrollLeft: 0,
            scrollTop: 0,
            leftScrollLock: false,
            rightScrollLock: false,
            ...this._digest(props)
        };
    }

    static defaultProps = {
        headerRowHeight: 40,
        rowHeight: 40,
        header: [],
        columnSize: [],
        freezeCols: [],
        items: [],
        mergeCols: [],
        mergeRows: [],
        regionColumnSize: [],
        mergeRule: MERGE_RULE,
        headerCreator: emptyFunction,
        itemCreator: emptyFunction,
        onVerticalScroll: emptyFunction
    }

    _digest(props) {
        const {header, freezeCols, mergeCols, mergeRows, mergeRule, columnSize, items, headerRowHeight, rowHeight, isNeedMerge} = props;
        const topLeftItems = this._serialize(header, 0, freezeCols.length, headerRowHeight, columnSize, mergeCols, mergeRows, mergeRule, isNeedMerge);
        const topRightItems = this._serialize(header, freezeCols.length, columnSize.length, headerRowHeight, columnSize, mergeCols, mergeRows, mergeRule, isNeedMerge);
        const bottomLeftItems = this._serialize(items, 0, freezeCols.length, rowHeight, columnSize, mergeCols, mergeRows, mergeRule, isNeedMerge);
        const bottomRightItems = this._serialize(items, freezeCols.length, columnSize.length, rowHeight, columnSize, mergeCols, mergeRows, mergeRule, isNeedMerge);
        return {
            topLeftItems,
            topRightItems,
            bottomLeftItems,
            bottomRightItems
        }
    }

    _serialize = (items, startCol, endCol, rowHeight, columnSize, mergeCols, mergeRows, mergeRule, isNeedMerge) => {
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

        each(items, (cols, i) => {
            for (let j = startCol; j < endCol; j++) {
                if (!cache[i]) {
                    cache[i] = [];
                }
                if (!map[i]) {
                    map[i] = [];
                }
                cache[i][j] = cols[j];
                map[i][j] = {};
                if (isNeedMerge && (mergeCols === true || mergeCols.indexOf(j) > -1 || mergeRows === true || mergeRows.indexOf(i) > -1)) {
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

    _getFreezeColLength = () => {
        return this.props.isNeedFreeze ? this.props.freezeCols.length : 0;
    }

    _getFreezeColSize(columnSize, freezeCols) {
        let regionSize = 0;
        each(freezeCols, (col) => {
            regionSize += columnSize[col];
        })
        return regionSize;
    }

    _getFreezeRegionSize = () => {
        const {isNeedFreeze, regionColumnSize, freezeCols, columnSize} = this.props;
        let regionSize = regionColumnSize[0] || 0;
        if (isNeedFreeze === false || freezeCols.length === 0) {
            return 0;
        }
        if (!regionSize) {
            regionSize = this._getFreezeColSize(columnSize, freezeCols);
        }
        return regionSize;
    }

    _isHorizontalScrollbarVisible = () => {
        const { freezeCols, columnSize } = this.props;
        let freezeColSize = this._getFreezeColSize(columnSize, freezeCols);
        let freezeRegionSize = this._getFreezeRegionSize();
        return freezeColSize > freezeRegionSize;
    }

    _leftHorizontalOnScroll = (leftScrollLeft) => {
        this.setState({
            leftScrollLeft: Math.floor(leftScrollLeft)
        })
    }

    _rightHorizontalOnScroll = (rightScrollLeft) => {
        this.setState({
            rightScrollLeft: Math.floor(rightScrollLeft)
        })
    }

    _verticalOnScroll = (scrollTop) => {
        this.setState({
            scrollTop: Math.floor(scrollTop)
        }, () => {
            this.props.onVerticalScroll(this.state.scrollTop)
        })
    }

    _topLeftCellRenderer = ({index, ...props}) => {
        const columnIndex = this.state.topLeftItems[index].col,
            rowIndex = this.state.topLeftItems[index].row,
            top = this.state.topLeftItems[index].y,
            left = this.state.topLeftItems[index].x,
            width = this.state.topLeftItems[index].width;
        return this.props.headerCellRenderer({
            columnIndex,
            rowIndex,
            width: this.state.topLeftItems[index].width,
            height: this.state.topLeftItems[index].height,
            left,
            top,
            ...props,
            offsetLeftGetter: () => {
                return left - this.state.leftScrollLeft + width;
            },
            offsetTopGetter: () => {
                return top;
            }
        }, this.props.header[rowIndex][columnIndex])
    }

    _topLeftCellSizeAndPositionGetter = ({index}) => {
        return this.state.topLeftItems[index];
    }

    _topLeftOnScroll = ({scrollLeft, scrollTop}) => {
        this.setState({
            leftScrollLeft: scrollLeft
        })
    }

    _topRightCellRenderer = ({index, ...props}) => {
        const columnIndex = this.state.topRightItems[index].col,
            rowIndex = this.state.topRightItems[index].row,
            top = this.state.topRightItems[index].y,
            left = this.state.topRightItems[index].x,
            width = this.state.topRightItems[index].width;
        return this.props.headerCellRenderer({
                columnIndex: columnIndex,
                rowIndex,
                width: this.state.topRightItems[index].width,
                height: this.state.topRightItems[index].height,
                left,
                top,
                ...props,
                offsetLeftGetter: () => {
                    return left - this.state.rightScrollLeft + this._getFreezeRegionSize() + width;
                },
                offsetTopGetter: () => {
                    return top;
                }
            },
            this.props.header[rowIndex][columnIndex])
    }

    _topRightCellSizeAndPositionGetter = ({index}) => {
        return this.state.topRightItems[index];
    }

    _topRightOnScroll = ({scrollLeft, scrollTop}) => {
        this.setState({
            rightScrollLeft: scrollLeft
        })
    }

    _bottomLeftCellRenderer = ({index, ...props}) => {
        const columnIndex = this.state.bottomLeftItems[index].col,
            rowIndex = this.state.bottomLeftItems[index].row,
            top = this.state.bottomLeftItems[index].y,
            left = this.state.bottomLeftItems[index].x;
        return this.props.cellRenderer({
            columnIndex,
            rowIndex,
            width: this.state.bottomLeftItems[index].width,
            height: this.state.bottomLeftItems[index].height,
            top,
            left,
            ...props
        }, this.props.items[rowIndex][columnIndex])
    }

    _bottomLeftCellSizeAndPositionGetter = ({index}) => {
        return this.state.bottomLeftItems[index];
    }

    _bottomLeftOnScroll = ({scrollLeft, scrollTop}) => {
        this.setState({
            leftScrollLeft: scrollLeft,
            scrollTop: scrollTop
        }, () => {
            this.props.onVerticalScroll(this.state.scrollTop)
        })
    }

    _bottomRightCellRenderer = ({index, ...props}) => {
        const columnIndex = this.state.bottomRightItems[index].col,
            rowIndex = this.state.bottomRightItems[index].row,
            top = this.state.bottomRightItems[index].y,
            left = this.state.bottomRightItems[index].x;
        return this.props.cellRenderer({
                columnIndex: columnIndex,
                rowIndex,
                width: this.state.bottomRightItems[index].width,
                height: this.state.bottomRightItems[index].height,
                top,
                left,
                ...props
            },
            this.props.items[rowIndex][columnIndex])
    }

    _bottomRightCellSizeAndPositionGetter = ({index}) => {
        return this.state.bottomRightItems[index];
    }

    _bottomRightOnScroll = ({scrollLeft, scrollTop}) => {
        this.setState({
            rightScrollLeft: scrollLeft,
            scrollTop: scrollTop
        }, () => {
            this.props.onVerticalScroll(this.state.scrollTop)
        })
    }

    _noContentRender = () => {
        return <Layout>无内容</Layout>
    }

    componentWillReceiveProps(nextProps) { // try immutable
        if (!shallowEqual(nextProps.columnSize, this.props.columnSize) || !shallowEqual(nextProps.freezeCols, this.props.freezeCols) || !shallowEqual(nextProps.mergeCols, this.props.mergeCols) ||
            nextProps.isNeedFreeze !== this.props.isNeedFreeze ||
            nextProps.items !== this.props.items ||
            nextProps.header !== this.props.header) {
            this.refs.topLeftCollection && this.refs.topLeftCollection.recomputeCellSizesAndPositions();
            this.refs.topRightCollection && this.refs.topRightCollection.recomputeCellSizesAndPositions();
            this.refs.bottomLeftCollection && this.refs.bottomLeftCollection.recomputeCellSizesAndPositions();
            this.refs.bottomRightCollection && this.refs.bottomRightCollection.recomputeCellSizesAndPositions();
            this.setState({
                ...this._digest(nextProps)
            })
        }
    }

    render() {
        
        const {headerRowHeight, rowHeight, columnSize, isNeedFreeze, freezeCols, header, items, mergeCols, mergeRule, regionColumnSize, onVerticalScroll, width:w, height:h, headerCellRenderer, cellRenderer, ...props} = this.props;
        let width = w, height = h;
        width -= Scrollbar.SIZE;
        height -= Scrollbar.SIZE;
        
        const {scrollTop, leftScrollLeft, rightScrollLeft} = this.state;
        let topLeft, topRight, bottomLeft, bottomRight;
        let regionSize = this._getFreezeRegionSize(), totalLeftColumnSize = 0, totalRightColumnSize = 0, totalColumnSize = 0, summaryColumnSizeArray = [], totalRowSize = items.length * rowHeight;
        each(columnSize, (size, i) => {
            if (isNeedFreeze === true && freezeCols.indexOf(i) > -1) {
                totalLeftColumnSize += size;
            } else {
                totalRightColumnSize += size;
            }
            totalColumnSize += size;
            if (i === 0) {
                summaryColumnSizeArray[i] = size;
            } else {
                summaryColumnSizeArray[i] = summaryColumnSizeArray[i - 1] + size;
            }
        });
        
        const tlw = regionSize;
        const tlh = regionSize >= summaryColumnSizeArray[freezeCols.length - 1] ? (header.length * headerRowHeight) : (header.length * headerRowHeight + this._scrollBarSize);
        const trw = width - regionSize;
        const trh = (width - regionSize >= totalColumnSize - (summaryColumnSizeArray[freezeCols.length - 1] || 0)) ? (header.length * headerRowHeight) : (header.length * headerRowHeight + this._scrollBarSize); // space for bottom scroll bar
        const blw = (height - header.length * headerRowHeight >= totalRowSize) ? regionSize : (regionSize + this._scrollBarSize);
        const blh = (regionSize >= (summaryColumnSizeArray[freezeCols.length - 1] || 0)) ? (height - header.length * headerRowHeight) : (height - header.length * headerRowHeight + this._scrollBarSize);
        const brw = (height - header.length * headerRowHeight >= totalRowSize) ? (width - regionSize) : (width - regionSize + this._scrollBarSize);
        const brh = (width - regionSize >= totalColumnSize - (summaryColumnSizeArray[this._getFreezeColLength() - 1] || 0)) ? (height - header.length * headerRowHeight) : (height - header.length * headerRowHeight + this._scrollBarSize);
        
        if (isNeedFreeze) {
            if (freezeCols.length > 0) {
                topLeft = <Collection
                    ref='topLeftCollection'
                    flag='topLeftCollection'
                    cellCount={this.state.topLeftItems.length}
                    cellRenderer={this._topLeftCellRenderer}
                    cellSizeAndPositionGetter={this._topLeftCellSizeAndPositionGetter}
                    height={tlh}
                    width={tlw}
                    noContentRender={this._noContentRender}
                    overscanColumnCount={0}
                    overscanRowCount={0}
                    scrollLeft={leftScrollLeft}
                    onScroll={this._topLeftOnScroll}
                    sectionSize={SECTION_SIZE}
                />;
                bottomLeft = <Collection
                    ref='bottomLeftCollection'
                    flag='bottomLeftCollection'
                    cellCount={this.state.bottomLeftItems.length}
                    cellRenderer={this._bottomLeftCellRenderer}
                    cellSizeAndPositionGetter={this._bottomLeftCellSizeAndPositionGetter}
                    height={blh}
                    width={blw}
                    noContentRender={this._noContentRender}
                    overscanColumnCount={0}
                    overscanRowCount={0}
                    scrollLeft={leftScrollLeft}
                    scrollTop={scrollTop}
                    onScroll={this._bottomLeftOnScroll}
                    sectionSize={SECTION_SIZE}
                />;
            }
            topRight = <Collection
                ref='topRightCollection'
                flag='topRightCollection'
                cellCount={this.state.topRightItems.length}
                cellRenderer={this._topRightCellRenderer}
                cellSizeAndPositionGetter={this._topRightCellSizeAndPositionGetter}
                height={trh}
                width={trw}
                noContentRender={this._noContentRender}
                overscanColumnCount={0}
                overscanRowCount={0}
                scrollLeft={rightScrollLeft}
                onScroll={this._topRightOnScroll}
                sectionSize={SECTION_SIZE}
            />;
        }

        bottomRight = <Collection
            ref='bottomRightCollection'
            flag='bottomRightCollection'
            cellCount={this.state.bottomRightItems.length}
            cellRenderer={this._bottomRightCellRenderer}
            cellSizeAndPositionGetter={this._bottomRightCellSizeAndPositionGetter}
            height={brh}
            width={brw}
            noContentRender={this._noContentRender}
            overscanColumnCount={0}
            overscanRowCount={0}
            scrollLeft={rightScrollLeft}
            scrollTop={scrollTop}
            onScroll={this._bottomRightOnScroll}
            sectionSize={SECTION_SIZE}
        />;

        return (
            <AbsoluteLayout width={width} height={height}>
                {this._getFreezeColLength() > 0 ?
                    <AbsoluteLayout.Item>
                        <VerticalLayout width={regionSize} height={height}>
                            <HorizontalLayout width={regionSize} height={header.length * headerRowHeight} scrollx={false} scrolly={false}>
                                {topLeft}
                            </HorizontalLayout>
                            <HorizontalLayout width={regionSize} height={height - header.length * headerRowHeight} scrollx={false} scrolly={false}>
                                {bottomLeft}
                            </HorizontalLayout>
                        </VerticalLayout>
                    </AbsoluteLayout.Item> : null}
                <AbsoluteLayout.Item left={regionSize}>
                    <VerticalLayout width={width - regionSize} height={height}>
                        <HorizontalLayout width={width - regionSize} height={header.length * headerRowHeight} scrollx={false} scrolly={false}>
                            {topRight}
                        </HorizontalLayout>
                        <HorizontalLayout width={width - regionSize} height={height - header.length * headerRowHeight} scrollx={false} scrolly={false}>
                            {bottomRight}
                        </HorizontalLayout>
                    </VerticalLayout>
                </AbsoluteLayout.Item>
                
                <AbsoluteLayout.Item left={0} top={height}>
                    <HorizontalScrollbar
                        scrollBarSize={this._scrollBarSize}
                        position={leftScrollLeft}
                        offset={0}
                        contentSize={totalLeftColumnSize}
                        size={regionSize}
                        onScroll={this._leftHorizontalOnScroll}
                        visible={this._isHorizontalScrollbarVisible()}/>
                </AbsoluteLayout.Item>

                <AbsoluteLayout.Item left={regionSize} top={height}>
                    <HorizontalScrollbar
                        scrollBarSize={this._scrollBarSize}
                        position={rightScrollLeft}
                        offset={0}
                        contentSize={totalRightColumnSize}
                        size={width - regionSize}
                        onScroll={this._rightHorizontalOnScroll}
                        visible={true}/>
                </AbsoluteLayout.Item>

                <AbsoluteLayout.Item left={width} top={header.length * headerRowHeight}>
                    <Scrollbar
                        scrollBarSize={this._scrollBarSize}
                        verticalTop={isNeedFreeze === true ? header.length * headerRowHeight : 0}
                        position={scrollTop}
                        contentSize={totalRowSize}
                        size={height - (isNeedFreeze === true ? header.length * headerRowHeight : 0)}
                        onScroll={this._verticalOnScroll.bind(this)}/>
                </AbsoluteLayout.Item>
            </AbsoluteLayout>
        );
        
    }

}

CollectionTable.SCROLLBAR_WIDTH = Scrollbar.SIZE;
export default CollectionTable