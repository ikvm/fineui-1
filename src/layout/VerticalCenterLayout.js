import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import each from 'lodash/each'

import Layout from './Layout'

class VerticalCenterLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const tr = ReactDOM.findDOMNode(this.refs.container);
        each(tr.children, (td) => {
            each(td.children, (child) => {
                child.style.position = 'relative';
                child.style.margin = '0px auto';
                child.style.top = '0';
                child.style.left = '0';
            })
        })
    }

    render() {
        const {children, ...props} = this.props;
        return <Layout {...props}>
            <table cellSpacing={0} cellPadding={0} style={{
                position: 'relative',
                height: '100%',
                whiteSpace: 'nowrap',
                borderSpacing: 0,
                border: 'none',
                borderCollapse: 'separate'
            }}>
                <tbody>
                <tr ref='container'>
                    {React.Children.map(children, (child) => {
                        return <td style={{
                            position: 'relative',
                            height: '100%',
                            verticalAlign: 'middle',
                            border: 'none',
                            margin: 0,
                            padding: 0
                        }}>
                            {child}
                        </td>
                    })}
                </tr>
                </tbody>
            </table>
        </Layout>
    }
}
export default VerticalCenterLayout
