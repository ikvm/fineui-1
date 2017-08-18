import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import Layout from '../Layout'
import Row from './Row'
import Col from './Col'
import find from 'lodash/find'
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
        columns: 2,
        rows: 3,
        items: []
    }

    render() {
        const { children, verticalAlign, className, columns, rows, items, ...props } = this.props

        let grid = [];
        for (let i = 0; i < rows; i++) {
            let oneRow = []
            for (let j = 0; j < columns; j++) {
                let cell;
                let t = find(items, (v) => { return v.column === j && v.row === i })
                cell = <Col key={`r${i}c${j}`} >
                    {t ? t.el : ''}
                </Col>
                oneRow.push(cell)
            }
            let r = <Row key={`r${i}`}>{oneRow}</Row>
            grid.push(r)
            oneRow = []
        }

        return <Layout className={cn(CLASS_NAME, verticalAlign, className)} {...props}>
            {grid}
        </Layout>
    }
}
export default GridLayout