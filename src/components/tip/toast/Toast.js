import React from 'react'
import Notification from '../notification/Notification'

let newNotification

const notice = (content, duration = 3000) => {

    if (!newNotification) {
        newNotification = Notification.reWrite();
    }
    let notificationInstance = newNotification

    notificationInstance.notice({ content: content, duration: duration })
}

export default {
    show(content, duration) {
        return notice(content, duration)
    },
    hide() {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    }
}