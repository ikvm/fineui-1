import React, { Component } from 'react'
import DownList from '../components/downlist/DownList'
import {Layout} from '../layout'

export default class DownListDemo extends Component {
    render () {
        return (
            <Layout className='layout-bg1' height={200}>
                <DownList></DownList>
            </Layout>
        )
    }
}