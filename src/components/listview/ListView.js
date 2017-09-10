import React, { Component } from 'react'
import ButtonView from '../buttonView'
import Label from '../label'
import { VerticalLayout, HorizontalLayout } from '../../layout'
import isArray from 'lodash/isArray'
import forEach from 'lodash/forEach'

export default class ListView extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            temp: null
        }
    }

    static defaultProps = {
        items: [{
            text: "column 8",
            value: 18,
            children: [
                {
                    text: "column 9",
                    value: 19
                }
            ]
        }, {
            text: "column 10",
            value: 20
        }]
    }

    handleMouseOver = () => {
        
    }

    handleMouseLeave = () => {
    }

    generateList = (data) => {
        let vdom = []
        if (isArray(data)) {//如果说是 array 的话,生成一个可以向右伸出的
            let list = []
            forEach(data, (value) => {
                list.push(this.generateList(value))
            })
            vdom.push(<VerticalLayout key={'line'}>{list}</VerticalLayout>)
        } else {//如果是对象的话,生成一行,有 children 的递归
            vdom.push(<HorizontalLayout key={data.value}>
                <ButtonView onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}><Label>{data.text}</Label></ButtonView>
                {data.children?this.generateList(data.children):null}
            </HorizontalLayout>)
        }
        return vdom
    }



    render() {
        const { items } = this.props

        return <VerticalLayout>{this.generateList(items)}</VerticalLayout>
    }
}
