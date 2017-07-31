import React, {
    Component
} from 'react'
import {cn, sc, isNil} from 'utils'

class CardLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {defaultShowKey, children, style, ...props} = this.props;
        return <div {...props} >
            {React.Children.map(children, (child, index) => {
                const key = child.key || index;
                return <div key={key} style={sc([{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }], [{display: 'none'}, !isNil(defaultShowKey) && key !== defaultShowKey])}>
                    {
                        child
                    }
                </div>
            })}
        </div>
    }
}
export default CardLayout
