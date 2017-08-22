import React, {Component} from 'react';
import {isCellColVisible, isCellRowVisible} from '../../../utils/utils/isCellVisible';
import {HorizontalLayout, VerticalLayout} from '../../../layout'
import {TableCellResizer} from '../Component'

class HeadCell extends Component {

    render() {

        const {className, col, height, width, onTableCellResize, text, left, ...props} = this.props;

        let children = <span>{text}</span>;

        return(
                <HorizontalLayout className={className} left={left} top={top} scrollx={false}
                                  scrolly={false} verticalAlign="_middle" height={height} width={width} {...props}>
                    <VerticalLayout className="text-container" horizontalAlign="_center" scrollx={false} 
                                    scrolly={false} children={children} top={0} left={0}>
                    </VerticalLayout>
                    <TableCellResizer height={height} left={0} index={col} width={width}
                                      onTableCellResize={onTableCellResize}/>
                </HorizontalLayout>
            );
    }
}

export default HeadCell