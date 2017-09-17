import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Notice from './Notice'
import find from 'lodash/find'
import { UUID } from '../../../../utils'
import { HorizontalCenterLayout } from '../../../../core/layout'
import './Toast.less'




let div = document.createElement('div');

class Notification extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            notices: []
        }
    }

    add = (notice) => {
        const {notices} = this.state
        const key = notice.key ? notice.key : notice.key = UUID()
        let temp = find(notices, (o) => {
            return o.key === notice.key
        })
        if (!temp) {
            notices.push(notice)
            this.setState({
                notices: notices
            })
        }
    }
    remove = (key) => {
        this.setState((previousState) => {
            return {
                notices: previousState.notices.filter(notice => notice.key !== key)
            }
        })
    }

    createNotices = () => {
        const {notices} = this.state
        let result = []

        notices.map((notice) => {
            // 每个Notice onClose的时候 删除掉notices中对应key的notice
            const closeCallback = () => {
                this.remove(notice.key)
                // 如果有用户传入的onClose 执行
                if (notice.onClose) {
                    notice.onClose()
                }
            }
            result.push(<Notice key={ notice.key } text={ notice.text } duration={ notice.duration } onClose={ closeCallback }>
                          { notice.content }
                        </Notice>)
        })
        return result
    }

    render() {

        const noticesDOM = this.createNotices()

        return <HorizontalCenterLayout className="bi-toast">
                 { noticesDOM }
               </HorizontalCenterLayout>

    }
}



Notification.reWrite = (text) => {
    div = document.createElement('div')
    document.body.appendChild(div)
    const notification = ReactDOM.render(<Notification />, div)

    return {
        notice(noticeProps) {
            notification.add(noticeProps);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
        component: notification
    }
}

export default Notification