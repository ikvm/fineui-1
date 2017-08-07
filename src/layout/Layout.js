import React, {
    Component
} from 'react'

class Layout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {children, scrollable, scrollx, scrolly, width, height, lgap, rgap, tgap, bgap, hgap, vgap, style, ...props} = this.props;
        return <div {...props}
                    style={{
                        ...{
                            overflowX: !scrollable && scrollx != null && (scrollx === true ? 'auto' : 'hidden'),
                            overflowY: !scrollable && scrolly != null && (scrolly === true ? 'auto' : 'hidden')
                        },
                        ...(scrollable != null && {overflow: scrollable ? 'auto' : 'hidden'}),
                        ...(scrollx && {overflowY: 'hidden'}),
                        ...(scrolly && {overflowX: 'hidden'}),
                        ...(lgap != null && {marginLeft: lgap}),
                        ...(rgap != null && {marginRight: rgap}),
                        ...(tgap != null && {marginTop: tgap}),
                        ...(bgap != null && {marginBottom: bgap}),
                        ...(hgap != null && {marginLeft: hgap, marginRight: hgap}),
                        ...(vgap != null && {marginTop: tgap, marginBottom: tgap}),
                        width,
                        height,
                        ...style
                    }}
        >{children}</div>
    }
}
export default Layout
