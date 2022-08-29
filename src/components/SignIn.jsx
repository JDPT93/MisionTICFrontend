import React from 'react';

import './styles/SignIn.css';

import { useDispatch } from 'react-redux';
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
            }).catch(error => {
                console.error(error);
            });
        }}>
            <h2>Sign in</h2>
            <label htmlFor='nickname'>Nickname</label>
            <input id='nickname' name='nickname' placeholder='Nickname' type='text' value='JDPT93' />
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' placeholder='Password' type='password' value='Az*12345' />
            <button type='submit'>Sing in</button>
        </form>
    );
}