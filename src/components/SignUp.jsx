import React from 'react';

import './styles/SignUp.css';

import { useDispatch } from 'react-redux';
import { signUp } from '../slices/usersSlice';

import api from '../api';

export default function SignUp() {
    const dispatch = useDispatch();
    return (
        <form autoComplete='off' id='sign-up' method='post' onSubmit={event => {
            event.preventDefault();
            api.users.signUp({
                fullname: event.target.fullname.value,
                email: event.target.email.value,
                nickname: event.target.nickname.value,
                password: event.target.password.value,
            }).then(data => {
                event.target.fullname.value = '';
                event.target.email.value = '';
                event.target.nickname.value = '';
                event.target.password.value = '';
                localStorage.setItem('token', data.token);
                dispatch(signUp(data.user));
            }).catch(error => {
                console.error(error);
            });
        }}>
            <h2>Sign up</h2>
            <label htmlFor='fullname'>Fullname</label>
            <input id='fullname' name='fullname' placeholder='Fullname' type='text' value='José Daniel Pérez Torres' />
            <label htmlFor='email'>Email</label>
            <input id='email' name='email' placeholder='Email' type='email' value='josedanielpereztorres@gmail.com' />
            <label htmlFor='nickname'>Nickname</label>
            <input id='nickname' name='nickname' placeholder='Nickname' type='text' value='JDPT93' />
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' placeholder='Password' type='password' value='Az*12345' />
            <button type='submit'>Sign up</button>
        </form>
    );
}