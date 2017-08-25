import React, {Component} from 'react';
import {Table} from '../components/table';
import {AbsoluteLayout} from '../layout';


const LEFT_COLUMN = 2;
const RIGHT_COLUMN = 48;
const BODY_ROW = 50;

const defaultWidth = 100;
const defaultHeight = 40;

let headArray = [];
let leftBodyArray = [];
let rightBodyArray =[];

let columnSize = [];
let headerRowSize = defaultHeight;
let rowSize = defaultHeight;
let leftCellsHeight = [];


class TableDemo extends Component{

    constructor(props, context) {
        super(props, context);
    }


    componentWillMount() {
        for (let j = 0; j < BODY_ROW; j++) {
            leftBodyArray[j] = [];
            rightBodyArray[j] = [];
            leftCellsHeight[j] = defaultHeight;
            for (let i = 0; i < LEFT_COLUMN + RIGHT_COLUMN; i++) {
                headArray[i] = i;
                columnSize[i] = defaultWidth;
                if (i < LEFT_COLUMN) {
                    leftBodyArray[j][i] = i + j * (LEFT_COLUMN + RIGHT_COLUMN);

                } else {
                    rightBodyArray[j][i - LEFT_COLUMN] = i + j * (LEFT_COLUMN + RIGHT_COLUMN);

                }
            }
        }
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

export default TableDemo

