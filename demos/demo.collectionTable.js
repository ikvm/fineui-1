import React, { Component } from 'react';
import { CollectionTable } from '../src/base/CollectionTable';
import { AbsoluteLayout, CenterLayout } from '../src/core/layout';

class CollectionTableDemo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let rowCount = 1000,
            columnCount = 100;

        const header = [], items = [], columnSize = [];
        for (let i = 0; i < columnCount; i++) {
            header[i] = i;
            columnSize[i] = 100;
        }
        for (let i = 0; i < rowCount; i++) {
            if (!items[i]) {
                items[i] = [];
            }
            for (let j = 0; j < columnCount; j++) {
                if (i < 3 && j < 2) {
                    items[i][j] = '0-0'
                } else {
                    items[i][j] = `${i}-${j}`;
                }
            }
        }

        let mergeRows = [];
        let mergeCols = [0, 1];
        let freezeCols = [0, 1];
        let mergeRule = (col1, col2) => {
            return col1 === col2;
        }

        return (
            <CenterLayout>
                <CollectionTable
                    header={[header]}
                    items={items}
                    columnSize={columnSize}
                    mergeCols={mergeCols}
                    mergeRows={mergeRows}
                    freezeCols={freezeCols}
                    isNeedFreeze={true}
                    isNeedResize={true}
                    isNeedMerge={true}
                    mergeRule={mergeRule}
                    height={490}
                    width={810}
                    headerCellRenderer={({ rowIndex, columnIndex }) => {
                        return <CenterLayout><span>{`表头${rowIndex}-${columnIndex}`}</span></CenterLayout>
                    }}
                    cellRenderer={({ rowIndex, columnIndex }) => {
                        return <CenterLayout><span>{`${rowIndex}-${columnIndex}`}</span></CenterLayout>
                    }} />
            </CenterLayout>
        );

    }
}

export default CollectionTableDemo;

