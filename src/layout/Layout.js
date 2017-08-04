import React, {
    Component
} from 'react'

class Layout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {children, scrollable, scrollx, scrolly, width, height, style, ...props} = this.props;
        return <div {...props}
                    style={{
                        ...{
                            overflowX: !scrollable && scrollx != null && (scrollx === true ? 'auto' : 'hidden'),
                            overflowY: !scrollable && scrolly != null && (scrolly === true ? 'auto' : 'hidden')
                        },
                        ...(scrollable != null && {overflow: scrollable ? 'auto' : 'hidden'}),
                        ...(scrollx ? {overflowY: 'hidden'} : {}),
                        ...(scrolly ? {overflowX: 'hidden'} : {}),
                        width,
                        height,
                        ...style
                    }}
        >{children}</div>
    }
}
export default Layout
