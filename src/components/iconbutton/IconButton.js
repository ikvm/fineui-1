import React, { Component } from 'react'
import Button from '../button'
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

    handleClick = (e) => {

    }

    render() {
        const {className, iconCls, ...props} = this.props

        return <CenterLayout className={ cn(CLASS_NAME, className) } width={ 30 } height={ 30 } onClick={ this.handleClick }>
                 <Icon type={ iconCls }></Icon>
               </CenterLayout>
    }
}