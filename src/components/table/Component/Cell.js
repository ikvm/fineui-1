import React, { Component } from 'react';
import { HorizontalLayout, VerticalLayout, AbsoluteLayout } from '../../../layout'
import { translateDOMPositionXY } from '../Component'

class Cell extends Component {


    componentWillMount() {
        if (isNaN(window.cellCount))
            window.cellCount = 0;
    }


    render() {
        window.cellCount++;
        const { className, left, top, text, width, height, children } = this.props;
        const pos = {};
        translateDOMPositionXY(pos, left, top);
        //let children = <span>{text}</span>;

        /*
        <HorizontalLayout className={className} lgap={left} tgap={top} scrollx={false}
                          scrolly={false} verticalAlign="_middle" {...props}>
            <VerticalLayout className="text-container" horizontalAlign="_center" scrollx={false}
                            scrolly={false} children={children} tgap={0} lgap={0}>
            </VerticalLayout>
        </HorizontalLayout>
        */

        return (
            //<AbsoluteLayout className={className} style={{ position: "absolute", left: left, top: top }} height={height} width={width}>
            <AbsoluteLayout className={className} style={{ position: "absolute", ...pos }} height={height} width={width}>
                <AbsoluteLayout.Item children={children} left={0} top={0} right={0} bottom={0} />
            </AbsoluteLayout>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.height === nextProps.height
            && this.props.width === nextProps.width
            && this.props.left === nextProps.left) {
            return false;
        } else {
            return true;
        }
    }
}

export default Cell