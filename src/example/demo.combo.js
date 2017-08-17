/**
 * Created by Urthur on 2017/8/10.
 */
import React, { Component, PropTypes } from 'react'
import Combo from '../components/combo'
import Label from '../components/label'
import {
    Layout,
    VerticalLayout
} from '../layout'

class ComboDemo extends Component {
    constructor(props, context) {
        super(props, context);
    }

    _popupGetter() {
    return <Layout>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </Layout>
}

    render() {
        return <div style={{ marginTop: 100 + "px"}}>
            <Combo popupGetter={this._popupGetter()} trigger="click">
                <Label>trigger</Label>
            </Combo>
        </div>
    }
}

export default ComboDemo
