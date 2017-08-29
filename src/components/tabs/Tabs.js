import React, { Component } from 'react'
import Button from '../button'
import find from 'lodash/find'
import { Layout, HorizontalLayout } from '../../layout'
import cn from 'classnames'



class TabList extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handler = (key) => {
        console.log('key', key)
        this.props.changeHadler(key)
    }



    render() {

        const {tabList, changeHadler} = this.props

        return (
            <HorizontalLayout>
              { tabList.map((value) => {
                    return <Button key={ value.key } handler={ this.handler.bind(null, value.key) }>
                             { value.tab }
                           </Button>
                }) }
            </HorizontalLayout>
        )
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
        const {children, activeKey, defaultActiveKey, onChange, ...props} = this.props
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
            <Layout>
              <TabList tabList={ tabList } changeHadler={ this.handleChange }></TabList>
              <Layout>
                { tabContent }
              </Layout>
            </Layout>
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