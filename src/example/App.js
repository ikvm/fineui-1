import React, { Component, PropTypes } from 'react'
import range from 'lodash/range'
import LabelDemo from './demo.label.jsx'

import {
    AbsoluteLayout,
    CenterLayout,
    HorizontalCenterLayout,
    VerticalCenterLayout,
    HorizontalLayout,
    HtapeLayout,
    VtapeLayout,
    Layout,
    VerticalLayout,
    HorizontalAdaptLayout,
    VerticalAdaptLayout
} from '../layout'

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {};

    state = {};

    render() {
        const { ...props } = this.props, { ...state } = this.state;
        return <AbsoluteLayout style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
            <AbsoluteLayout.Item left={400} top={200}>
                <ButtonDemo></ButtonDemo>
            </AbsoluteLayout.Item>
        </AbsoluteLayout>
    }
}
export default App
