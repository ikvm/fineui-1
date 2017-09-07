import React, { Component } from 'react'
import { Layout } from '../../core/layout'
import Widget from '../../core/Widget'

export default class Single extends Component {

    constructor(props, context) {
        super(props, context)
    }

    static defaultPtops = {
        readonly: false,
        title: null,
        warningTitle: null,
        tipType: null, // success或warning
        value: null
    }


    render() {

        const {readonly, title, warningTitle, tipType, value, ...props} = this.props

        return (
            <Layout {...props}>
              { this.props.children }
            </Layout>
        )
    }
}
