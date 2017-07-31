import React, {Component, PropTypes} from 'react'
import range from 'lodash/range'
import CenterLayout from '../layout/CenterLayout';
import HorizontalCenterLayout from '../layout/HorizontalCenterLayout';
import VerticalCenterLayout from '../layout/VerticalCenterLayout';
import HorizontalLayout from '../layout/HorizontalLayout';
import HtapeLayout from '../layout/HtapeLayout';
import VtapeLayout from '../layout/VtapeLayout';
import Layout from '../layout/Layout';
import VerticalLayout from '../layout/VerticalLayout';
class Item extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {};

    state = {};

    render() {
        const {...props} = this.props, {...state} = this.state;
        return <HtapeLayout style={{height: 30}}>
            <HtapeLayout.Item width={200}>
                <Layout>
                    一
                </Layout>
            </HtapeLayout.Item>
            <HtapeLayout.Item>
                <Layout>
                    文字
                </Layout>
            </HtapeLayout.Item>
            <HtapeLayout.Item width={200}>
                <Layout>
                    ->
                </Layout>
            </HtapeLayout.Item>
        </HtapeLayout>
    }
}
class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {};

    state = {};

    render() {
        const {...props} = this.props, {...state} = this.state;
        return <VerticalLayout style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
            {range(1000).map((i) => {
                return <Item key={i}/>
            })}
        </VerticalLayout>
    }
}
export default App
