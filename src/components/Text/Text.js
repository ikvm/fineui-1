import React, { Component } from 'react'
import { Layout } from '../../layout'
import cn from 'classnames'

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

    render() {
        const {className, text, py, keyword, highLight, ...props} = this.props
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
            temp = <Layout className={ cn(className, {
                        highLight: highLight
                    }) } { ...props }>
                     { this.props.children }
                   </Layout>
        }
        return temp
    }
}


export default Text