import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Layout from '../Layout'
import './HorizontalAdaptLayout.less'

const CLASS_NAME = 'flex-horizontal-adapt-layout'
const VERTICAL_ALIGN = {
    TOP: '_top',
    MIDDLE: '_middle',
    BOTTOM: '_bottom',
    STRETCH: '_stretch'
}

class HorizontalAdaptLayout extends Component {
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
            className={cn(CLASS_NAME, verticalAlign, className)} {...props}>
            {children}
        </Layout>
    }
}

class Item extends Component {
    constructor() {
        super()
    }

    render() {
        const {children, width, className, ...props} = this.props;
        return <Layout width={width}
                       className={cn('layout-item', {'layout-full-item': !width}, className)} {...props}>{children}</Layout>
    }
}
HorizontalAdaptLayout.Item = Item
HorizontalAdaptLayout.VERTICAL_ALIGN = VERTICAL_ALIGN
export default HorizontalAdaptLayout
