import React from 'react';

import './styles/SignUp.css';

import api from '../api';

export default function SignUp() {
    return (
        <form autoComplete='off' method='post' onSubmit={event => {
            event.preventDefault();
            api.user.signUp({
                fullname: event.target.fullname.value,
                email: event.target.email.value,
                name: event.target.name.value,
                password: event.target.password.value,
            }).then(data => {

            }).catch(error => {
                console.error(error);
            });
        }}>
            <ul>
                <li><h1>Sign up</h1></li>
                <li><input type="text" name="fullname" /></li>
                <li><input type="email" name="email" /></li>
                <li><input type="text" name="name" /></li>
                <li><input type="password" name="password" /></li>
                <li><button type="submit">Sign up</button></li>
            </ul>
        </form>
    );
}