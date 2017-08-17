import React from 'react'
import Notification from './Notification'

let newNotification

const notice = (text, duration = 3000) => {

    if (!newNotification) {
        newNotification = Notification.reWrite();
    }
    let notificationInstance = newNotification

    notificationInstance.notice({ text: text, duration: duration })
}

export default {
    show(text, duration) {
        return notice(text, duration)
    },
    hide() {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    }
}