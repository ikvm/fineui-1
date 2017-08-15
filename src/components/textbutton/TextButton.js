import React, { Component } from 'react'
import ButtonView from '../buttonView'
import Text from '../text'
import cn from 'classnames'


const CLASS_NAME = 'bi-text-button'

export default class IconButton extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        type: ''
    }


    render() {
        const {className, ...props} = this.props

        return <ButtonView className={ cn(CLASS_NAME, className) } {...props}>
                 <Text>
                   { this.props.children }
                 </Text>
               </ButtonView>
    }
}