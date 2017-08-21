import React, {Component} from 'react';
import {HorizontalLayout, VerticalLayout} from '../../../layout'
import {TableCellResizer} from '../Component'

class HeadCell extends Component {

    render() {

        const {className, head, col, row, left, top, height, width, startIndex, onTableCellResize, colWidth, 
                 ...props} = this.props;

        let newLeft = 0;
         
        for (let i = 0; i < col - startIndex; i++) {
            newLeft += colWidth[i];
        }

        newLeft += left;

        let newTop = row * 40 + top;

        let text = head ? ("表头0-" + col) : (row + "-" + col);

        let children = <span>{text}</span>;

        return(
                <HorizontalLayout className={className} left={newLeft} top={newTop} scrollx={false}
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