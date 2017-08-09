import React, {Component, PropTypes} from 'react'
import LabelDemo from './demo.label'
import range from 'lodash/range'

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
        const {...props} = this.props, {...state} = this.state;
        return <HorizontalCenterLayout style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
                <div>123</div>

                <div>123</div>
                <LabelDemo></LabelDemo>
        </HorizontalCenterLayout>
    }
}
export default App
