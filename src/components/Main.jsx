import React from 'react';

import './styles/Main.css';

import {
    Link
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signOut } from '../slices/userSlice';

export default function Main({ children, user }) {
    const dispatch = useDispatch();
    return (
        <div id='main'>
            <aside>
                <h3>{user.fullname}</h3>
                <Link to='/teams'>Manage teams</Link>
                <Link to='/matches'>Manage matches</Link>
                <Link to='/results'>See results</Link>
                <Link to='/' onClick={event => dispatch(signOut())}>Sign out</Link>
            </aside>
            <main>
                {children}
            </main>
        </div>
    );
}