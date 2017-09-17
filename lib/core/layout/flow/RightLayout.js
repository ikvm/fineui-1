import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Layout from '../Layout'
import './RightLayout.less'

const CLASS_NAME = 'flex-right-layout'
const VERTICAL_ALIGN = {
    TOP: '_top',
    MIDDLE: '_middle',
    BOTTOM: '_bottom',
    STRETCH: '_stretch'
}

class RightLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        scrollable: false,
        verticalAlign: VERTICAL_ALIGN.TOP
    }

    render() {
        const {children, verticalAlign, className, ...props} = this.props;
        return <Layout
            className={cn(CLASS_NAME, verticalAlign, className)} {...props}>
            {children}
        </Layout>
    }
}
RightLayout.VERTICAL_ALIGN = VERTICAL_ALIGN
export default RightLayout
