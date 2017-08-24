/**
 * Created by GUY on 2017/8/15.
 * 基础 button,一个可点击组件
 */

import React from 'react'
import cn from 'classnames'
import Icon from '../icon'
import Text from '../text'
import { CenterLayout } from '../../layout'
export const ButonLevel = 'common' || 'success' || 'warning' || 'ignore'
export const Trigger = 'click' || 'mousedown' || 'dbclick' || 'mouseup'


const CLASS_NAME = 'bi-button-view'

export default class ButtonView extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
    }

    static defaultProps = {
        stopPropagation: false,
        trigger: "click",
        handler: () => {
        }
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
        if (this.props.stopPropagation) {
            e.stopPropagation()
        }
        console.log('click')
        const { disabled, handler } = this.props
        if (!disabled && handler) {
            handler()
        } else {
            console.log("点击事件触发,但没有 handler,所以啥也不干")
        }
    }
    handleDoubleClick = (e) => {
        if (this.props.stopPropagation) {
            e.stopPropagation()
        }
        this.props.handler()
        console.log('dbclick')
    }
    handleMouseDown = (e) => {
        if (this.props.stopPropagation) {
            e.stopPropagation()
        }
        this.props.handler()
        console.log('mousedown')
    }
    handleMouseUp = (e) => {
        if (this.props.stopPropagation) {
            e.stopPropagation()
        }
        this.props.handler()
        console.log('mouseup')
    }


    render() {

        const { handler, trigger, className, ...props } = this.props

        return <CenterLayout className={cn(CLASS_NAME, className)} {...this._bindEvent(trigger) } { ...props }>
            {this.props.children}
        </CenterLayout>
    }
}