import React from 'react';

import './styles/SignIn.css';

import api from '../api';

export default function SignIn() {
    return (
        <form autoComplete='off' method='post' onSubmit={event => {
            event.preventDefault();
            api.user.signIn({
                nickname: event.target.nickname.value,
                password: event.target.password.value,
            }).then(data => {
                console.log(data.user);
            }).catch(error => {
                console.error(error.message);
            });
        }}>
            <ul>
                <li><h1>Sign in</h1></li>
                <li><input type="text" name="nickname" /></li>
                <li><input type="password" name="password" /></li>
                <li><button type="submit">Sing in</button></li>
            </ul>
        </form>
    );
}