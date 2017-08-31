import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HorizontalAdaptLayout, HorizontalLayout } from '../../../../core/layout'
import Radio from '../radio/Radio'
import isEqual from 'lodash/isEqual'


const CLASS_NAME = 'bi-radio-group'

export default class RadioGroup extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            checkedValue: this.props.checkedValue || '1'
        }
    }

    static defaultProps = {
        checkedValue: '',
        handler: () => {
            console.log('changed')
        }
    }

    getChildContext() {
        return {
            radioGroup: {
                onChange: this.handleChange,
                checkedValue: this.state.checkedValue
            }
        }
    }


    handleChange = (value) => {
        this.props.handler()
        this.setState({
            checkedValue: value
        })
    }

    render() {
        const {handler, checkedValue, ...props} = this.props
        return (
            <HorizontalAdaptLayout {...props}>
              { React.Children.map(this.props.children, (child) => {
                    return <HorizontalAdaptLayout.Item>
                             { child }
                           </HorizontalAdaptLayout.Item>
                }) }
            </HorizontalAdaptLayout>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
    }
}


RadioGroup.childContextTypes = {
    radioGroup: PropTypes.object
}
