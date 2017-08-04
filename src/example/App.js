import React, { Component, PropTypes } from 'react'
import range from 'lodash/range'
import Button from '../components/button'


import {
    CenterLayout,
    HorizontalCenterLayout,
    VerticalCenterLayout,
    HorizontalLayout,
    HtapeLayout,
    VtapeLayout,
    Layout,
    VerticalLayout
} from '../layout'
class Item extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {};

    state = {};

    render() {
        const { ...props } = this.props, { ...state } = this.state;
        return <HtapeLayout style={{ height: 30 }}>
            <HtapeLayout.Item width={200}>
                <Layout>
                    一
                </Layout>
            </HtapeLayout.Item>
            <HtapeLayout.Item>
                <Layout>
                    文字
                </Layout>
            </HtapeLayout.Item>
            <HtapeLayout.Item width={200}>
                <Layout>
                    ->
                </Layout>
            </HtapeLayout.Item>
        </HtapeLayout>
    }
}
class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {};

    state = {};

    render() {
        const { ...props } = this.props, { ...state } = this.state;
        return <HorizontalLayout verticalAlign={HorizontalLayout.VERTICAL_ALIGN.STRETCH}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
            {
                [
                    <Button className="test" handler={() => console.log("handler")}></Button>,
                    <Button className="test" level="common" >common</Button>,
                    <Button className="test" level="success" >success</Button>,
                    <Button className="test" level="warning" >warning</Button>,
                    <Button className="test" level="ignore" >ignore</Button>,
                    <Button className="test" clear={true} level="common" >common clear</Button>,
                    <Button className="test" clear={true} level="success" >success clear</Button>,
                    <Button className="test" clear={true} level="warning" >warning clear</Button>,
                    <Button className="test" clear={true} level="ignore" >ignore clear</Button>,
                    <Button className="tttt" disabled={true}>common disabled</Button>,
                    <Button className="tttt" disabled={true}>success disabled</Button>,
                    <Button className="tttt" disabled={true}>warning disabled</Button>,
                    <Button className="test" level="ignore" disabled={true}>ignore disabled</Button>
                ]
            }
        </HorizontalLayout>
    }
}
export default App
