/**
 * Created by Urthur on 2017/8/10.
 */
import React, { Component, PropTypes } from 'react'
import Combo from '../components/combo'
import Label from '../components/label'
import {
    Layout,
    CenterLayout,
    VerticalLayout
} from '../layout'

class ComboDemo extends Component {
    constructor(props, context) {
        super(props, context);
    }

    _popupGetter() {
        return <VerticalLayout>
            <Label>选项1</Label>
            <Label>选项2</Label>
            <Label>选项3</Label>
            <Label>选项4</Label>
        </VerticalLayout>
    }

    render() {
        return <CenterLayout tgap={100}>
            <Combo popupGetter={this._popupGetter()} hgap={30} trigger="click">
                <Label>click,bottom</Label>
            </Combo>

            <Combo popupGetter={this._popupGetter()} hgap={30} trigger="click" direction="top">
                <Label>click,top</Label>
            </Combo>

            <Combo popupGetter={this._popupGetter()} hgap={30} trigger="hover">
                <Label>hover,bottom</Label>
            </Combo>
        </CenterLayout>
    }
}

export default ComboDemo
