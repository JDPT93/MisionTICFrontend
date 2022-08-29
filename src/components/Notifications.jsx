import React from 'react';

import './styles/Notifications.css';

export default function Notifications({ notifications }) {
    return (
        <ul id="notifications">
            {
                notifications.map(
                    (notification, index) =>
                        <li className={notification.type} key={index}>
                            {
                                Array.isArray(notification.content)
                                    ? <ul>{notification.content.map(content => <li>{content}</li>)}</ul>
                                    : notification.content
                            }
                        </li>
                )
            }
        </ul>
    );
}