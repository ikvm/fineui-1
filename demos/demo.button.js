import React, { Component, PropTypes } from 'react'
import Button from '../src/components/button'
import IconButton from '../src/components/iconbutton'
import TextButton from '../src/components/textbutton'
import { HorizontalCenterLayout, LeftLayout } from '../src/layout'
import Radio from '../src/components/input/radio/Radio'
import RadioGroup from '../src/components/input/radiogroup/RadioGroup'
import Checkbox from '../src/components/input/checkbox/Checkbox'

class ButtonDemo extends Component {
    constructor(props) {
        super(props)
    }

    buttonHandler = (e) => {
        console.log(e.currentTarget)
        console.log(e.target)
    }



    render() {
        return <LeftLayout hgap={ 20 } vgap={ 10 }>
                 <Button width={ '20%' } hgap={ 10 } handler={ this.buttonHandler }>默认</Button>
                 <Button width={ '20%' } hgap={ 10 } trigger='dblclick' level="common">common</Button>
                 <Button width={ '20%' } hgap={ 10 } level="success">success</Button>
                 <Button width={ '20%' } hgap={ 10 } level="warning">warning</Button>
                 <Button width={ '20%' } hgap={ 10 } level="ignore">ignore</Button>
                 <Button width={ '20%' } hgap={ 10 } clear={ true } level="common">common clear</Button>
                 <Button width={ '20%' } hgap={ 10 } clear={ true } level="success">success clear</Button>
                 <Button width={ '20%' } hgap={ 10 } clear={ true } level="warning">warning clear</Button>
                 <Button width={ '20%' } hgap={ 10 } clear={ true } level="ignore">ignore clear</Button>
                 <Button width={ '20%' } hgap={ 10 } disabled={ true }>common disabled</Button>
                 <Button width={ '20%' } hgap={ 10 } disabled={ true }>success disabled</Button>
                 <Button width={ '20%' } hgap={ 10 } disabled={ true }>warning disabled</Button>
                 <Button width={ '20%' } hgap={ 10 } level="ignore" disabled={ true }>ignore disabled</Button>
                 <Button width={ '20%' } hgap={ 10 } trigger='mouseup,mousedown,dbclick' iconCls='test-icon'>带图标的 button,trigger 同时为mouseup,mousedown,dbclick</Button>
                 <IconButton width={ '20%' } iconCls='test-icon'></IconButton>
                 <TextButton width={ '20%' } width={ '100%' }>文字按钮</TextButton>
               </LeftLayout>
    }
}

export default ButtonDemo