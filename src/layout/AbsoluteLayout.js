import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'

class AbsoluteLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {children, ...props} = this.props;
        return <Layout ref='container' {...props}>
            {children}
        </Layout>
    }
}

class Item extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const ele = ReactDOM.findDOMNode(this.refs.container);
        ele.style.position = 'absolute';
        ele.style.left = this.props.left + 'px';
        ele.style.right = this.props.right + 'px';
        ele.style.top = this.props.top + 'px';
        ele.style.bottom = this.props.bottom + 'px';
    }

    render() {
        return React.cloneElement(React.Children.only(this.props.children), {
            ref: 'container'
        })
    }
}
AbsoluteLayout.Item = Item;
export default AbsoluteLayout
