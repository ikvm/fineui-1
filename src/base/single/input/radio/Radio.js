import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../iconbutton'
import { HorizontalAdaptLayout, HorizontalLayout } from '../../../../core/layout'
import Label from '../../label'
import emptyFunction from 'fbjs/lib/emptyFunction'


const CLASS_NAME = 'fct-radio'

export default class Radio extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        selected: false,
        disabled: false,
        handler: emptyFunction
    }

    handleChange = () => {
        this.props.handler()
    }

    render() {
        const {selected, handler, value, checked, disabled, ...props} = this.props
        const {radioGroup} = this.context
        const opts = {}
        if (radioGroup) {
            opts.onChange = radioGroup.onChange.bind(null, value)
            opts.checked = radioGroup.checkedValue === value
        }
        opts.disabled = disabled
        return (
            <HorizontalLayout>
              <input type='radio' {...opts}></input>
              <Label hgap={ 5 }>
                { this.props.children }
              </Label>
            </HorizontalLayout>
        )
    }
}

Radio.contextTypes = {
    radioGroup: PropTypes.object
}
