import React, { Component } from 'react'
import ButtonView from '../buttonView'
import Icon from '../icon'
import cn from 'classnames'
import { HorizontalAdaptLayout, CenterLayout } from '../../layout'


const CLASS_NAME = 'bi-icon-button'

export default class IconButton extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        type: ''
    }


    render() {
        const {className, iconCls, ...props} = this.props

        return <ButtonView className={ cn(CLASS_NAME, className) } width={ 30 } height={ 30 } {...props}>
                 <Icon type={ iconCls }></Icon>
               </ButtonView>
    }
}