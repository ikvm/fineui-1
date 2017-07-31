import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import each from 'lodash/each'
import Layout from './Layout'

class HorizontalCenterLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const parent = ReactDOM.findDOMNode(this.refs.container);
        each(parent.children, (child) => {
            child.style.position = 'relative';
            child.style.margin = '0px auto';
        })
    }

    render() {
        const {children, ...props} = this.props;
        return <Layout ref='container' {...props}>
            {children}
        </Layout>
    }
}
export default HorizontalCenterLayout
