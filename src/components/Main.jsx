import React from 'react';

import './styles/Main.css';

import {
    Link
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signOut } from '../slices/usersSlice';

export default function Main({ children, user }) {
    const dispatch = useDispatch();
    return (
        <div id='main'>
            <aside>
                <h3>{user.fullname}</h3>
                <Link to='/teams'>Manage Teams</Link>
                <Link to='/matches'>Manage Matches</Link>
                <Link to='/results'>See Results</Link>
                <Link to='/' onClick={event => dispatch(signOut())}>Sign out</Link>
            </aside>
            <main>
                {children}
            </main>
        </div>
    );
}