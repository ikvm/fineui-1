import React, { Component } from 'react'
import { Layout } from '../layout'


export default class Widget extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        disabled: false,
        invisible: false,
        invalid: false
    }

    render() {

        const {disabled, invisible, invalid, ...props} = this.props

        return (
            <Layout {...props}>
              { this.props.children }
            </Layout>
        )
    }
}