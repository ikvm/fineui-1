import React, {Component, PropTypes} from 'react'
import range from 'lodash/range'

import {
    CenterLayout,
    HorizontalCenterLayout,
    VerticalCenterLayout,
    HorizontalLayout,
    HtapeLayout,
    VtapeLayout,
    Layout,
    VerticalLayout
} from '../layout'
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
        return <HorizontalLayout verticalAlign={HorizontalLayout.VERTICAL_ALIGN.STRETCH}
                                 style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
            {range(1000).map(() => {
                return <div>123</div>
            })}
        </HorizontalLayout>
    }
}
export default App
