import React, {Component, PropTypes} from 'react'
import emptyFunction from 'fbjs/lib/emptyFunction'

import './index.less'

class TableComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        headerRowCount: 0,
        rowCount: 0,
        columnCount: 0,
        columnSize: [],
        isNeedMerge: false,
        mergeRule: emptyFunction,
        headerCreator: emptyFunction,
        itemCreator: emptyFunction
    };

    _renderColGroup() {
        const {columnCount, columnSize} = this.props;
        const cols = [];
        for (let j = 0; j < columnCount; j++) {
            cols.push(<col key={j} style={{width: columnSize[j], minWidth: columnSize[j]}}/>)
        }
        return <colgroup>{cols}</colgroup>
    }

    _createRows(rowCount, columnCount, creator) {
        const {isNeedMerge, mergeRule} = this.props;
        const map = {}, preCol = {}, preRow = {};
        const rows = [], cells = {};
        for (let i = 0; i < rowCount; i++) {
            const cols = [];
            for (let j = 0; j < columnCount; j++) {
                if (!map[i]) {
                    map[i] = {};
                }
                map[i][j] = {};
                if (isNeedMerge === true) {
                    if (i === 0 && j === 0) {
                        createOneCell(cols, i, j);
                    } else if (j === 0 && i > 0) {
                        const isNeedMergeRow = mergeRule({i, j}, {i: i - 1, j});
                        if (isNeedMergeRow === true) {
                            mergeRow(i, j);
                            preRow[i] = preCol[j];
                        } else {
                            createOneCell(cols, i, j);
                        }
                    } else if (i === 0 && j > 0) {
                        const isNeedMergeCol = mergeRule({i, j}, {i, j: j - 1});
                        if (isNeedMergeCol === true) {
                            mergeCol(i, j);
                            preCol[j] = preRow[i];
                        } else {
                            createOneCell(cols, i, j);
                        }
                    } else {
                        const isNeedMergeRow = mergeRule({i, j}, {i: i - 1, j});
                        const isNeedMergeCol = mergeRule({i, j}, {i, j: j - 1});
                        if (isNeedMergeCol && isNeedMergeRow) {
                            continue;
                        }
                        if (isNeedMergeCol) {
                            mergeCol(i, j);
                        }
                        if (isNeedMergeRow) {
                            mergeRow(i, j);
                        }
                        if (!isNeedMergeCol && !isNeedMergeRow) {
                            createOneCell(cols, i, j);
                        }
                    }
                } else {
                    createOneCell(cols, i, j);
                }
            }
            rows.push(cols);
        }
        function createOneCell(cols, i, j) {
            if (!cells[i]) {
                cells[i] = {};
            }
            cells[i][cols.length] = map[i][j];
            cols.push(map[i][j]);
            preCol[j] = map[i][j];
            preRow[i] = map[i][j];
        }

        function mergeRow(i, j) {
            preCol[j].rowSpan = ((preCol[j].rowSpan || 1) | 0) + 1;
        }

        function mergeCol(i, j) {
            preRow[i].colSpan = ((preRow[i].colSpan || 1) | 0) + 1;
        }

        const result = [];
        for (let i = 0; i < rows.length; i++) {
            const cols = [];
            for (let j = 0; j < rows[i].length; j++) {
                cols.push(creator(i, j, cells[i][j]))
            }
            result.push(<tr key={i}>{cols}</tr>)
        }
        return result;
    }

    _renderHeader() {
        const {headerRowCount, columnCount, headerCreator} = this.props;
        const rows = this._createRows(headerRowCount, columnCount, (i, j, map) => {
            return <th rowSpan={map.rowSpan} colSpan={map.colSpan} key={j}>{headerCreator(i, j)}</th>
        });
        return <thead>{rows}</thead>
    }

    _renderBody() {
        const {rowCount, columnCount, itemCreator} = this.props;
        const rows = this._createRows(rowCount, columnCount, (i, j, map) => {
            return <td rowSpan={map.rowSpan} colSpan={map.colSpan} key={j}>{itemCreator(i, j)}</td>
        });
        return <tbody>{rows}</tbody>
    }

    render() {
        const {rowCount, headerRowCount, columnCount, itemCreator, headerCreator, columnSize, isNeedMerge, mergeRule, ...props} = this.props, {...state} = this.state;
        return <div {...props}>
            <table className='table'>
                {this._renderColGroup()}
                {this._renderHeader()}
                {this._renderBody()}
            </table>
        </div>
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

}
export default TableComponent
