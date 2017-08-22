import React, { Component, PropTypes } from 'react'
import Button from '../components/button'
import TreeDemo from './demo.tree'
import ComboDemo from './demo.combo'
import ButtonDemo from './demo.button'
import LabelDemo from './demo.label'
import GridDemo from './demo.gird'
import Toast from '../components/tip/toast/Toast'
import EditorDemo from './demo.editor'
import PagerDemo from './demo.pager'
import Tree from '../components/tree'
//eslint warning 和react warning太多了,先注释了
//import TableDemo from './demo.table'
import range from 'lodash/range'
import './example.less'

import { AbsoluteLayout, CenterLayout, HorizontalCenterLayout, VerticalCenterLayout, HorizontalLayout, HtapeLayout, VtapeLayout, Layout, CardLayout, VerticalLayout, HorizontalAdaptLayout, VerticalAdaptLayout } from '../layout'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            defaultShowKey: '1',
            demos: [
                {
                    id: 1,
                    pid: -1,
                    text: "核心控件"
                },
                {
                    id: 11,
                    pid: 1,
                    text: " 布局"
                }, {
                    id: 112,
                    pid: 11,
                    text: "CenterLayout"
                }, {
                    id: 113,
                    pid: 11,
                    text: "HorizontalCenterLayout"
                },{
                    id: 114,
                    pid: 11,
                    text: "VerticalCenterLayout"
                },
                {
                    id: 2,
                    pid: -1,
                    text: "基础控件"
                }, {
                    id: 21,
                    pid: 2,
                    text: "button",
                    value:'ButtonDemo'
                }, {
                    id: 22,
                    pid: 2,
                    text: "label"
                }, {
                    id: 23,
                    pid: 2,
                    text: "toast"
                }
            ]
        }
    }

    static defaultProps = {}

    changeCard = (key) => {
        this.setState({
            defaultShowKey: key
        })
    }

    handleTreeEvent = (args) => {
        console.log(args)
        console.log(this.refs[args.value])
        this.changeCard(args.value)
    }

    render() {
        const { ...props } = this.props,
            { ...state } = this.state;
        return <HorizontalAdaptLayout style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
            <HorizontalAdaptLayout.Item width={200} scrollx={false} style={{backgroundColor:'#eff1f4'}}>
            <Tree handler={this.handleTreeEvent} nodes={state.demos}></Tree>
            </HorizontalAdaptLayout.Item>
            <HorizontalAdaptLayout.Item>
                <CardLayout className='content' defaultShowKey={state.defaultShowKey} width={900}>
                    <ButtonDemo ref='ButtonDemo' key='ButtonDemo'></ButtonDemo>
                    <LabelDemo key='2'></LabelDemo>
                    <TreeDemo key='3'></TreeDemo>
                    <GridDemo key='4'></GridDemo>
                    <EditorDemo key='5'></EditorDemo>
                    <ComboDemo key='6'></ComboDemo>
                    <PagerDemo key='7'></PagerDemo>
                </CardLayout>
            </HorizontalAdaptLayout.Item>
        </HorizontalAdaptLayout>
    }
}
export default App
