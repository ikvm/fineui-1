import React, {Component} from 'react'
import {HorizontalLayout, VerticalLayout} from '../../../layout'

class Cell extends Component {

    render() {

        const {className, left, top, text, ...props} = this.props;

        let children = <span>{text}</span>;

        return(
                <HorizontalLayout className={className} left={left} top={top} scrollx={false}
                                  scrolly={false} verticalAlign="_middle" {...props}>
                    <VerticalLayout className="text-container" horizontalAlign="_center" scrollx={false} 
                                    scrolly={false} children={children} top={0} left={0}>
                    </VerticalLayout>
                </HorizontalLayout>
            );
    }
}

export default Cell