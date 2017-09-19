import React, { Component } from 'react'
import Editor from '../src/base/single/editor'
import { HorizontalCenterLayout,AbsoluteLayout, Layout } from '../src/core/layout'
import Button from '../src/base/single/button'
import Msg from '../src/base/single/tip/Tip'

export default class EditorDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handler = () => {
        Msg.toast(this.editor.getValue())
    }

    render() {
        return <AbsoluteLayout width={ 800 }>
            <AbsoluteLayout.Item left={0} top={400} right={0}>
                 <Editor ref={ editor => this.editor = editor }></Editor>
            </AbsoluteLayout.Item>
            <AbsoluteLayout.Item left={'50%'} top={500}>
                 <Button tgap={ 10 } height={ 20 } handler={ this.handler }>getValue</Button>
            </AbsoluteLayout.Item>
               </AbsoluteLayout>
    }
}
