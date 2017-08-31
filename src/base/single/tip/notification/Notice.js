import React, { Component } from 'react'
import cn from 'classnames'
import Label from '../../label'
import { Layout } from '../../../../core/layout'


const CLASS_NAME = 'bi-notice'

export default class Notice extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        duration: 3000, // Notice显示时间
        text: 'toast', // Notice显示的内容
        onClose: () => {
        } // 显示结束回调
    }

    componentDidMount() {
        if (this.props.duration > 0) {
            this.closeTimer = setTimeout(() => {
                this.close()
            }, this.props.duration)
        }
    }

    clearCloseTimer = () => {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
            this.closeTimer = null
        }
    }

    close = () => {
        this.clearCloseTimer()
        this.props.onClose()
    }

    render() {
        const props = this.props
        return (
            <Layout className={ cn(CLASS_NAME) } vgap={ 10 } style={ { backgroundColor: 'red' } }>
              { this.props.children }
            </Layout>
        )
    }

    componentWillUnmount() {
        // 当有意外关闭的时候 清掉定时器
        this.clearCloseTimer()
    }
}