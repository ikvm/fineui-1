import React, { Component } from 'react'
import { Layout } from '../../src/layout'
import GridLayout from '../../src/layout/grid/GridLayout.js'
import Row from '../../src/layout/grid/Row'
import Col from '../../src/layout/grid/Col'
import Label from '../../src/components/label'
import '../../src/layout/grid/GridLayout.less'

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
                    el: <Label className='layout-bg1'>1</Label>
                }, {
                    row: 0,
                    column: 1,
                    el: <Label className='layout-bg2'>2</Label>
                }, {
                    row: 1,
                    column: 0,
                    el: <Label className='layout-bg3'>4</Label>
                }, {
                    row: 1,
                    column: 1,
                    el: <Label className='layout-bg4'>5</Label>
                }, {
                    row: 1,
                    column: 2,
                    el: <Label className='layout-bg5'>7</Label>
                }
            ]
        }



        return <GridLayout className='demo-border' rows={ 3 } columns={ 4 } vgap={ 20 } hgap={ 20 }>
                 <Row className='demo-border'>
                   <GridLayout rows={ 3 } columns={ 4 }>
                     <Row row={ 1 }>
                       <Col className='layout-bg1'>0</Col>
                       <Col className='layout-bg2'>1</Col>
                     </Row>
                     <Row>
                       <Col className='layout-bg3'>4</Col>
                       <Col className='layout-bg4'>1</Col>
                       <Col className='layout-bg5'>2</Col>
                     </Row>
                   </GridLayout>
                 </Row>
                 <Row className='demo-border'>
                   <GridLayout {...mockData}>
                   </GridLayout>
                 </Row>
               </GridLayout>
    }
}

