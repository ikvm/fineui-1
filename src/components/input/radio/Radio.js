import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../iconbutton'
import { HorizontalAdaptLayout, HorizontalLayout } from '../../../layout'
import Label from '../../label'

const CLASS_NAME = 'bi-radio'

export default class Radio extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        selected: false,
        handler: () => { }
    }

    handleChange = () => {
        this.context.radioGroup.onChange && this.context.radioGroup.onChange(23)
        this.props.handler()
    }

    render() {
        const { selected, handler, value, checked, ...props } = this.props
        const { radioGroup } = this.context
        const opts = {}
        if (radioGroup) {
            opts.onChange = radioGroup.onChange.bind(null, value)
            opts.checked = radioGroup.checkedValue === value
        }
        return (
            <HorizontalLayout>
                <input type='radio' {...opts} ></input>
                <Label hgap={5}>{this.props.children}</Label>
            </HorizontalLayout>
        )
    }
}

Radio.contextTypes = {
    radioGroup: PropTypes.object
}