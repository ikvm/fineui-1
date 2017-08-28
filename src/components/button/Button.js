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
import ButtonView from '../buttonView'
import Label from '../label'
import Text from '../text'
import Icon from '../icon'
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
        level: 'common'
    }

    render() {

        const {level, iconCls, clear = false, className, disabled = false, ...props} = this.props
        //控制样式
        let classes = classNames(className, CLASS_NAME, {
            [`${CLASS_NAME}-${level}`]: level,
            [`${CLASS_NAME}-${level}-clear`]: clear,
            [`${CLASS_NAME}-${level}-disabled`]: disabled
        })

        let icon = null
        if (iconCls) {
            icon = <CenterLayout width={ 30 } height={ 30 }>
                     <Icon iconCls={iconCls}></Icon>
                   </CenterLayout>
        }
        return <ButtonView className={ classes } { ...props }>
                 { icon }
                 <Label>
                   { this.props.children }
                 </Label>
               </ButtonView>
    }
}