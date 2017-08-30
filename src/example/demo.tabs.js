import React, { Component } from 'react'
import Tabs from '../components/tabs'
import { VerticalLayout } from '../layout'

const TabPane = Tabs.TabPane

export default class TabsDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {

        return <VerticalLayout height={ 200 } width={ 300 }>
                 <Tabs defaultActiveKey='1' onChange={ () => {
                                                           console.log('回调触发')
                                                       } }>
                   <TabPane tab='1' key='1'>Tab 1</TabPane>
                   <TabPane tab='2' key='2'>Tab 2</TabPane>
                   <TabPane tab='3' key='3'>Tab 3</TabPane>
                 </Tabs>
               </VerticalLayout>
    }
}