import React, { Component } from 'react'
import Label from '../../components/label'
import {CenterLayout} from '../../layout'

export default class CenterLayoutDemo extends Component {
    render () {
        return (
            <CenterLayout>
                <Label className='layout-bg1' width={100} height={50}>Center 1</Label>
                <Label className='layout-bg2' width={100} height={50}>Center 2</Label>
                <Label className='layout-bg3' width={100} height={50}>Center 3</Label>
                <Label className='layout-bg4' width={100} height={50}>Center 4</Label>
                <Label className='layout-bg5' width={100} height={50}>Center 5</Label>
                <Label className='layout-bg6' width={100} height={50}>Center 6</Label>
            </CenterLayout>
        );
    }
}