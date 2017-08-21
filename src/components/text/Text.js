import React, { Component } from 'react'
import { Layout } from '../../layout'
import cn from 'classnames'
import { isNotEmptyString } from '../../utils'
import makeFirstPy from './chinesePY'

class Text extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redMark: false
        }
    }

    static defaultProps = {
        text: '',
        py: '',
        keyword: '',
        highLight: false
    }


    //need todo:多音字问题
    //done
    render() {
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
            temp = <Layout { ...props }>
                     { [...result] }
                   </Layout>
        } else {
            temp = <Layout className={ cn(className, {
                        'high-light': highLight
                    }) } { ...props }>
                     { this.props.children }
                   </Layout>
        }
        return temp
    }
}

export default Text