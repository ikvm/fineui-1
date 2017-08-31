import React, { Component } from 'react'
import Label from '../../src/base/single/label'
import { HorizontalLayout } from '../../src/core/layout'

export default class HorizontalLayoutDemo extends Component {
    render() {
        return (
            <HorizontalLayout>
              <Label className='layout-bg1' width={ 100 } height={ 50 }>Left 1</Label>
              <Label className='layout-bg2' width={ 100 } height={ 50 }>Left 2</Label>
              <Label className='layout-bg3' width={ 100 } height={ 50 }>Left 3</Label>
              <Label className='layout-bg4' width={ 100 } height={ 50 }>Left 4</Label>
              <Label className='layout-bg5' width={ 100 } height={ 50 }>Left 5</Label>
              <Label className='layout-bg6' width={ 100 } height={ 50 }>Left 6</Label>
              <Label className='layout-bg1' width={ 100 } height={ 50 }>Left 7</Label>
              <Label className='layout-bg2' width={ 100 } height={ 50 }>Left 8</Label>
              <Label className='layout-bg3' width={ 100 } height={ 50 }>Left 9</Label>
              <Label className='layout-bg4' width={ 100 } height={ 50 }>Left 10</Label>
              <Label className='layout-bg5' width={ 100 } height={ 50 }>Left 11</Label>
              <Label className='layout-bg6' width={ 100 } height={ 50 }>Left 12</Label>
            </HorizontalLayout>
            );
    }
}