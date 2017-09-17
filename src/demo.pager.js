import React, { Component } from 'react'
import { Layout } from '../lib/core/layout'
import Pager from '../lib/base/pager'

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
