import React from 'react';

import './styles/App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import { useSelector } from 'react-redux';

import Home from './Home';
import Main from './Main';
import Matches from './Matches';
import Teams from './Teams';

export default function App() {
    const user = useSelector(state => state.user);
    return (
        <BrowserRouter>
            <div id='app'>
                <header>
                    <h1>Soccer results</h1>
                </header>
                <Routes>
                    <Route exact path='/' element={
                        user
                            ? <Main user={user} />
                            : <Home />
                    } />
                    <Route exact path='/teams' element={
                        user
                            ? <Main user={user}><Teams /></Main>
                            : <></>
                    } />
                    <Route exact path='/matches' element={
                        user
                            ? <Main user={user}><Matches /></Main>
                            : <></>
                    } />
                </Routes>
                <footer>
                    &copy; Soccer results 2022
                </footer>
            </div>
        </BrowserRouter>
    );
}
