/**
 * Created by Wang on 2016/12/19.
 * Modified by NieShichao on 2017/09/06
 */

import React, {Component} from 'react';
import mixin from 'react-mixin'
import {cn, emptyFunction, each, math, clamp, map, ReactComponentWithPureRenderMixin} from 'utils'
import {Layout, VerticalLayout} from '../../core/layout'
import ScrollBar from '../Table/Scrollbar'
import ResizableTable from '../ResizableTable/ResizableTable'

class AdaptiveTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this._digestColumnSize(props);
    }

    _digestColumnSize(props) {
        const {isNeedFreeze, freezeCols = [], minColumnSize = [], maxColumnSize = []} = props;
        const columnSize = props.columnSize.slice();
        const tableWidth = this._getTableWidth(props);
        let regionColumnSize = props.regionColumnSize.slice();
        
        if (isNeedFreeze === true && !regionColumnSize[0]) {
            regionColumnSize[0] = 0;
            each(freezeCols, (col) => {
                regionColumnSize[0] += columnSize[col];
            });
        }
        if (freezeCols.length === 0) {
            regionColumnSize = [];
        }
        if (isNeedFreeze === true && regionColumnSize[0] >= tableWidth) {
            regionColumnSize[0] = (freezeCols.length > columnSize.length - freezeCols.length) ? Math.floor(2 / 3 * tableWidth) : Math.floor(tableWidth / 3);
        }
        const freezeColumnSize = [];
        if (isNeedFreeze === true) {
            each(freezeCols, (col) => {
                freezeColumnSize[col] = columnSize[col]
            });
        }
        const totalColumnSize = math.sum(columnSize);
        const freezeTotalColumnSize = math.sum(freezeColumnSize);
        
        if (isNeedFreeze && freezeCols.length > 0) {
            columnSize[freezeCols.length - 1] += regionColumnSize[0] - freezeTotalColumnSize; // 冻结列最后一列自适应
            columnSize[freezeCols.length - 1] = clamp(columnSize[freezeCols.length - 1], minColumnSize[freezeCols.length - 1] || 0, maxColumnSize[freezeCols.length - 1] || Number.MAX_VALUE);
        }
        columnSize[columnSize.length - 1] += tableWidth - (regionColumnSize[0] || 0) - (totalColumnSize - freezeTotalColumnSize); // 列宽小于窗口宽度时最后一列自适应
        columnSize[columnSize.length - 1] = clamp(columnSize[columnSize.length - 1], minColumnSize[columnSize.length - 1] || 0, maxColumnSize[columnSize.length - 1] || Number.MAX_VALUE);
        
        return {
            columnSize,
            regionColumnSize
        }
    }

    static defaultProps = {
        isNeedResize: false,
        headerRowHeight: 40,
        rowHeight: 40,
        columnSize: [],
        minColumnSize: [],
        maxColumnSize: [],
        isNeedFreeze: true,
        freezeCols: [],
        header: [],
        items: [],
        regionColumnSize: [],
        headerCellRenderer: emptyFunction,
        cellRenderer: emptyFunction,
        onColumnResizeEnd: emptyFunction,
        onRegionColumnResizeEnd: emptyFunction
    };

    componentWillReceiveProps(nextProps) {
        this.setState(this._digestColumnSize(nextProps));
    }

    render() {
        const {headerRowHeight, rowHeight, columnSize, isNeedFreeze, isNeedResize, isNeedMerge, freezeCols, mergeCols, mergeRule, header, items, regionColumnSize, headerCellRenderer, cellRenderer, onVerticalScroll, width, height, Component}=this.props;
        return <ResizableTable
                    width={width}
                    height={height}
                    headerRowHeight={headerRowHeight}
                    rowHeight={rowHeight}
                    columnSize={this.state.columnSize}
                    isNeedFreeze={isNeedFreeze}
                    isNeedResize={isNeedResize}
                    freezeCols={freezeCols}
                    mergeCols={mergeCols}
                    mergeRule={mergeRule}
                    header={header}
                    items={items}
                    regionColumnSize={this.state.regionColumnSize}
                    headerCellRenderer={headerCellRenderer}
                    cellRenderer={cellRenderer}
                    onColumnResizeEnd={this._onColumnResizeEnd.bind(this)}
                    onRegionColumnResizeEnd={this._onRegionColumnResizeEnd.bind(this)}
                    onVerticalScroll={onVerticalScroll}
                    Component={Component}
                    isNeedMerge={isNeedMerge}
                />;
    }

    _onColumnResizeEnd(columnSize) {
        const regionColumnSize = this.state.regionColumnSize;
        this.setState(this._digestColumnSize({
            ...this.props,
            columnSize,
            regionColumnSize
        }), () => {
            this.props.onColumnResizeEnd({
                columnSize: this.state.columnSize,
                regionColumnSize: this.state.regionColumnSize
            });
        });
    }

    _onRegionColumnResizeEnd(regionColumnSize) {
        const columnSize = this.state.columnSize;
        this.setState(this._digestColumnSize({
            ...this.props,
            columnSize,
            regionColumnSize
        }), () => {
            this.props.onRegionColumnResizeEnd({
                columnSize: this.state.columnSize,
                regionColumnSize: this.state.regionColumnSize
            });
        });
    }

    _getTableWidth(props) {
        return props.width - ScrollBar.SIZE;
    }
}
mixin.onClass(AdaptiveTable, ReactComponentWithPureRenderMixin);

export default AdaptiveTable;
