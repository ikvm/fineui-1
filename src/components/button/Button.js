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
import classNames from 'classnames'
import Icon from '../icon'
import Text from '../text'
import { CenterLayout } from '../../layout'
export const ButonLevel = 'common' || 'success' || 'warning' || 'ignore'
export const Trigger = 'click' || 'mousedown' || 'dbclick' || 'mouseup'


const CLASS_NAME = 'bi-button'

export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        trigger: "click"
    }

    //设置触发方式
    _bindEvent = (trigger) => {
        let bindEvent = {}
        let triggerArr = (trigger || '').split(',')
        triggerArr.forEach((t, index) => {
            switch (t) {
                case 'click':
                    bindEvent.onClick = this.handleClick
                    break
                case 'dbclick':
                    bindEvent.onDoubleClick = this.handleDoubleClick
                    break
                case 'mousedown':
                    bindEvent.onMouseDown = this.handleMouseDown
                    break
                case 'mouseup':
                    bindEvent.onMouseUp = this.handleMouseUp
                    break
                default:
                    bindEvent.onClick = this.handleClick
            }
        })
        return bindEvent
    }


    handleClick = (e) => {
        e.stopPropagation();
        const {disabled, handler} = this.props
        if (!disabled && handler) {
            handler()
        } else {
            console.log("点击事件触发,但没有 handler,所以啥也不干")
        }
    }
    handleDoubleClick = (e) => {
        console.log('dbclick')
    }
    handleMouseDown = (e) => {
        console.log('mousedown')
    }
    handleMouseUp = (e) => {
        console.log('mouseup')
    }


    render() {

        const {level = ButonLevel, handler, iconCls, trigger, clear = false, className, disabled = false, ...props} = this.props
        //控制样式
        let classes = classNames(className, CLASS_NAME, {
            [`${CLASS_NAME}-${level}`]: level,
            [`${CLASS_NAME}-${level}-clear`]: clear,
            [`${CLASS_NAME}-${level}-disabled`]: disabled
        })

        let icon = null
        if (iconCls) {
            icon = <CenterLayout width={ 30 } height={ 30 }>
                     <Icon></Icon>
                   </CenterLayout>
        }
        return <CenterLayout className={ classes } scrollable={ false } {...this._bindEvent(trigger)} { ...props }>
                 { icon }
                 { this.props.children }
               </CenterLayout>
    }
}