import React from 'react';

import './styles/SignIn.css';

import { useDispatch } from 'react-redux';
import { popNotification, pushNotification } from '../slices/notificationsSlice';
import { signIn } from '../slices/usersSlice';

import api from '../api';

export default function SignIn() {
    const dispatch = useDispatch();
    return (
        <form autoComplete='off' id='sign-in' method='post' onSubmit={event => {
            event.preventDefault();
            api.users.signIn({
                nickname: event.target.nickname.value,
                password: event.target.password.value,
            }).then(data => {
                event.target.nickname.value = '';
                event.target.password.value = '';
                localStorage.setItem('token', data.token);
                dispatch(signIn(data.user));
                dispatch(pushNotification({
                    type: 'success',
                    content: `Welcome ${data.user.fullname}!`
                }));
                setTimeout(() => dispatch(popNotification()), 10000);
            }).catch(error => {
                dispatch(pushNotification({
                    type: 'error',
                    content: error.message
                }));
                setTimeout(() => dispatch(popNotification()), 10000);
            });
        }}>
            <h2>Sign in</h2>
            <label htmlFor='sign-in-nickname'>Nickname</label>
            <input id='sign-in-nickname' name='nickname' placeholder='Nickname' type='text' />
            <label htmlFor='sign-in-password'>Password</label>
            <input id='sign-in-password' name='password' placeholder='Password' type='password' />
            <button type='submit'>Sing in</button>
        </form>
    );
}