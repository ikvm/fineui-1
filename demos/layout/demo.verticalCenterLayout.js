import React, { Component } from 'react'
import Label from '../../src/components/label'
import { VerticalCenterLayout } from '../../src/layout'

export default class VerticalCenterLayoutDemo extends Component {
    render() {
        return (
            <VerticalCenterLayout>
              <Label className='layout-bg1' width={ 100 } height={ 50 }>垂直居中 1</Label>
              <Label className='layout-bg2' width={ 100 } height={ 50 }>垂直居中 2</Label>
              <Label className='layout-bg3' width={ 100 } height={ 50 }>垂直居中 3</Label>
              <Label className='layout-bg4' width={ 100 } height={ 50 }>垂直居中 4</Label>
              <Label className='layout-bg5' width={ 100 } height={ 50 }>垂直居中 5</Label>
              <Label className='layout-bg6' width={ 100 } height={ 50 }>垂直居中 6</Label>
            </VerticalCenterLayout>
            );
    }
}