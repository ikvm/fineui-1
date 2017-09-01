import React, { Component } from 'react';
import Toast from '../src/base/single/tip/toast/Toast'
import Button from '../src/base/single/button'
import { CenterLayout } from '../src/core/layout'


export default class TipsDemo extends Component {
    render() {
        return (
            <CenterLayout>
              <Button handler={ () => Toast.show('Toast 提示,3秒后消失') }>toast</Button>
            </CenterLayout>
        )
    }
}