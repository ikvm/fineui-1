import React, {Component} from 'react';
import {MyTable} from '../components/table';

class TableDemo extends Component{

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let items = [], header = [], columnSize = [];
        
        let rowCount = 100, columnCount = 100;

        for (let i = 0; i < 1; i++) {
            header[i] = [];
            for (let j = 0; j < columnCount; j++) {
                header[i][j] = "表头" + i + "-" + j;
                columnSize[j] = 100;
            }
        }
        for (let i = 0; i < rowCount; i++) {
            items[i] = [];
            for (let j = 0; j < columnCount; j++) {
                items[i][j] = (i < 3 ? 0 : i) + "-" + j;
            }
        }

        let mergeRows = [];
        let mergeCols = [0, 1];
        let freezeCols = [0, 1];
        let isNeedFreeze = true;
        let mergeRule = (col1, col2) => {
            return col1 === col2;
        }
        
        return (
            <MyTable header={header} 
                     items={items}
                     columnSize={columnSize}
                     mergeCols={mergeCols}
                     mergeRows={mergeRows}
                     freezeCols={freezeCols}
                     isNeedFreeze={isNeedFreeze}
                     mergeRule={mergeRule}
                     tableHeight={480}
                     tableWidth={800}/>
                
        );
        
    }

    
}

export default TableDemo;

