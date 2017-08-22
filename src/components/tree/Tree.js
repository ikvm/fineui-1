import React, { Component } from 'react'
import { Layout, VerticalLayout } from '../../layout'
import Label from '../label'
import TreeView from './TreeView'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import some from 'lodash/some'
import uniq from 'lodash/uniq'
import find from 'lodash/find'
import { UUID } from '../../utils'

export default class Tree extends Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        nodes: []
    }

    handler = (pid) => {
        let target = find(this.props.nodes, (value) => {
            return value.id === pid
        })
        this.props.handler(target)
    }

    initTree = (pid, depth) => {
        const nodes = this.props.nodes
        let childrenNode = []
        let current = null
        forEach(nodes, (value) => {
            if (value.id === pid) {
                current = value
            }
            if (value.pid === pid) {//找到属于 pid 的子孙,递归向下生成
                this.counter++
                childrenNode.push(this.initTree(value.id, depth + 1))
            }
        })

        let itemClicked = () => {
            this.handler(pid)
        }

        let content = ''
        if (current) {
            content = current.text
        }
        return <TreeView key={UUID()} nodeLabel={content} depth={depth} handler={itemClicked} open={(current && current.open === false) ? false : true} >
            {childrenNode.length > 0 ? childrenNode : null}
        </TreeView>
    }

    render() {

        const data = this.props.nodes
        //找到所有根节点,没 pid 的(设为-1)或者有 pid 但找不到 id===pid的节点,其实最好是强制根节点必须设 pid=-1,这样很方便
        forEach(data, (value) => {
            if (!value.pid) {
                value.pid = -1
            }
        })
        let rootArry = filter(data, (value) => {
            return !some(data, (item) => item.id === value.pid)
        })
        //提取公共 pid并去重
        let root = uniq(rootArry.map(((value) => {
            return value.pid
        })))

        return <VerticalLayout>
            {root.map((value) => {
                return this.initTree(value, 0)
            })}
        </VerticalLayout>
    }
}
