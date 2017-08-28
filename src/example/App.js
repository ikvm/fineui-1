import React, { Component, PropTypes } from 'react'
import Button from '../components/button'
import TreeDemo from './demo.tree'
import ComboDemo from './demo.combo'
import ButtonDemo from './demo.button'
import LabelDemo from './demo.label'
import GridDemo from './Layout/demo.gird'
import EditorDemo from './demo.editor'
import PagerDemo from './demo.pager'
import Tree from '../components/tree'
import CenterLayoutDemo from './Layout/demo.centerLayout'
import HorizontalCenterLayoutDemo from './layout/demo.horizontalCenterLayout'
import VerticalCenterLayoutDemo from './layout/demo.verticalCenterLayout'
import HorizontalAdaptLayoutDemo from './layout/demo.horizontalAdaptLayout'
import VerticalAdaptLayoutDemo from './layout/demo.verticalAdaptLayout'
import VtapeLayoutDemo from './layout/demo.vtapelayout'
import HtapeLayoutDemo from './layout/demo.htapelayout'
import LeftLayoutDemo from './layout/demo.leftLayout'
import RightLayoutDemo from './layout/demo.rightLayout'
import TipsDemo from './demo.tips.js'
import InputDemo from './demo.input'
//eslint warning 和react warning太多了,先注释了
//import TableDemo from './demo.table'
import range from 'lodash/range'
import './example.less'


import DownListDemo from './demo.downlist'

import demos from './config/config'

import { AbsoluteLayout, CenterLayout, HorizontalCenterLayout, VerticalCenterLayout, HorizontalLayout, HtapeLayout, VtapeLayout, Layout, CardLayout, VerticalLayout, HorizontalAdaptLayout, VerticalAdaptLayout } from '../layout'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            defaultShowKey: 'RightLayoutDemo',
            demos: demos
        }
    }

    static defaultProps = {}

    changeCard = (key) => {
        this.setState({
            defaultShowKey: key
        })
    }

    handleTreeEvent = (args) => {
        if (args.value) {
            this.changeCard(args.value)
        }
    }

    render() {
        const { ...props } = this.props,
            { ...state } = this.state;
        return <HorizontalAdaptLayout style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
            <HorizontalAdaptLayout.Item width={200} height={'100%'} scrollx={false} style={{ borderRight: ' 1px solid #eff1f4' }}>
                <Tree handler={this.handleTreeEvent} nodes={state.demos}></Tree>
            </HorizontalAdaptLayout.Item>
            <HorizontalAdaptLayout.Item scrolly={true} height={'100%'}>
                <CardLayout  defaultShowKey={state.defaultShowKey}>
                    <ButtonDemo key='ButtonDemo'></ButtonDemo>
                    <LabelDemo key='LabelDemo'></LabelDemo>
                    <TreeDemo key='TreeDemo'></TreeDemo>
                    <GridDemo key='GridLayoutDemo'></GridDemo>
                    <EditorDemo key='EditorDemo'></EditorDemo>
                    <ComboDemo key='ComboDemo'></ComboDemo>
                    <PagerDemo key='PagerDemo'></PagerDemo>
                    <CenterLayoutDemo key='CenterLayoutDemo'></CenterLayoutDemo>
                    <HorizontalCenterLayoutDemo key='HorizontalCenterLayoutDemo'></HorizontalCenterLayoutDemo>
                    <VerticalCenterLayoutDemo key='VerticalCenterLayoutDemo'></VerticalCenterLayoutDemo>
                    <HorizontalAdaptLayoutDemo key='HorizontalAdaptLayoutDemo'></HorizontalAdaptLayoutDemo>
                    <VerticalAdaptLayoutDemo key='VerticalAdaptLayoutDemo'></VerticalAdaptLayoutDemo>
                    <VtapeLayoutDemo key="VtapeLayoutDemo"></VtapeLayoutDemo>
                    <HtapeLayoutDemo key="HtapeLayoutDemo"></HtapeLayoutDemo>
                    <LeftLayoutDemo key="LeftLayoutDemo"></LeftLayoutDemo>
                    <RightLayoutDemo key="RightLayoutDemo"></RightLayoutDemo>
                    <TipsDemo key='TipsDemo'></TipsDemo>
                    <InputDemo key='InputDemo'></InputDemo>
                    <DownListDemo key='DownListDemo'></DownListDemo>
                </CardLayout>
            </HorizontalAdaptLayout.Item>
        </HorizontalAdaptLayout>
    }
}
export default App
