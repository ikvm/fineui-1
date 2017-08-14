import React, { Component } from 'react'
import Tree from '../components/tree/Tree'
import Button from '../components/button'
import IconButton from '../components/iconbutton'
import { HorizontalCenterLayout } from '../layout'

export default class TreeDemo extends Component {
    render() {
        return <HorizontalCenterLayout width={ 200 }>
                 <Tree></Tree>
                 <Button trigger='mouseup,click,mousedown' iconCls='abc'>Button</Button>
                 <IconButton width={ 100 } height={ 50 }></IconButton>
               </HorizontalCenterLayout>
    }
}