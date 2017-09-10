import React, { Component } from 'react'
import cn from 'classnames'
import trim from 'lodash/trim'

const CLASS_NAME = 'bi-input'

export default class Input extends Component {
    constructor(props, context) {
        super(props, context)
    }
    static defaultProps = {
        validationChecker: () => true,
        quitChecker: () => { }, //按确定键能否退出编辑
        allowBlank: false,
        placeholder: ''
    }

    _checkValidationOnValueChange = () => {

        if ((this.props.allowBlank === false && trim(this.input.value) === '') || !this.props.validationChecker(this.input.value)) {
            console.log('error')
        }
        this._lastValidValue = this.input.value
    }


    handleChange = () => {
        this._checkValidationOnValueChange()
        if (this.props.onChange) {
            this.props.onChange()
        }
    }

    handleFocus = () => {
        if (this.props.onFocus) {
            this.props.onFocus()
        }
    }

    handleBlur = () => {
        this._checkValidationOnValueChange()
        if (this.props.onBlur) {
            this.props.onBlur()
        }
    }

    _bindEvent = () => {
        return {
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            onChange: this.handleChange
        }
    }

    getValue = () => {
        return this.input.value
    }

    render() {
        const { className, validationChecker, quitChecker, allowBlank, ...props } = this.props
        return <input ref={(input) => this.input = input} { ...this._bindEvent() } className={cn(CLASS_NAME, className)} {...props}></input>
    }
}