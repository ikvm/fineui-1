import React, { Component } from 'react'
import classNames from 'classnames'
import { CenterLayout, Layout, HorizontalAdaptLayout, VerticalAdaptLayout, HorizontalCenterLayout, VerticalCenterLayout } from '../../layout'
import Text from '../text'
import isNumber from 'lodash/isNumber'
import every from 'lodash/every'
import './style/index.less'

class Label extends Component {
    constructor(props) {
        super(props)
    }

    _isValid(num) {
        if (isNumber(num) && num > 0) {
            return true
        } else {
            return false
        }
    }

    _createCenterEl() {
        const { baseCls, text, width, textWidth, textAlign, textPosition, height, whiteSpace, textHeight, ...props } = this.props

        if (this._isValid(textWidth)) {//如果设置了文字宽度
            //设置文字宽度的情况下,如果 textAlign 为 left 或者 right,不仅文字排列要变,内层的 layout
            if (whiteSpace === 'normal') {//如果设置 normal,就涉及到换行的问题了,要给包裹文字的布局组件加上 whitespace
                let styleObj = {
                    whiteSpace: 'normal',
                    textAlign: textAlign,
                    lineHeight: textHeight ? `${textHeight}px` : 'normal',
                    border:'1px dotted #cccccc'
                }
                return <CenterLayout className={baseCls} scrolly={true} width={width} height={height} {...props}>
                    <Text ref={(text)=>this.text=text} width={textWidth} style={styleObj}  >{this.props.children ? this.props.children : text}</Text>
                </CenterLayout>
            }
            else {//whitespace 如果是 nowrap,我理解的就是不换行,超出了就三个小点,反正都是只有一行了,让文字垂直居中就好了
                let styleObj = {
                    whiteSpace: 'nowrap',
                    textAlign: textAlign,
                    overflowX: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: textHeight ? `${textHeight}px` : 'normal',
                    border:'1px dotted #cccccc'
                }
                return <CenterLayout className={baseCls} width={width} height={height} {...props}>
                    <Text ref={(text)=>this.text=text} width={textWidth} style={styleObj}  >{this.props.children ? this.props.children : text}</Text>
                </CenterLayout>
            }
        }
        else {//如果没文字宽度的话,那撑满父容器就好了
            if (whiteSpace === 'normal') {
                let styleObj = {
                    whiteSpace: 'normal',
                    textAlign: textAlign,
                    lineHeight: textHeight ? `${textHeight}px` : 'normal'
                }
                return <CenterLayout className={baseCls} width={width} height={height} scrolly={true} {...props}>
                    {/*这里有一个需要注意,因为有不设置宽度,但是又设置了高度的情况,那么肯定需要滚动,但是不知道宽度怎么滚动啊,所以这里width 设为 '100%'*/}
                    <Text ref={(text)=>this.text=text} width={'100%'} style={styleObj}>{this.props.children ? this.props.children : text}</Text>
                </CenterLayout>
            }
            else {//whitespace 如果是 nowrap,那就不换行咯
                //既然用少嵌套了一层 dom,那么要文字垂直居中就只能用 lineheight=height 实现了,用 centerlayout 会出现textoverflow 样式失效的问题
                let styleObj = {
                    whiteSpace: 'nowrap',
                    textAlign: textAlign,
                    overflowX: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: height ? `${height}px` : 'normal',
                    maxWidth:'100%'
                }
                return <Text ref={(text)=>this.text=text} className={baseCls} width={width} height={height} style={styleObj} {...props}>{this.props.children ? this.props.children : text}</Text>
            }
        }
    }


    //todo: 把标红和高亮的逻辑实现到<Text/>中,便于复用
    //already done
    doRedMark=()=>{
        this.text.doRedMark()
    }
    unRedMark=()=>{
        this.text.unRedMark()
    }

    doHighLight=()=>{
        this.text.doHighLight()
    }
    unHighLight=()=>{
      this.text.unHighLight()
    }

    render() {
        // const { className, baseCls, textAlign, height, whiteSpace, ...props } = this.props
        return this._createCenterEl()

    }
}

Label.defaultProps = {
    baseCls: "bi-label",
    textAlign: "center",
    whiteSpace: "nowrap", //normal  or  nowrap
    forceCenter: false, //是否无论如何都要居中, 不考虑超出边界的情况, 在未知宽度和高度时有效
    textWidth: null,
    textHeight: null,
    hgap: 0,
    vgap: 0,
    lgap: 0,
    rgap: 0,
    tgap: 0,
    bgap: 0,
    text: "",
    py: "",
    keyword: ""
}


export default Label