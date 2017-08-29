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
        
    }
    render () {
        const {className,row,columns,...props}=this.props

        const cols=React.Children.map(this.props.children,(col)=>{
            return col
        })

        return <Layout className={cn(className,CLASS_NAME)} {...props}>{cols}</Layout>
    }
}