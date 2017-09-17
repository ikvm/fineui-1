import React, { Component } from 'react'
import Label from '../../lib/base/single/label'
import { HorizontalAdaptLayout, VerticalLayout } from '../../lib/core/layout'

export default class HorizontalAdaptLayoutDemo extends Component {
  render() {
    return (
      <VerticalLayout>
        <HorizontalAdaptLayout>
          <HorizontalAdaptLayout.Item width={ 150 }>
            <Label className='layout-bg1' height={ 50 }>水平自适应 1</Label>
          </HorizontalAdaptLayout.Item>
          <HorizontalAdaptLayout.Item>
            <Label className='layout-bg2' width={ 150 } height={ 50 }>水平自适应 2</Label>
          </HorizontalAdaptLayout.Item>
          <HorizontalAdaptLayout.Item>
            <Label className='layout-bg3' width={ 150 } height={ 50 }>水平自适应 3</Label>
          </HorizontalAdaptLayout.Item>
          <HorizontalAdaptLayout.Item>
            <Label className='layout-bg4' width={ 150 } height={ 50 }>水平自适应 4</Label>
          </HorizontalAdaptLayout.Item>
          <HorizontalAdaptLayout.Item>
            <Label className='layout-bg5' width={ 150 } height={ 50 }>水平自适应 5</Label>
          </HorizontalAdaptLayout.Item>
        </HorizontalAdaptLayout>
        <HorizontalAdaptLayout vgap={ 20 }>
          <HorizontalAdaptLayout.Item width={ 150 }>
            <Label className='layout-bg1' height={ 50 }>水平自适应 1</Label>
          </HorizontalAdaptLayout.Item>
          <HorizontalAdaptLayout.Item width={ 150 }>
            <Label className='layout-bg2' height={ 50 }>水平自适应 2</Label>
          </HorizontalAdaptLayout.Item>
          <HorizontalAdaptLayout.Item width={ 150 }>
            <Label className='layout-bg3' height={ 50 }>水平自适应 3</Label>
          </HorizontalAdaptLayout.Item>
          <HorizontalAdaptLayout.Item width={ 150 }>
            <Label className='layout-bg4' height={ 50 }>水平自适应 4</Label>
          </HorizontalAdaptLayout.Item>
          <HorizontalAdaptLayout.Item>
            <Label className='layout-bg5' height={ 50 }>水平自适应 fill 5</Label>
          </HorizontalAdaptLayout.Item>
        </HorizontalAdaptLayout>
      </VerticalLayout>
      );
  }
}
