import React from 'react';

import './styles/App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Home from './Home';
import Matches from './Matches';
import Teams from './Teams';

export default function App() {
    return (
        <BrowserRouter>
            <header></header>
            <main>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/teams' element={<Teams />} />
                    <Route exact path='/matches' element={<Matches />} />
                </Routes>
            </main>
            <footer></footer>
        </BrowserRouter>
    );
}
