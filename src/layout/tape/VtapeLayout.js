import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Layout from '../Layout'
import './VtapeLayout.less'

const CLASS_NAME = 'flex-vertical-tape-layout'
const HORIZONTAL_ALIGN = {
    STRETCH: '_stretch',
    LEFT: '_left',
    CENTER: '_center',
    RIGHT: '_right'
}

class VerticalTapeLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        scrollable: false,
        horizontalAlign: HORIZONTAL_ALIGN.STRETCH
    }

    render() {
        const {children, horizontalAlign, className, ...props} = this.props;
        return <Layout
            className={cn(CLASS_NAME, horizontalAlign, className)} {...props}>
            {children}
        </Layout>
    }
}

class Item extends Component {
    constructor() {
        super()
    }

    render() {
        const {children, height, className,width, ...props} = this.props;
        return <Layout height={height}
                       className={cn('layout-item', {'layout-full-item': !height}, className)} {...props}>{children}</Layout>
    }
}
VerticalTapeLayout.Item = Item
VerticalTapeLayout.VERTICAL_ALIGN = HORIZONTAL_ALIGN
export default VerticalTapeLayout
