import React, {Component} from 'react';
import mixin from 'react-mixin'
import {cn, emptyFunction, each, math, map, ReactComponentWithPureRenderMixin} from '../../utils'
import {Layout, VerticalLayout, AbsoluteLayout} from '../../core/layout'
import { CollectionTable } from '../CollectionTable'
import ColumnResizeHandle from './ColumnResizeHandle'
import './ResizableTable.less'

class ResizableTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isColumnResizing: false,
            isRegionResizing: false,
            columnResizingData: {},
            regionResizingData: {},
            columnSize: props.columnSize,
            regionColumnSize: props.regionColumnSize
        }
    }

    static defaultProps = {
        isNeedResize: false,
        headerRowHeight: 40,
        rowHeight: 40,
        columnSize: [],
        isNeedFreeze: true,
        freezeCols: [],
        mergeCols: [],
        header: [],
        items: [],
        regionColumnSize: [],
        headerCellRenderer: emptyFunction,
        cellRenderer: emptyFunction,
        onColumnResizeEnd: emptyFunction,
        onRegionColumnResizeEnd: emptyFunction,
        Component: CollectionTable
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            columnSize: nextProps.columnSize.slice(),
            regionColumnSize: nextProps.regionColumnSize.slice()
        })
    }

    render() {
        const {headerRowHeight, rowHeight, columnSize, isNeedFreeze, isNeedResize, isNeedMerge, freezeCols, mergeCols, mergeRule, header, items, regionColumnSize, headerCellRenderer, cellRenderer, onVerticalScroll, width, height, Component}=this.props;
        return <AbsoluteLayout style={{
            width: width,
            height: height
        }}>
            <Component
                width={width}
                height={height}
                headerRowHeight={headerRowHeight}
                rowHeight={rowHeight}
                columnSize={this.state.columnSize}
                isNeedFreeze={isNeedFreeze}
                freezeCols={freezeCols}
                mergeCols={mergeCols}
                mergeRule={mergeRule}
                header={header}
                items={items}
                regionColumnSize={this.state.regionColumnSize}
                headerCellRenderer={this._headerCellRenderer.bind(this)}
                cellRenderer={cellRenderer}
                onVerticalScroll={onVerticalScroll}
                isNeedMerge={isNeedMerge}
            />
            <ColumnResizeHandle
                height={height}
                initWidth={this.state.columnSize[this.state.columnResizingData.columnIndex || 0]}
                minWidth={10}
                maxWidth={Number.MAX_VALUE}
                visible={this.state.isColumnResizing}
                leftOffset={this.state.columnResizingData.left || 0}
                initialEvent={this.state.columnResizingData.initialEvent}
                columnKey={this.state.columnResizingData.key}
                onColumnResizeEnd={(width, columnKey) => {
                    const columnSize = this.state.columnSize.slice();
                    columnSize[columnKey] = width;
                    this.setState({
                        columnSize,
                        isColumnResizing: false,
                        columnResizingData: {}
                    }, () => {
                        this.props.onColumnResizeEnd(this.state.columnSize);
                    })
                }}
            />
            {
                (isNeedResize && freezeCols.length > 0) ?
                    <ColumnResizeHandle
                        height={height}
                        initWidth={this._getRegionSize()}
                        minWidth={10}
                        maxWidth={width - 25}
                        visible={this.state.isRegionResizing}
                        leftOffset={this._getRegionSize()}
                        knobHeight={headerRowHeight}
                        initialEvent={this.state.regionResizingData.initialEvent}
                        columnKey={this.state.regionResizingData.key}
                        onColumnResizeEnd={(width) => {
                            const regionColumnSize = this.state.regionColumnSize.slice();
                            regionColumnSize[0] = width;
                            this.setState({
                                regionColumnSize,
                                isRegionResizing: false,
                                regionResizingData: {}
                            }, () => {
                                this.props.onRegionColumnResizeEnd(this.state.regionColumnSize);
                            });
                        }}
                    /> : null
            }
            {
                (isNeedResize && freezeCols.length > 0) ?
                    <AbsoluteLayout.Item
                        className={cn('resizable-table-cell-layout-region-resizer-container')}
                        style={{
                            height: Math.min(height - CollectionTable.SCROLLBAR_WIDTH, header.length * headerRowHeight + items.length * rowHeight),
                            left: this._getRegionSize() - 6
                        }}
                        onMouseDown={this._onRegionResizerMouseDown.bind(this)}>
                        
                    </AbsoluteLayout.Item> : null
            }
        </AbsoluteLayout>
    }

    _getRegionSize() {
        const {isNeedFreeze, freezeCols}= this.props;
        const {regionColumnSize, columnSize} = this.state;
        let regionSize = regionColumnSize[0] || 0;
        if (isNeedFreeze === true && !regionSize) {
            each(freezeCols, (col) => {
                regionSize += columnSize[col];
            });
        }
        if (isNeedFreeze === false) {
            regionSize = 0;
        }
        return regionSize;
    }

    _headerCellRenderer({columnIndex, rowIndex, left, top, width, height, offsetLeftGetter, offsetTopGetter, ...props}, ...others) {
        const {isNeedResize, headerCellRenderer, header, headerRowHeight, freezeCols, columnSize} = this.props;
        if (isNeedResize === true && (rowIndex === header.length - 1 || top + height >= headerRowHeight * header.length)
            && columnIndex !== freezeCols.length - 1 && columnIndex !== columnSize.length - 1) {
            const columnResizerStyle = {
                height: height
            };
            return <AbsoluteLayout
                        style={{width, height}}>
                        <AbsoluteLayout.Item left={0} top={0} right={0} bottom={0}>
                            {headerCellRenderer({columnIndex, rowIndex, width, height, top, left, ...props}, ...others)}
                        </AbsoluteLayout.Item>
                        <AbsoluteLayout.Item right={0} top={0} bottom={0}>
                            <Layout
                                className={cn('resizable-table-cell-layout-column-resizer-container')}
                                style={columnResizerStyle}
                                onMouseDown={this._onColumnResizerMouseDown.bind(this, {
                                    columnIndex,
                                    rowIndex,
                                    left,
                                    top,
                                    offsetLeftGetter,
                                    offsetTopGetter
                                })}>
                                
                            </Layout>
                        </AbsoluteLayout.Item>
            </AbsoluteLayout>
        }
        return headerCellRenderer({columnIndex, rowIndex, width, height, top, left, ...props}, ...others);
    }

    _onColumnResizerMouseDown({columnIndex, rowIndex, offsetLeftGetter}, event) {
        this.setState({
            isColumnResizing: true,
            columnResizingData: {
                initialEvent: {
                    clientX: event.clientX,
                    clientY: event.clientY,
                    preventDefault: emptyFunction
                },
                key: columnIndex,
                columnIndex,
                rowIndex,
                left: offsetLeftGetter()
            }
        });
    }

    _onRegionResizerMouseDown(event) {
        this.setState({
            isRegionResizing: true,
            regionResizingData: {
                initialEvent: {
                    clientX: event.clientX,
                    clientY: event.clientY,
                    preventDefault: emptyFunction
                }
            }
        });
    }
}
mixin.onClass(ResizableTable, ReactComponentWithPureRenderMixin);

export default ResizableTable;
