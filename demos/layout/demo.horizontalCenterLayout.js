import React, { Component } from 'react'
import Label from '../../src/base/single/label'
import { HorizontalCenterLayout } from '../../src/core/layout'

export default class HorizontalCenterLayoutDemo extends Component {
    render() {
        return (
            <HorizontalCenterLayout>
              <Label className='layout-bg1' width={ 100 } height={ 50 }>水平居中 1</Label>
              <Label className='layout-bg2' width={ 100 } height={ 50 }>水平居中 2</Label>
              <Label className='layout-bg3' width={ 100 } height={ 50 }>水平居中 3</Label>
              <Label className='layout-bg4' width={ 100 } height={ 50 }>水平居中 4</Label>
              <Label className='layout-bg5' width={ 100 } height={ 50 }>水平居中 5</Label>
              <Label className='layout-bg6' width={ 100 } height={ 50 }>水平居中 6</Label>
            </HorizontalCenterLayout>
            );
    }
}