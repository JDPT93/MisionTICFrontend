import React from 'react';

import './styles/Home.css';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Home() {
    return (
        <div id='home'>
            <SignUp />
            <SignIn />
        </div>
    );
}