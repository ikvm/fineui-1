import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'

import each from 'lodash/each'

class VerticalLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const parent = ReactDOM.findDOMNode(this.refs.container);
        each(parent.children, (child) => {
            child.style.position = 'relative'
        })
    }

    render() {
        const {children, ...props} = this.props;
        return <Layout ref='container' scrolly={true} {...props}>
            {children}
        </Layout>
    }
}
export default VerticalLayout
