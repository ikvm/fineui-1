import React, { Component } from 'react'
import Label from '../../components/label'
import { VerticalAdaptLayout, VerticalLayout } from '../../layout'

export default class VerticalAdaptLayoutDemo extends Component {
    render() {
        return (
                <VerticalAdaptLayout>
                    <VerticalAdaptLayout.Item height={50}><Label className='layout-bg1' width={150} >自适应垂直居中 1</Label></VerticalAdaptLayout.Item>
                    <VerticalAdaptLayout.Item height={50}><Label className='layout-bg2' width={150} >自适应垂直居中 2</Label></VerticalAdaptLayout.Item>
                    <VerticalAdaptLayout.Item height={50}><Label className='layout-bg3' width={150} >自适应垂直居中 3</Label></VerticalAdaptLayout.Item>
                    <VerticalAdaptLayout.Item height={50}><Label className='layout-bg4' width={150} >自适应垂直居中 4</Label></VerticalAdaptLayout.Item>
                    <VerticalAdaptLayout.Item height={50}><Label className='layout-bg5' width={150} >自适应垂直居中 5</Label></VerticalAdaptLayout.Item>
                </VerticalAdaptLayout>
        );
    }
}