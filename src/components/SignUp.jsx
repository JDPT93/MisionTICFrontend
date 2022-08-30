import React from 'react';

import './styles/SignUp.css';

import { useDispatch } from 'react-redux';
import { popNotification, pushNotification } from '../slices/notificationsSlice';
import { signUp } from '../slices/usersSlice';

import api from '../api';

export default function SignUp() {
    const dispatch = useDispatch();
    return (
        <form autoComplete='off' id='sign-up' method='post' onSubmit={event => {
            event.preventDefault();
            api.users.signUp({
                fullName: event.target.fullName.value,
                email: event.target.email.value,
                nickname: event.target.nickname.value,
                password: event.target.password.value,
            }).then(data => {
                event.target.reset();
                localStorage.setItem('token', data.token);
                dispatch(signUp(data.user));
                dispatch(pushNotification({
                    type: 'success',
                    content: `Welcome ${data.user.fullName}!`
                }));
                setTimeout(() => dispatch(popNotification()), 5000);
            }).catch(error => {
                dispatch(pushNotification({
                    type: 'error',
                    content: error.message
                }));
                setTimeout(() => dispatch(popNotification()), 5000);
            });
        }}>
            <h2>Sign up</h2>
            <label htmlFor='fullName'>Full Name</label>
            <input id='fullName' name='fullName' placeholder='Full Name' type='text' />
            <label htmlFor='email'>Email</label>
            <input id='email' name='email' placeholder='Email' type='email' />
            <label htmlFor='sign-up-nickname'>Nickname</label>
            <input id='sign-up-nickname' name='nickname' placeholder='Nickname' type='text' />
            <label htmlFor='sign-up-password'>Password</label>
            <input id='sign-up-password' name='password' placeholder='Password' type='password' />
            <button type='submit'>Sign up</button>
        </form>
    );
}