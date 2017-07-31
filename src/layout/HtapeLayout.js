import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import some from 'lodash/some'
import extend from 'lodash/extend'
import sum from 'lodash/sum'

class HtapeLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {children, ...props} = this.props;
        this.layout = [];
        React.Children.forEach(children, (child, i) => {
            this.layout[i] = child.props.width;
        });
        return <Layout ref='container' {...props}>
            {React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                    layout: this.layout,
                    index
                })
            })}
        </Layout>
    }
}

class Item extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const {layout, index} = this.props;
        const ele = ReactDOM.findDOMNode(this.refs.container);
        ele.style.position = 'absolute';
        ele.style.top = '0px';
        ele.style.bottom = '0px';
        if (layout[index] != null) {
            ele.style.width = layout[index] + 'px';
        }
        let splitIndex = 0;
        some(layout, (v, i) => {
            if (v == null) {
                splitIndex = i;
                return true;
            }
        });
        if (index >= splitIndex) {
            const right = sum(layout.slice(index + 1));
            ele.style.right = right + 'px';
        }
        if (index <= splitIndex) {
            const left = sum(layout.slice(0, index));
            ele.style.left = left + 'px';
        }
    }

    render() {
        return React.cloneElement(React.Children.only(this.props.children), {
            ref: 'container'
        })
    }
}
HtapeLayout.Item = Item;
export default HtapeLayout
