import React, {
    Component
} from 'react'

class Layout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {children, scrollable, scrollx, scrolly, style, ...props} = this.props;
        return <div {...props}
                    style={{
                        ...{
                            overflowX: !scrollable && scrollx != null && (scrollx === true ? 'auto' : 'hidden'),
                            overflowY: !scrollable && scrolly != null && (scrolly === true ? 'auto' : 'hidden')
                        },
                        ...(scrollable ? {overflow: 'auto'} : {}),
                        ...(scrollx ? {overflowY: 'hidden'} : {}),
                        ...(scrolly ? {overflowX: 'hidden'} : {}),
                        ...style
                    }}
        >{children}</div>
    }
}
export default Layout
