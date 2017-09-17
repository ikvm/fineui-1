import React, { Component } from 'react'
import cn from 'classnames'


const CLASS_NAME = 'fct-img'

export default class Img extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        src: '',
        width: '100%',
        height: '100%'
    }

    render() {
        const { src, width, height, className, ...props } = this.props

        return <img style={cn(className, CLASS_NAME)} src={src} width={width} height={height} {...props} />

    }
}
