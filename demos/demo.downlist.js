import React, { Component } from 'react'
import DownList from '../src/components/downlist/DownList'
import { Layout } from '../src/layout'

export default class DownListDemo extends Component {
    render() {
        return (
            <Layout className='layout-bg1' height={ 200 }>
              <DownList></DownList>
            </Layout>
        )
    }
}