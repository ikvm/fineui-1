import React, { Component } from 'react'
import {Layout} from '../../layout'

//先用这个假装一个图标
class Text extends Component {
    constructor(props) {
        super(props)
        this.state={
            redMark:false,
            highLight:false
        }
    }


    //need todo: 检索功能,也就是给文字区域局部文字标红
    doRedMark=()=>{
        this.setState({
            redMark:true
        })
    }
    unRedMark=()=>{
        this.setState({
            redMark:false
        })
    }

    doHighLight=()=>{
        this.setState({
            highLight:true
        })
    }
    unHighLight=()=>{
        this.setState({
            highLight: false
        })
    }

    render() {
        const {style,...props}=this.props
        let styleObj={
            ...props,
            ...style, //从外部传进来的 style 放在后边会自动覆盖前面重复的
            color:this.state.redMark?'red':this.state.highLight?'#3f8ce8':''
        }
        return <Layout style={styleObj} {...props}> { this.props.children } </Layout>
    }
}

Text.defaultProps = {
    color: '',//字体颜色
    fontFamily: '"Microsoft YaHei", "Hiragino Sans GB W3"',//字体名称
    fontSize: 'inherit',//字体大小
    fontStyle: 'normal',//字体风格(normal,italic)
    fontWeight: 'normal',//字体粗细权重("normal", 'bold', '100', '200', '300', '400', '500','600', '700', '800', '900')
    textShadow: 'none',//设置阴影效果'h-shadow v-shadow blur color' 默认 none
    letterSpacing: 'normal',//字符间距
    lineHeight: 'normal',//行高
    textAlign: 'inherit',//文本对其方式("auto",'left', 'right', 'center', 'justify')
    textDecorationLine: 'none',//横线位置 ("none", 'underline', 'line-through', 'underlineline-through')
    textDecorationStyle: 'solid'//线的风格("solid", 'double', 'dotted','dashed')
}

export default Text