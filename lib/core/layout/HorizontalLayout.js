import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Layout from './Layout'
import './HorizontalLayout.less'

const CLASS_NAME = 'flex-horizontal-layout'
const VERTICAL_ALIGN = {
    TOP: '_top',
    MIDDLE: '_middle',
    BOTTOM: '_bottom',
    STRETCH: '_stretch'
}

class HorizontalLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        scrollx: true,
        verticalAlign: VERTICAL_ALIGN.TOP
    }

    render() {
        const {children, verticalAlign, className, ...props} = this.props;
        return <Layout
            className={cn((props.scrollx || props.scrolly) ? 'clearfix' : cn(CLASS_NAME, verticalAlign), className)} {...props}>
            {(props.scrollx || props.scrolly) ?
                <div
                    className={cn(CLASS_NAME, 'layout-wrapper', verticalAlign)}>{children}</div> : children}
        </Layout>
    }
}
HorizontalLayout.VERTICAL_ALIGN = VERTICAL_ALIGN
export default HorizontalLayout
