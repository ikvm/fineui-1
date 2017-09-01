import React, { Component, PropTypes } from 'react'
import Button from '../src/base/single/button'
import FillLayoutDemo from './layout/demo.fillLayout'

import Popup from '../src/base/overlays/popup'

import range from 'lodash/range'
import './example.less'


import demos from './config/config'

import { AbsoluteLayout, CenterLayout, HorizontalCenterLayout, VerticalCenterLayout, HorizontalLayout, HtapeLayout, VtapeLayout, Layout, CardLayout, VerticalLayout, HorizontalAdaptLayout, VerticalAdaptLayout } from '../src/core/layout'

class TestApp extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {}

    render() {
        const {...props} = this.props,
            {...state} = this.state;
        return <CenterLayout style={ { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 } }>
                 <Popup>233</Popup>
               </CenterLayout>
    }
}
export default TestApp
