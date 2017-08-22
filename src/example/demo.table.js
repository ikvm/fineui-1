import React, {Component} from 'react';
import '../components/table/Table.less';
import {MyTable} from '../components/table';
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

        return (
            <AbsoluteLayout className="App" >
                <div className="App" >
                <MyTable leftHeadArray={headArray.slice(0, LEFT_COLUMN)} rightHeadArray={headArray.slice(LEFT_COLUMN)}
                         leftBodyArray={leftBodyArray} rightBodyArray={rightBodyArray}
                         columnSize={columnSize} headerRowSize={headerRowSize} rowSize={rowSize}
                         leftCellsHeight={leftCellsHeight}/>
                </div>
            </AbsoluteLayout>
        );
    }

    
}

export default TableDemo;

