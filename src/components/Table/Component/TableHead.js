import React, {Component} from 'react';
import {TableRow} from '../Component';
import {HorizontalLayout} from '../../../layout';

class TableHead extends Component {

    render() {

        const {className, array, width, height, ...props} = this.props;

        return(
                <HorizontalLayout className={className} scrollx={false} scrolly={false} verticalAlign="_middle"
                                  width={width} height={height}>
                    {
                        <TableRow rowIndex={0} array={array} {...props}/>
                    }
                </HorizontalLayout>
            );
    }
}

export default TableHead