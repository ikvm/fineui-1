/**
属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
level | 设置按钮类型，可选值为 'common' 'success' 'warning' 'ignore' | string | -
icon | 设置按钮的图标类型 | string | -
shape | 设置按钮形状，可选值为 'circle' 或者不设 | string | -
onClick | 'click' 事件的 handler | function | -
disabled | 设置组件是否可用 | boolbean | false
clear | 清楚背景和边框 | boolbean | false
 */

import React from 'react'
import './style/index.less'
import classNames from 'classnames'
import Icon from '../icon'
import Text from '../text'
import HorizontalLayout from '/Users/liurongxin/dailer/FineReact/src/layout/AbsoluteLayout.js'
export const ButonLevel = 'common' || 'success' || 'warning' || 'ignore'
export const Trigger = 'lclick' || 'mousedown' || 'dblclick' || 'mouseup'


export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleClick = (e) => {
        e.stopPropagation();
        const { disabled, handler } = this.props
        if (!disabled && handler) {
            handler()
            console.log("点击事件触发")
        } else {
            console.log("点击事件触发,但没有 handler,所以啥也不干")
        }
    }

//设置触发方式,未完待续
    bindEvent = (dom) => {
        const { trigger } = this.props
        switch (trigger) {
            case 'click':
                dom.addEventListener('click', (e) => {
                    e.stopPropagation()
                    console.log('click')
                })
                break
            case 'dblclick':
                dom.addEventListener('dblclick', (e) => {
                    e.stopPropagation()
                    console.log('dblclick')
                })
                break
            case 'mousedown':
                dom.addEventListener('mousedown', (e) => {
                    e.stopPropagation()
                    console.log('mousedown')
                })
                break
            case 'mouseup':
                dom.addEventListener('mouseup', (e) => {
                    e.stopPropagation()
                    console.log('mouseup')
                })
                break
            default:
                break
        }
    }

    render() {

        const { level = ButonLevel, clear = false, className, baseCls, disabled = false } = this.props

        let classes = classNames(className, baseCls, {
            [`${baseCls}-${level}`]: level,
            [`${baseCls}-${level}-clear`]: clear,
            [`${baseCls}-${level}-disabled`]: disabled
        })

        let text = <Text>{this.props.children ? this.props.children : '默认'}</Text>

        return <HorizontalLayout className={classes} ref={this.bindEvent} >
            <div style={{ width: '35px' }}>{this.props.children}</div>
        </HorizontalLayout>
    }
}

Button.defaultProps = {
    baseCls: 'bi-button',
    trigger: "click"
}
