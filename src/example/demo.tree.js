import React, { Component } from 'react'
import Tree from '../components/tree/Tree'
import Button from '../components/button'
import IconButton from '../components/iconbutton'
import TextButton from '../components/textbutton'
import { HorizontalCenterLayout } from '../layout'

export default class TreeDemo extends Component {
    render() {
        return <HorizontalCenterLayout width={ 200 }>
                 <Tree></Tree>
               </HorizontalCenterLayout>
    }
}