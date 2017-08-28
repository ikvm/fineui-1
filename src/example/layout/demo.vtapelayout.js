import React, { Component } from 'react'
import Label from '../../components/label'
import {VtapeLayout} from '../../layout'

const Item=VtapeLayout.Item

export default class VtapeLayoutDemo extends Component {
    render () {
        return (
            <VtapeLayout>
                <Item height={50}><Label className='layout-bg1' width={100} >Vtape 1</Label></Item>
               <Item height={50}><Label className='layout-bg2' width={100} >Vtape 2</Label></Item>
                <Item height={50}><Label className='layout-bg3' width={100} >Vtape 3</Label></Item>
                <Item height={50}><Label className='layout-bg4' width={100} >Vtape 4</Label></Item>
                <Item height={50}><Label className='layout-bg5' width={100} >Vtape 5</Label></Item>
                <Item><Label className='layout-bg6' width={100} >Vtape fill 6</Label></Item>
            </VtapeLayout>
        );
    }
}