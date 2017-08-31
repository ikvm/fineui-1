import React, {
    Component
} from 'react'
import cn from 'classnames'
import Layout from '../Layout'
import './HorizontalCenterLayout.less'

const CLASS_NAME = 'flex-horizontal-center-layout'

class HorizontalCenterLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {children, className, ...props} = this.props;
        return <Layout
            className={cn((props.scrollx || props.scrolly) ? 'clearfix' : CLASS_NAME, className)} {...props}>
            {(props.scrollx || props.scrolly) ?
                <div className={cn(CLASS_NAME, 'layout-wrapper')}>{children}</div> : children}
        </Layout>
    }
}
export default HorizontalCenterLayout
