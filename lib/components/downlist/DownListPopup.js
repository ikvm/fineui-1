import React, { Component } from 'react'

import IconButton from '../iconbutton'
import { VerticalLayout, HorizontalLayout ,Layout} from '../../layout'
import Label from '../label'
import './DownList.less'

const CLASS_NAME = 'bi-list'


export default class DownListPopup extends Component {
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
            <HorizontalLayout scrollx={false} width={200} height={22} style={styleObj} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} className={CLASS_NAME}>
                <Label className='layout-bg2' width={200}>father</Label>
                <Layout style={sty1} width={200}>{this.props.children}</Layout>
            </HorizontalLayout>
        )
    }
}