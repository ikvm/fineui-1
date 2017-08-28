import React, { Component, PropTypes } from 'react'
import Button from '../components/button'
import IconButton from '../components/iconbutton'
import TextButton from '../components/textbutton'
import { HorizontalCenterLayout } from '../layout'
import Radio from '../components/input/radio/Radio'
import RadioGroup from '../components/input/radiogroup/RadioGroup'
import Checkbox from '../components/input/checkbox/Checkbox'

class ButtonDemo extends Component {
    constructor(props) {
        super(props)
    }

    buttonHandler=(e)=>{
        console.log(e.currentTarget)
        console.log(e.target)
    }



    render() {
        return <HorizontalCenterLayout hgap={20} vgap={10}>
            <Button width={'100%'} handler={this.buttonHandler}>默认</Button>
            <Button width={'100%'} trigger='dblclick' level="common">common</Button>
            <Button width={'100%'} level="success">success</Button>
            <Button width={'100%'} level="warning">warning</Button>
            <Button width={'100%'} level="ignore">ignore</Button>
            <Button width={'100%'} clear={true} level="common">common clear</Button>
            <Button width={'100%'} clear={true} level="success">success clear</Button>
            <Button width={'100%'} clear={true} level="warning">warning clear</Button>
            <Button width={'100%'} clear={true} level="ignore">ignore clear</Button>
            <Button width={'100%'} disabled={true}>common disabled</Button>
            <Button width={'100%'} disabled={true}>success disabled</Button>
            <Button width={'100%'} disabled={true}>warning disabled</Button>
            <Button width={'100%'} level="ignore" disabled={true}>ignore disabled</Button>
            <Button width={'100%'} trigger='mouseup,mousedown,dbclick' iconCls='test-icon'>带图标的 button,trigger 同时为mouseup,mousedown,dbclick</Button>
            <IconButton iconCls='test-icon'></IconButton>
            <TextButton width={'100%'}>文字按钮</TextButton>
        </HorizontalCenterLayout>
    }
}

export default ButtonDemo