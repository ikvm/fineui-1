import React, { Component } from 'react'
import Label from '../../src/base/single/label'
import { CenterLayout } from '../../src/core/layout'

export default class CenterLayoutDemo extends Component {
    render() {
        return (
            <CenterLayout style={ { border: 'solid 1px #cccccc' } } vgap={ 20 } hgap={ 20 }>
              <Label className='layout-bg1' height={ 50 }>居中布局,水平和垂直方向居中,为了看着更明显一点,窝给外边加个边框吧</Label>
            </CenterLayout>
            );
    }
}