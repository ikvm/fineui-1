import React, { Component } from 'react'

import IconButton from '../iconbutton'
import { VerticalLayout, HorizontalLayout } from '../../layout'
import Label from '../label'
import DownListPopup from './DownListPopup'
import './DownList.less'


const CLASS_NAME = 'bi-list'


export default class DownList extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            showChild: false
        }
    }

    static defaultProps = {
        height: 25,
        items: [],
        adjustLength: 0,
        direction: "bottom",
        trigger: "click"
    }


    handleMouseOver = () => {
        this.setState({
            showChild: true
        })
    }

    handleMouseLeave = () => {
        this.setState({
            showChild: false
        })
    }

    render() {
        const { height, items, adjustLength, direction, trigger, el, ...props } = this.props
        const { showChild } = this.state
        let styleObj = {
            overflowX: 'visible'
        }


        let sty1 = {
            display: showChild ? '' : 'none'
        }
        return (
            <VerticalLayout>
                <DownListPopup>
                    <DownListPopup>
                        <DownListPopup>
                            <Label className='layout-bg3' width={200}>child</Label>
                            <Label className='layout-bg3' width={200}>child</Label>
                            <Label className='layout-bg3' width={200}>child</Label>
                        </DownListPopup>
                    </DownListPopup>
                </DownListPopup>
                <DownListPopup>
                    <DownListPopup>
                        <Label className='layout-bg3' width={200}>child</Label>
                        <Label className='layout-bg3' width={200}>child</Label>
                    </DownListPopup>
                </DownListPopup>
            </VerticalLayout>
        )
    }
}


{/* <Label className='layout-bg3' width={200}>child</Label><Label className='layout-bg3' width={200}>child</Label> */ }