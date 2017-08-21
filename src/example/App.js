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
//eslint warning 和react warning太多了,先注释了
//import TableDemo from './demo.table'
import range from 'lodash/range'
import './example.less'

import { AbsoluteLayout, CenterLayout, HorizontalCenterLayout, VerticalCenterLayout, HorizontalLayout, HtapeLayout, VtapeLayout, Layout, CardLayout, VerticalLayout, HorizontalAdaptLayout, VerticalAdaptLayout } from '../layout'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            defaultShowKey: '1'
        }
    }

    static defaultProps = {}

    changeCard = (key) => {
        this.setState({
            defaultShowKey: key
        })
    }

    render() {
        const { ...props } = this.props,
            { ...state } = this.state;
        return <VerticalLayout>

            <CenterLayout className='header' height={60} bgap={10}>
                <Button hgap={5} handler={() => this.changeCard('1')}>ButtonDemo</Button>
                <Button hgap={5} handler={() => this.changeCard('2')}>LabelDemo</Button>
                <Button hgap={5} handler={() => this.changeCard('3')}>TreeDemo</Button>
                <Button hgap={5} handler={() => this.changeCard('4')}>GridDemo</Button>
                <Button hgap={5} handler={() => Toast.show('这是一个 toast,持续3秒')}>Toast</Button>
                <Button hgap={5} handler={() => this.changeCard('5')}>Input and Editor</Button>
                <Button hgap={5} handler={() => this.changeCard('6')}>ComboDemo</Button>
                <Button hgap={5} handler={() => this.changeCard('7')}>PagerDemo</Button>

            </CenterLayout>
            <CardLayout className='content' defaultShowKey={state.defaultShowKey}>
                <ButtonDemo key='1'></ButtonDemo>
                <LabelDemo key='2'></LabelDemo>
                <TreeDemo key='3'></TreeDemo>
                <GridDemo key='4'></GridDemo>

                <EditorDemo key='5'></EditorDemo>
                <ComboDemo key='6'></ComboDemo>
                <PagerDemo key='7'></PagerDemo>
            </CardLayout>
        </VerticalLayout>
    }
}
export default App
