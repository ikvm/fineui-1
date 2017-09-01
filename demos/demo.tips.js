import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Toast from '../src/base/single/tip/toast/Toast'
import Button from '../src/base/single/button'
import { CenterLayout } from '../src/core/layout'
import Popup from '../src/base/overlays/popup'
import getElementPosition from 'fbjs/lib/getElementPosition'


const Temp = props => {

}


export default class TipsDemo extends Component {


    handler = () => {
        console.log(getElementPosition(findDOMNode(this.c)))
    }



    render() {
        return (
            <CenterLayout style={ { position: 'relative' } }>
              <Button handler={ () => Toast.show('Toast 提示,3秒后消失') }>toast</Button>
              <Button ref={ (c) => this.c = c } handler={ this.handler } hgap={ 20 }>test</Button>
              <Popup target={ () => findDOMNode(this.c) }>
                <CenterLayout className='layout-bg3' style={ { border: 'solid 1px black' } } ref='container' width={ 50 } height={ 50 }>233</CenterLayout>
              </Popup>
            </CenterLayout>
        )
    }
}