import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Layout from '../Layout'
import './LeftLayout.less'

const CLASS_NAME = 'flex-left-layout'
const VERTICAL_ALIGN = {
    TOP: '_top',
    MIDDLE: '_middle',
    BOTTOM: '_bottom',
    STRETCH: '_stretch'
}

class LeftLayout extends Component {
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
LeftLayout.VERTICAL_ALIGN = VERTICAL_ALIGN
export default LeftLayout
