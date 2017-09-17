import React, { Component } from 'react'
import { Layout } from '../../../core/layout'
import Single from '../Single'
import cn from 'classnames'
import  isNumber from  'lodash/isNumber'
import makeFirstPy from './chinesePY'


const CLASS_NAME = 'fct-text'

class Text extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redMark: false
        }
    }

    static defaultProps = {
        textAlign: "left",
        whiteSpace: "normal",
        lineHeight: null,
        handler: null,//如果传入handler,表示处理文字的点击事件，不是区域的
        text: "",
        py: "",
        highLight:false
    }

    //need todo:标红和高亮
    _redMark=()=>{
        const {className, text, py, keyword, highLight, ...props} = this.props
        let temp = null
        let makeTag = (res) => {
            return <span className='keyword-red-mark'>{ res }</span>
        }
        if (keyword !== '') {
            let text = this.props.children + '' || text
            let a = text.split(keyword)
            let result = []
            if (a.length > 1) {
                //匹配到文字
                let red = <span className='keyword-red-mark'>{ keyword }</span>
                a.forEach((e) => {
                    result.push(e, makeTag(keyword))
                })
                result.pop()
            } else {
                //改用拼音方式
                let py = makeFirstPy(text)
                py = py.slice(0, text.length)
                console.log(py)
                let keywordLength = keyword.length
                let fromIndex = 0
                while (true) {
                    let tindex = py.indexOf(keyword, fromIndex) //先找到第一个匹配的 index
                    if (tindex < 0) { //如果找不到了就跳出,别忘了把剩余的部分放到结果数组里
                        result.push(text.substr(fromIndex))
                        break
                    }
                    result.push(text.substr(fromIndex, tindex - fromIndex)) //然后把index 前的那一部分放到结果数组里
                    let res = text.substr(tindex, keywordLength) //然后取出匹配到的关键字
                    result.push(makeTag(res)) //然后生成标红节点放到结果数组里
                    fromIndex = tindex + keywordLength //然后重置起始 index
                }
            }
            temp = <Single { ...props }>
                { [...result] }
            </Single>
        } else {
            temp = <Single className={ cn(CLASS_NAME, className, {
                'high-light': highLight
            }) } { ...props }>
                { this.props.children }
            </Single>
        }
        return temp
    }


    render() {
        const {className,textAlign,whiteSpace,lineHeight,text,py,keyword,highLight,handler,...props}=this.props

        const styleObj={
            textAlign:textAlign,
            whiteSpace:whiteSpace,
            ...(isNumber(lineHeight)&&{lineHeight:lineHeight+'px'}),
            display: 'block' //flex里面做文本超出截取真是mmp,浪费了我一上午时间.,
        }
        return <Single className={cn(className,CLASS_NAME)} style={styleObj} {...props}>
            {this.props.children !== undefined ? this.props.children : text}
        </Single>
    }
}

export default Text
