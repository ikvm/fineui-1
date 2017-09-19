import React, { Component } from 'react'
import Tree from '../src/components/tree'
import { HorizontalLayout } from '../src/core/layout'

export default class TreeDemo extends Component {



    handler = (args) => {
    }

    mockData = () => {
        return [{
            id: 1,
            pid: -1,
            text: "一级节点1"
        },
            {
                id: 11,
                pid: 1,
                text: "二级节点1"
            }, {
                id: 111,
                pid: 11,
                text: "三级节点1"
            }, {
                id: 1111,
                pid: 111,
                text: "四级节点1"
            },
            {
                id: 2,
                pid: -1,
                text: "一级节点2"
            }, {
                id: 21,
                pid: 2,
                text: "二级节点2",
                value: '有'
            }, {
                id: 3,
                text: "一级节点3"
            }, {
                id: 31,
                pid: 3,
                text: "二级节点3"
            }, {
                id: 4,
                text: "一级节点4"
            }]
    }

    render() {
        return <HorizontalLayout hgap={ 300 } style={ { backgroundColor: 'rgb(239, 241, 244)' } }>
                 <Tree handler={ this.handler } nodes={ this.mockData() }></Tree>
               </HorizontalLayout>
    }
}