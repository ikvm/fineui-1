import React, { Component } from 'react'
import { Layout } from '../layout'
import Pager from '../components/pager'
import '../layout/grid/GridLayout.less'

export default class PagerDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {

        const mockData = {
        }



        return <Layout hgap={200}>
           <Pager pages={18} groups={5}></Pager>
        </Layout>
    }
}