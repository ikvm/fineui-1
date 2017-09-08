import React, { Component } from 'react';
import { HorizontalLayout, VerticalLayout, AbsoluteLayout } from '../../../core/layout'
import { TableCellResizer } from '../Component'
import { translateDOMPositionXY } from '../../../utils'


class HeadCell extends Component {

    render() {

        const { className, col, height, width, onTableCellResize, text, left, top, children, ...props } = this.props;
        //let children = <span>{text}</span>;
        const pos = {};
        translateDOMPositionXY(pos, left, top);
        /*
        <HorizontalLayout className={className} lgap={left} tgap={top} scrollx={false}
                                  scrolly={false} verticalAlign="_middle" height={height} width={width} {...props}>
                    <VerticalLayout className="text-container" horizontalAlign="_center" scrollx={false}
                                    scrolly={false} children={children} tgap={0} lgap={0}>
                    </VerticalLayout>
                    <TableCellResizer height={height} left={0} index={col} width={width}
                                      onTableCellResize={onTableCellResize}/>
                </HorizontalLayout>
        */

        return (
            <AbsoluteLayout className={className} style={{ position: "absolute", ...pos }} height={height} width={width}>
                <AbsoluteLayout.Item children={children} left={0} top={0} right={0} bottom={0} />
                <AbsoluteLayout.Item right={0} top={0} bottom={0}>
                    <TableCellResizer height={height} left={0} index={col} width={width}
                        onTableCellResize={onTableCellResize} />
                </AbsoluteLayout.Item>
            </AbsoluteLayout>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.left === nextProps.left && this.props.width === nextProps.width) {
            return false;
        } else {
            return true;
        }
    }
}

export default HeadCell