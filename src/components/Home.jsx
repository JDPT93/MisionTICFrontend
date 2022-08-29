import React from 'react';

import './styles/Home.css';

import { useSelector } from 'react-redux';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Home() {
    const user = useSelector((state) => state.user);
    return (
        <>
            {user && user.fullname}
            <SignUp />
            <SignIn />
        </>
    );
}