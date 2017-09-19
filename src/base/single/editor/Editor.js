import React, { Component } from 'react'
import cn from 'classnames'
import { VerticalCenterLayout } from '../../../core/layout'
import Input from '../input'
import Label from '../label'


const CLASS_NAME = 'fct-editor'


export default class Editor extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            watermarkShow: true
        }
    }

    static defaultProps = {
        watermark: '假装是水印'
    }

    handleFocus = () => {

    }

    handleBlur = () => {

    }

    isEmpty = () => {

    }

    getValue = () => {
        return this.input.getValue()
    }


    render() {
        const {watermark, ...props} = this.props

        return <VerticalCenterLayout className={ cn(CLASS_NAME) } width={ 300 } height={ 20 }>
                 <Input ref={ input => this.input = input } onFocus={ this.handleFocus } onBlur={ this.handleBlur } placeholder={ watermark }></Input>
               </VerticalCenterLayout>
    }
}
