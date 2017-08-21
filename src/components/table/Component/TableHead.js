import React, {Component} from 'react';
import {TableRow} from '../Component';
import {HorizontalLayout} from '../../../layout';

class TableHead extends Component {

    render() {

        const {className, array, width, height, startIndexCol, colWidth, ...props} = this.props;


        return(
                <HorizontalLayout className={className} scrollx={false} scrolly={false} verticalAlign="_middle"
                                  width={width} height={height}>
                    {
                        <TableRow rowIndex={0} array={array.slice(startIndexCol, startIndexCol + width / 100 + 2)} 
                                  width={width} startIndexCol={startIndexCol} colWidth={colWidth} 
                                  {...props}/>
                    }
                </HorizontalLayout>
            );
    }
}

export default TableHead