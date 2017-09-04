import React, { Component, PropTypes } from 'react'
import Button from '../src/base/single/button'
import IconButton from '../src/base/single/iconbutton'
import TextButton from '../src/base/single/textbutton'
import { HorizontalCenterLayout, LeftLayout } from '../src/core/layout'

class ButtonDemo extends Component {
    constructor(props) {
        super(props)
    }

    buttonHandler = (e) => {
        console.log(e.currentTarget)
        console.log(e.target)
    }

    render() {
        return <LeftLayout hgap={ 20 } vgap={ 30 }>
                 <Button hgap={ 10 } handler={ this.buttonHandler }>默认</Button>
                 <Button hgap={ 10 } trigger='dblclick' level="common">common</Button>
                 <Button hgap={ 10 } level="success">success</Button>
                 <Button hgap={ 10 } level="warning">warning</Button>
                 <Button hgap={ 10 } level="ignore">ignore</Button>
                 <Button hgap={ 10 } clear={ true } level="common">common clear</Button>
                 <Button hgap={ 10 } clear={ true } level="success">success clear</Button>
                 <Button hgap={ 10 } clear={ true } level="warning">warning clear</Button>
                 <Button hgap={ 10 } clear={ true } level="ignore">ignore clear</Button>
                 <Button hgap={ 10 } block={ true } level="common">block</Button>
                 <Button hgap={ 10 } block={ true } level="ignore">ignore block</Button>
                 <Button hgap={ 10 } disabled={ true }>common disabled</Button>
                 <Button hgap={ 10 } disabled={ true }>success disabled</Button>
                 <Button hgap={ 10 } disabled={ true }>warning disabled</Button>
                 <Button hgap={ 10 } level="ignore" disabled={ true }>ignore disabled</Button>
                 <Button hgap={ 10 } trigger='mouseup,mousedown,dbclick' iconCls='test-icon'>带图标的 button,trigger 同时为mouseup,mousedown,dbclick</Button>
                 <IconButton hgap={ 10 } width={ 25 } iconCls='test-icon'></IconButton>
                 <TextButton hgap={ 10 }>文字按钮</TextButton>
               </LeftLayout>
    }
}

export default ButtonDemo