import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Layout from '../Layout'
import './HtapeLayout.less'

const CLASS_NAME = 'flex-horizontal-tape-layout'
const VERTICAL_ALIGN = {
    TOP: '_top',
    MIDDLE: '_middle',
    BOTTOM: '_bottom',
    STRETCH: '_stretch'
}

class HorizontalTapeLayout extends Component {
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

class Item extends Component {
    constructor() {
        super()
    }

    render() {
        const {children, width, className, height,...props} = this.props;
        return <Layout width={width}
                       className={cn('layout-item', {'layout-full-item': !width}, className)} {...props}>{children}</Layout>
    }
}
HorizontalTapeLayout.Item = Item
HorizontalTapeLayout.VERTICAL_ALIGN = VERTICAL_ALIGN
export default HorizontalTapeLayout
