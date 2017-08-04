import React, {
    Component
} from 'react'
import cn from 'classnames'
import Layout from '../Layout'
import './CenterLayout.less'

const CLASS_NAME = 'flex-center-layout'

class CenterLayout extends Component {
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
export default CenterLayout
