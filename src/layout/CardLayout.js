import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import isNil from 'lodash/isNil'
import each from 'lodash/each'

class CardLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    _reCalculate() {
        const parent = ReactDOM.findDOMNode(this.refs.container);
        each(parent.children, (child, i) => {
            child.style.position = 'absolute'
            child.style.left = 0
            child.style.right = 0
            child.style.top = 0
            child.style.bottom = 0
            child.style.display = this.showIndexes.indexOf(i) > -1 ? '' : 'none'
        })
    }

    componentDidMount() {
        this._reCalculate()
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.defaultShowKey !== this.props.defaultShowKey
    }

    componentDidUpdate() {
        this._reCalculate()
    }

    render() {
        const {defaultShowKey, children, ...props} = this.props;
        this.showIndexes = [];
        React.Children.forEach(children, (child, i) => {
            if (isNil(defaultShowKey) || defaultShowKey === child.props.key) {
                this.showIndexes.push(i)
            }
        });
        return <div {...props} >
            {children}
        </div>
    }
}
export default CardLayout
