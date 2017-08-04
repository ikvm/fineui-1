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
import './style/index.css'
import classNames from 'classnames'
import Icon from '../icon'
import Text from '../text'

export const ButonLevel = 'common' || 'success' || 'warning' || 'ignore'



export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleClick = () => {
        const { disabled, handler } = this.props
        if (!disabled && handler) {
            handler()
            console.log("点击事件触发")
        } else {
            console.log("点击事件触发,但没有 handler,所以啥也不干")
        }
    }


    render() {

        const { level = ButonLevel, clear = false, className, baseCls, disabled = false } = this.props

        let classes = classNames(className, baseCls, {
            [`${baseCls}-${level}`]: level,
            [`${baseCls}-${level}-clear`]: clear,
            [`${baseCls}-${level}-disabled`]: disabled
        })


        let text = <span style={{ userSelect: 'none' }}>{this.props.children ? this.props.children : '默认'}</span >

        let text1 = <Text>{this.props.children ? this.props.children : '默认'}</Text>

        return <div className={classes} style={{ minWidth: '90px', height: '28px', margin: "0 5px", padding: '0 5px' }} onClick={this.handleClick} >{Icon}{text1}</div>
    }
}

Button.defaultProps = {
    baseCls: 'bi-button'
}
