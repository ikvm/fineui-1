import React, { Component } from 'react'
import {Layout} from '../index'
import cn from 'classnames'



const CLASS_NAME ='flex-grid-layout-col'

export default class Col extends Component {
    constructor(props, context) {
        super(props, context)
    }
    
    static defaultProps={
        grow:1
    }

    render () {

        const {className,grow,col,...props}=this.props

        return <Layout className={cn(className,CLASS_NAME)} style={{flexGrow:grow}} {...props}>{this.props.children}</Layout>
    }
}