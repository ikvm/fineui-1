import React, { Component } from 'react';
import Toast from '../components/tip/toast/Toast'
import Button from '../components/button'
import {CenterLayout} from '../layout'


export default class TipsDemo extends Component {
    render () {
        return (
            <CenterLayout>
                <Button handler={()=>Toast.show('Toast 提示,3秒后消失')}>toast</Button>
            </CenterLayout>
        )
    }
}