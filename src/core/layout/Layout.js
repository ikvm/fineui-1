import React, {
    Component
} from 'react';

class Layout extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        const {children, disabled, invalid, invisible, scrollable, scrollx, scrolly, width, height, lgap, rgap, tgap, bgap, hgap, vgap, style, ...props} = this.props;
        return <div {...props}
                    style={{
                        ...{
                            overflowX: !scrollable && scrollx != null && (scrollx === true ? 'auto' : 'hidden'),
                            overflowY: !scrollable && scrolly != null && (scrolly === true ? 'auto' : 'hidden')
                        },
                        ...(scrollable != null && {overflow: scrollable ? 'auto' : 'hidden'}),
                        ...(scrollx && {overflowY: 'hidden'}),
                        ...(scrolly && {overflowX: 'hidden'}),
                        ...({marginLeft: (lgap != null ? lgap : 0) + (hgap != null ? hgap : 0)}),
                        ...({marginRight: (rgap != null ? rgap : 0) + (hgap != null ? hgap : 0)}),
                        ...({marginTop: (tgap != null ? tgap : 0) + (vgap != null ? vgap : 0)}),
                        ...({marginBottom: (bgap != null ? bgap : 0) + (vgap != null ? vgap : 0)}),
                        ...( invisible === true && {display: 'none'}),
                        ...( disabled === true && {pointerEvents: 'none'}),
                        width,
                        height,
                        ...style
                    }}
        >{children}</div>
    }
}

export default Layout
