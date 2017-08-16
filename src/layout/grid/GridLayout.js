import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Layout from '../Layout'
import Row from './Row'
import Col from './Col'
import './GridLayout.less'

const CLASS_NAME = 'flex-grid-layout'
const VERTICAL_ALIGN = {
    TOP: '_top',
    MIDDLE: '_middle',
    BOTTOM: '_bottom',
    STRETCH: '_stretch'
}

class GridLayout extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        // scrolly: true,
        verticalAlign: VERTICAL_ALIGN.TOP,
        columns: null,
        rows: null,
        items: { }
    }

    render() {
        const {children, verticalAlign, className, columns, rows, items, ...props} = this.props

        let temp = items.rows.map((value, index) => {
            return <Row key={ index }>
                     { value.cols.map((value, index) => {
                           return <Col key={ index }>
                                  { value }
                                  </Col>
                       }) }
                   </Row>
        })

        return <Layout className={ cn(CLASS_NAME, verticalAlign, className) } {...props}>
                 { temp }
               </Layout>
    }
}
export default GridLayout
