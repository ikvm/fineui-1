import React, {
    Component
} from 'react'
import cn from 'classnames'
import Layout from './Layout'
import './AbsoluteLayout.less'

class AbsoluteLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {children, className, ...props} = this.props;
        return <Layout className={cn('bi-absolute-layout', className)} {...props}>
            {children}
        </Layout>
    }
}

class Item extends Component {
    constructor() {
        super()
    }

    render() {
        const {children, style, left, right, top, bottom, ...props} = this.props;
        return <Layout style={{
            position: 'absolute',
            left,
            right,
            top,
            bottom,
            ...style
        }} {...props}>
            {children}
        </Layout>
    }
}
AbsoluteLayout.Item = Item;
export default AbsoluteLayout
