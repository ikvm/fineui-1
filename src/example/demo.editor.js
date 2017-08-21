import React, { Component } from 'react'
import Input from '../components/input'
import Editor from '../components/editor'
import { HorizontalCenterLayout, Layout } from '../layout'
import Button from '../components/button'
import Toast from '../components/tip/toast/Toast'

export default class EditorDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handler = () => {
        Toast.show(this.editor.getValue())
    }

    render() {
        return <HorizontalCenterLayout width={800}>
            <Editor ref={editor => this.editor = editor}></Editor>
            <Button tgap={10} height={20} handler={this.handler}>getValue</Button>
        </HorizontalCenterLayout>
    }
}