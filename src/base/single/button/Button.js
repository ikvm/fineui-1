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
import { CenterLayout } from '../../../core/layout'


const CLASS_NAME = 'fct-button'

const LEVEL = {
    COMMON: 'common',
    SUCCESS: 'success',
    WARNING: 'warning',
    IGNORE: 'ignore'
}


export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        level: LEVEL.COMMON,
        iconWidth: 18,
        iconHeight: 18,
        block: false, //是否块状显示，即不显示边框，没有最小宽度的限制
        clear: false, //是否去掉边框和背景
        textAlign: "center",
        whiteSpace: "nowrap",
        forceCenter: false,
        textWidth: null,
        textHeight: null,
        disabled: false
    }

    render() {

        const {level, iconCls, iconWidth, iconHeight, clear, block, className, textAlign, whiteSpace, forceCenter, textWidth, textHeight, disabled, ...props} = this.props
        //控制样式
        let classes = classNames(className, CLASS_NAME, {
            [`${CLASS_NAME}-${level}`]: level,
            [`${CLASS_NAME}-${level}-clear`]: clear,
            [`${CLASS_NAME}-block`]: block,
            [`${CLASS_NAME}-${level}-disabled`]: disabled,
            [`${iconCls}`]: iconCls
        })

        let icon = null
        if (iconCls) {
            icon = <CenterLayout width={ iconWidth } height={ iconHeight }>
                     <Icon/>
                   </CenterLayout>
        }
        return <ButtonView className={ classes } { ...props }>
                 { icon }
                 <Label textAlign={ textAlign } whiteSpace={ whiteSpace } forceCenter={ forceCenter } textWidth={ textWidth } textHeight={ textHeight }>
                   { this.props.children }
                 </Label>
               </ButtonView>
    }
}


Button.LEVEL = LEVEL
