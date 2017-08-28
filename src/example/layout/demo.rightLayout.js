import React, { Component } from 'react'
import Label from '../../components/label'
import RightLayout from '../../layout/flow/RightLayout'

export default class RightLayoutDemo extends Component {
    render () {
        return (
            <RightLayout>
                <Label className='layout-bg1' width={100} height={50}>Right 1</Label>
                <Label className='layout-bg2' width={100} height={50}>Right 2</Label>
                <Label className='layout-bg3' width={100} height={50}>Right 3</Label>
                <Label className='layout-bg4' width={100} height={50}>Right 4</Label>
                <Label className='layout-bg5' width={100} height={50}>Right 5</Label>
                <Label className='layout-bg6' width={100} height={50}>Right 6</Label>
                <Label className='layout-bg1' width={100} height={50}>Right 7</Label>
                <Label className='layout-bg2' width={100} height={50}>Right 8</Label>
                <Label className='layout-bg3' width={100} height={50}>Right 9</Label>
                <Label className='layout-bg4' width={100} height={50}>Right 10</Label>
                <Label className='layout-bg5' width={100} height={50}>Right 11</Label>
                <Label className='layout-bg6' width={100} height={50}>Right 12</Label>
            </RightLayout>
        );
    }
}