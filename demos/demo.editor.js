import React, { Component } from 'react'
import Editor from '../src/base/single/editor'
import { HorizontalCenterLayout, Layout } from '../src/core/layout'
import Button from '../src/base/single/button'
import Toast from '../src/base/single/tip/toast/Toast'

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