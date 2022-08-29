import React from 'react';

import './styles/Notifications.css';

export default function Notifications({ notifications }) {
    return (
        <ul id="notifications">
            {notifications.map((notification, notificationIndex) =>
                <li className={notification.type} key={`notification-${notificationIndex}`}>
                    {Array.isArray(notification.content)
                        ?
                        <ul>
                            {notification.content.map((content, contentIndex) =>
                                <li key={`notification-${notificationIndex}-content--${contentIndex}`}>
                                    {content}
                                </li>
                            )}
                        </ul>
                        :
                        notification.content
                    }
                </li>
            )}
        </ul>
    );
}