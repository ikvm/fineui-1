import React, {
    Component
} from 'react'
import cn from 'classnames'
import Layout from './Layout'
import './VerticalLayout.less'

const CLASS_NAME = 'flex-vertical-layout'
const HORIZONTAL_ALIGN = {
    STRETCH: '_stretch',
    LEFT: '_left',
    CENTER: '_center',
    RIGHT: '_right'
}

class VerticalLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        horizontalAlign: HORIZONTAL_ALIGN.STRETCH
    }

    render() {
        const {children, horizontalAlign, className, ...props} = this.props;
        return <Layout
            className={cn((props.scrollx || props.scrolly) ? 'clearfix' : cn(CLASS_NAME, horizontalAlign), className)} {...props}>
            {(props.scrollx || props.scrolly) ?
                <div
                    className={cn(CLASS_NAME, 'layout-wrapper', horizontalAlign)}>{children}</div> : children}
        </Layout>
    }
}
VerticalLayout.HORIZONTAL_ALIGN = HORIZONTAL_ALIGN
export default VerticalLayout
