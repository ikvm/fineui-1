import React, {Component} from 'react';
import {isCellColVisible, isCellRowVisible} from '../../../utils/utils/isCellVisible';
import {HorizontalLayout, VerticalLayout} from '../../../layout'

class Cell extends Component {

    render() {

        const {className, head, col, row, left, top, startIndex} = this.props;

        //let newLeft = (col - startIndex) * 100 + left;

        let text = head ? ("表头0-" + col) : (row + "-" + col);

        let children = <span>{text}</span>;

        return(
                <HorizontalLayout className={className} left={left} top={top} scrollx={false}
                                  scrolly={false} verticalAlign="_middle">
                    <VerticalLayout horizontalAlign="_center" scrollx={false} scrolly={false} children={children}
                                    width="100%">
                    </VerticalLayout>
                </HorizontalLayout>
            );
    }

    shouldComponentUpdate(nextProps, nextState) {
        //let initLeft = (this.props.col - this.props.startIndex) * 100;
        let nextVisible = isCellColVisible(nextProps.left, nextProps.col, 100, 6)
                          &&
                          isCellRowVisible(nextProps.top, nextProps.row, 40, 11);
        let currVisible = isCellColVisible(this.props.left, this.props.col, 100, 6)
                          &&
                          isCellRowVisible(this.props.top, this.props.row, 40, 11);
        if (!nextVisible && !currVisible) {
            return false;
        }
        else
            return true;
    }
}

export default Cell