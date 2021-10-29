/* eslint-disable */
import React from 'react'
import { useSelector } from 'react-redux'

const NotificationRedux = () => {
    const notification = useSelector(store => store)
    return(
        <div>
            {notification === null ? '' : <div className={notification.style}> {notification.message}</div>}
        </div>
      )
    }

export default NotificationRedux