import React, { Component } from 'react'
import {Layout} from '../index'
import cn from 'classnames'
import isNotEmptyString from '../../utils/utils/isNotEmptyString'



const CLASS_NAME ='flex-grid-layout-row'

const VERTICAL_ALIGN = {
    TOP: '_top',
    MIDDLE: '_middle',
    BOTTOM: '_bottom',
    STRETCH: '_stretch'
}

export default class Row extends Component {
    constructor(props, context) {
        super(props, context)
    }
    
    static defaultProps={
        align: 'stretch',
        justify:'space-around'
    }
    render () {
        const {className,align,justify,...props}=this.props

        const classes=cn(CLASS_NAME,className,{
            [`${CLASS_NAME}-${align}`]:isNotEmptyString(align),
            [`${CLASS_NAME}-${justify}`]:isNotEmptyString(justify)
        })

        const cols=React.Children.map(this.props.children,(col)=>{
            return col
        })

        return <Layout className={classes} {...props}>{cols}</Layout>
    }
}