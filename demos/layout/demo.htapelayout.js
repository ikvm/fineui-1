import React, { Component } from 'react'
import Label from '../../src/base/single/label'
import { HtapeLayout } from '../../src/core/layout'

const Item = HtapeLayout.Item

export default class HtapeLayoutDemo extends Component {
  render() {
    return (
      <HtapeLayout>
        <Item width={ 100 }>
          <Label className='layout-bg1' width={ 100 }>Htape 1</Label>
        </Item>
        <Item width={ 100 }>
          <Label className='layout-bg2' width={ 100 }>Htape 2</Label>
        </Item>
        <Item width={ 100 }>
          <Label className='layout-bg3' width={ 100 }>Htape 3</Label>
        </Item>
        <Item width={ 100 }>
          <Label className='layout-bg4' width={ 100 }>Htape 4</Label>
        </Item>
        <Item width={ 100 }>
          <Label className='layout-bg5' width={ 100 }>Htape 5</Label>
        </Item>
        <Item>
          <Label className='layout-bg6'>Htape fill 6</Label>
        </Item>
      </HtapeLayout>
      );
  }
}