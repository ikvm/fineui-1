import React, {
    Component
} from 'react'

class Layout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {children, scrollx, scrolly, style, ...props} = this.props;
        return <div {...props}
                    style={{
                        ...{
                            overflowX: scrollx != null && (scrollx === true ? 'auto' : 'hidden'),
                            overflowY: scrolly != null && (scrolly === true ? 'auto' : 'hidden'),
                            ...style
                        }
                    }}
        >{children}</div>
    }
}
export default Layout
