import React, { Component } from 'react'
import { Layout } from '../layout'
import GridLayout from '../layout/grid/GridLayout'
import Row from '../layout/grid/Row'
import Col from '../layout/grid/Col'
import '../layout/grid/GridLayout.less'

export default class GridDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {

      const mockData={
        rows: [{
          cols: [
              <div>1</div>, <div>2</div>, <div>3</div>
          ]
      }, {
          cols: [<div>4</div>, <div>5</div>, <div>6</div>]
      }, {
          cols: [<div>7</div>, <div>8</div>, <div>9</div>]
      }]
      }



        return <Layout hgap={ 20 }>
                 第一种用法是直接用 &lt;Row&gt; 搭配 &lt;Col&gt; 展示内容
                 <Row>
                   <Col grow={ 1 }>1</Col>
                   <Col grow={ 1 }>2</Col>
                 </Row>
                 <Row>
                   <Col grow={ 1 }>
                   <Layout>3</Layout>
                   </Col>
                   <Col grow={ 2 }>
                   <Layout>4</Layout>
                   </Col>
                   <Col grow={ 8 }>
                   <Layout>5</Layout>
                   </Col>
                 </Row>
                 <br/> 另一种用法是通过 items 属性根据所得数据生成
                 <GridLayout items={mockData}></GridLayout>
               </Layout>
    }
}