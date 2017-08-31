import React, { Component } from 'react'
import { Layout } from '../src/layout'
import Pager from '../src/components/pager'
import '../src/layout/grid/GridLayout.less'

export default class PagerDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {

        const mockData = {
        }



        return <Layout hgap={ 200 } vgap={ 100 }>
                 <Pager pages={ 18 } groups={ 5 }></Pager>
               </Layout>
    }
}