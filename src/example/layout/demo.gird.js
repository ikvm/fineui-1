import React, { Component } from 'react'
import { Layout } from '../../layout'
import GridLayout from '../../layout/grid/GridLayout.js'
import Row from '../../layout/grid/Row'
import Col from '../../layout/grid/Col'
import Label from '../../components/label'
import '../../layout/grid/GridLayout.less'

export default class GridDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {

        const mockData = {
            rows: 2,
            columns: 3,
            items: [
                {
                    row: 0,
                    column: 0,
                    el: <Label>1</Label>
                }, {
                    row: 0,
                    column: 1,
                    el: <Label>2</Label>
                }, {
                    row: 1,
                    column: 0,
                    el: <Label>4</Label>
                }, {
                    row: 1,
                    column: 1,
                    el: <Label>5</Label>
                }, {
                    row: 1,
                    column: 2,
                    el: <Label>6</Label>
                }
            ]
        }



        return <Layout hgap={20}>
            第一种用法是直接用 &lt;Row&gt; 搭配 &lt;Col&gt; 展示内容
                 <Row>
                <Col grow={1}>0</Col>
                <Col grow={1}>1</Col>
                <Col grow={1}>2</Col>
            </Row>
            <Row>
                <Col grow={1}>
                    <Layout>3</Layout>
                </Col>
                <Col grow={1}>
                    <Layout>4</Layout>
                </Col>
                <Col grow={1}>
                    <Layout>5</Layout>
                </Col>
            </Row>
            <br /> 另一种用法是通过 items 属性根据所得数据生成
                 <GridLayout {...mockData}></GridLayout>
            mmp,网格线对不齐,待研究
        </Layout>
    }
}