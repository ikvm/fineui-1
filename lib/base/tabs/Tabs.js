import React, { Component } from 'react'
import Button from '../single/button'
import ButtonView from '../single/buttonView'
import find from 'lodash/find'
import { Layout, HorizontalLayout, VtapeLayout } from '../../core/layout'
import cn from 'classnames'

const CLASS_NAME = 'bi-tabs'

class TabList extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handler = (key) => {
        console.log('key', key)
        this.props.changeHadler(key)
    }

    render() {

        const {className, tabList, changeHadler} = this.props

        return (
            <HorizontalLayout className={ className } height={ 200 }>
              { tabList.map((value) => {
                    return <Tab key={ value.key } handler={ this.handler.bind(null, value.key) }>
                             { value.tab }
                           </Tab>
                }) }
            </HorizontalLayout>
        )
    }
}

class Tab extends Component {
    constructor(props, context) {
        super(props, context)
    }


    handleTabClick = () => {
        this.props.handler()
    }

    render() {

        const {className, tab, ...props} = this.props

        return <ButtonView className='bi-tabs-tab' handler={ this.handleTabClick } width={ 50 } height={ 30 }>
                 { this.props.children }
               </ButtonView>
    }

}



export default class Tabs extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            activeKey: this.props.defaultActiveKey
        }
    }

    static defaultProps = {
        defaultActiveKey: '', //初始显示 key
        onChange: () => {
        } //变化后回调
    }

    handleChange = (key) => {
        this.setState({
            activeKey: key
        })
        this.props.onChange()
    }

    render() {
        const {children, className, activeKey, defaultActiveKey, onChange, ...props} = this.props
        let tabList = React.Children.map(children, (child, index) => {
            return {
                tab: child.props.tab,
                key: child.key
            }
        })

        let tabContent = find(children, (child) => {
            return child.key === this.state.activeKey
        })
        return (
            <VtapeLayout className={ cn(className, CLASS_NAME) }>
              <VtapeLayout.Item height={ 32 }>
                <TabList className='bi-tabs-list' tabList={ tabList } changeHadler={ this.handleChange }></TabList>
              </VtapeLayout.Item>
              <VtapeLayout.Item>
                <Layout className='bi-tabs-content'>
                  { tabContent }
                </Layout>
              </VtapeLayout.Item>
            </VtapeLayout>
        )
    }
}

//<TabPane tab='abc' key='1'>content of tabpane</TabPane>
class TabPane extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {className, tab, ...props} = this.props
        return (
            <Layout className={ cn(className) }>
              { this.props.children }
            </Layout>
        )
    }

}

Tabs.TabPane = TabPane