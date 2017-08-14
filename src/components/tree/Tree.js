import React, { Component } from 'react'
import { Layout } from '../../layout'
import Label from '../label'

export default class Tree extends Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        nodes: [
            {
                id: 1,
                pid: 0,
                text: "顶级节点"
            },
            {
                id: 2,
                pid: 1,
                text: "一级节点1"
            },
            {
                id: 4,
                pid: 2,
                text: "1节点下的1"
            },
            {
                id: 5,
                pid: 2,
                text: "1节点下的2"
            },
            {
                id: 6,
                pid: 3,
                text: "2级节点1"
            },
            {
                id: 3,
                pid: 1,
                text: "一级节点2"
            }
        ]
    }

    //递归生成树
    loadTree = (pid, level) => {
        let children = []
        let hasChldren = false
        let nodes = this.props.nodes
        let index = -1
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === pid) {
                index = i
            }
            if (nodes[i].pid === pid) {
                children.push(this.loadTree(nodes[i].id, level + 1))
            }
        }
        let levelBlank = ""
        for (level--; level >= 0; level--) {
            levelBlank += '--'
        }
        let thisContent = ""
        if (index >= 0) {
            thisContent = nodes[index].text
        }
        hasChldren = children.length > 0 ? true : false
        if (hasChldren) {
            let _self = <Layout id={ "parent" + pid }>
                          <Label textAlign='left'>
                            { levelBlank }
                            { thisContent }
                          </Label>
                          { children }
                        </Layout>
            return _self
        } else {
            let _self = <Label textAlign='left' id={ "parent" + pid }>
                          { levelBlank }
                          { thisContent }
                          { children.length > 0 ? children : "" }
                        </Label>;
            return _self
        }

    }

    render() {
        return <Layout>
                 { this.loadTree(1, 0) }
               </Layout>
    }
}
