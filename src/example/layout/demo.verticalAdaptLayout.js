import React, { Component } from 'react'
import Label from '../../components/label'
import { VerticalAdaptLayout, VerticalLayout } from '../../layout'

export default class VerticalAdaptLayoutDemo extends Component {
    render() {
        return (
                <VerticalAdaptLayout>
                    <VerticalAdaptLayout.Item ><Label className='layout-bg1' height={30} width={150} >自适应垂直 1</Label></VerticalAdaptLayout.Item>
                    <VerticalAdaptLayout.Item ><Label className='layout-bg2' height={30} width={150} >自适应垂直 2</Label></VerticalAdaptLayout.Item>
                    <VerticalAdaptLayout.Item ><Label className='layout-bg3' height={30} width={150} >自适应垂直 3</Label></VerticalAdaptLayout.Item>
                    <VerticalAdaptLayout.Item ><Label className='layout-bg4' height={30} width={150} >自适应垂直 4</Label></VerticalAdaptLayout.Item>
                    <VerticalAdaptLayout.Item ><Label className='layout-bg5' height={30} width={150} >自适应垂直 5</Label></VerticalAdaptLayout.Item>
                </VerticalAdaptLayout>
        );
    }
}