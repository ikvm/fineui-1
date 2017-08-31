import React, { Component } from 'react'
import Input from '../src/components/input'
import Editor from '../src/components/editor'
import { HorizontalCenterLayout, Layout } from '../src/layout'
import Button from '../src/components/button'
import Toast from '../src/components/tip/toast/Toast'

export default class EditorDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handler = () => {
        Toast.show(this.editor.getValue())
    }

    render() {
        return <HorizontalCenterLayout width={ 800 }>
                 <Editor ref={ editor => this.editor = editor }></Editor>
                 <Button tgap={ 10 } height={ 20 } handler={ this.handler }>getValue</Button>
               </HorizontalCenterLayout>
    }
}