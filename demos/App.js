import React, { Component, PropTypes } from 'react'
import Button from '../src/base/single/button'
import TreeDemo from './demo.tree'
import ComboDemo from './demo.combo'
import ButtonDemo from './demo.button'
import LabelDemo from './demo.label'
import GridDemo from './Layout/demo.gird'
import EditorDemo from './demo.editor'
import PagerDemo from './demo.pager'
import Tree from '../src/components/tree'
import HorizontalLayoutDemo from './layout/demo.horizontalLayout'
import VerticalLayoutDemo from './layout/demo.verticlaLayout'
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
import TabsDemo from './demo.tabs'
import FillLayoutDemo from './layout/demo.fillLayout'


//eslint warning 和react warning太多了,先注释了
//import TableDemo from './demo.table'
import range from 'lodash/range'
import './example.less'


import demos from './config/config'

import { AbsoluteLayout, CenterLayout, HorizontalCenterLayout, VerticalCenterLayout, HorizontalLayout, HtapeLayout, VtapeLayout, Layout, CardLayout, VerticalLayout, HorizontalAdaptLayout, VerticalAdaptLayout } from '../src/core/layout'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            defaultShowKey: 'TipsDemo',
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
        const {...props} = this.props,
            {...state} = this.state;
        return <HtapeLayout style={ { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 } }>
                 <HtapeLayout.Item width={ 200 } scrollx={ false } style={ { borderRight: ' 1px solid #eff1f4' } }>
                   <Tree handler={ this.handleTreeEvent } nodes={ state.demos }></Tree>
                 </HtapeLayout.Item>
                 <HtapeLayout.Item scrolly={ true }>
                   <CardLayout defaultShowKey={ state.defaultShowKey }>
                     <ButtonDemo key='ButtonDemo'></ButtonDemo>
                     <LabelDemo key='LabelDemo'></LabelDemo>
                     <TreeDemo key='TreeDemo'></TreeDemo>
                     { /* <TableDemo key='TableDemo'></TableDemo> */ }
                     <GridDemo key='GridLayoutDemo'></GridDemo>
                     <EditorDemo key='EditorDemo'></EditorDemo>
                     <ComboDemo key='ComboDemo'></ComboDemo>
                     <PagerDemo key='PagerDemo'></PagerDemo>
                     <HorizontalLayoutDemo key='HorizontalLayoutDemo'></HorizontalLayoutDemo>
                     <VerticalLayoutDemo key='VerticalLayoutDemo'></VerticalLayoutDemo>
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
                     <TabsDemo key='TabsDemo'></TabsDemo>
                     <FillLayoutDemo key='FillLayoutDemo'></FillLayoutDemo>
                   </CardLayout>
                 </HtapeLayout.Item>
               </HtapeLayout>
    }
}
export default App
