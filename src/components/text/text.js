import React, { Component } from 'react'
import { Layout } from '../../layout'

//先用这个假装一个图标
class Text extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redMark: false,
            highLight: false
        }
    }

    static defaultProps = {
        text: '',
        py: '',
        keyword: ''
    }

    render() {
        const {text, py, keyword, ...props} = this.props
        let temp = null
        if (keyword !== '') {
            let a = this.props.children.split(keyword)
            let result = []
            let red = <span style={ { color: 'red' } }>{ keyword }</span>
            a.forEach((e) => {
                result.push(e, red)
            })
            result.pop()
            temp = <Layout { ...props }>
                     { [...result] }
                   </Layout>
        } else {
            temp = <Layout { ...props }>
                     { this.props.children }
                   </Layout>
        }
        return temp
    }
}


export default Text