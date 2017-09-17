import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import { Layout } from '../../../core/layout'



const OVERLAY_CLASS_NAME = 'bi-overlay'
const CONTAINER_CLASS_NAME = 'bi-overlay-container'

export default class Overlay extends Component {

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount = () => {
        this.updateOverlay()
    }

    componentDidUpdate = () => {
        this.updateOverlay()
    }

    componentWillUnmount = () => {
        if (this._element) {
            ReactDOM.unmountComponentAtNode(this._element)
            if (this._element.parentNode) {
                this._element.parentNode.removeChild(this._element)
            }
        }
    }

    updateOverlay = () => {
        if (!this._element) {
            this._element = document.createElement('div')
            this._element.className = CONTAINER_CLASS_NAME
            document.body.appendChild(this._element)
        }
        let overlay = <Layout className={ cn(OVERLAY_CLASS_NAME) }>
                        { this.props.children }
                      </Layout>
        ReactDOM.render(overlay, this._element)
    }

    render() {
        return null
    }

}