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
import Results from './Results';
import Error from './Error';
import Notifications from './Notifications';

export default function App() {
    const notifications = useSelector(state => state.notifications);
    const user = useSelector(state => state.users.user);
    return (
        <BrowserRouter>
            <div id='app'>
                <header>
                    <h1>Soccer Results</h1>
                </header>
                <Routes>
                    <Route exact path='/' element={user
                        ?
                        <Main user={user} />
                        :
                        <Home />
                    } />
                    <Route exact path='/teams' element={user
                        ?
                        <Main user={user}>
                            <Teams user={user} />
                        </Main>
                        :
                        <Error code={403} />
                    } />
                    <Route exact path='/matches' element={user
                        ?
                        <Main user={user}>
                            <Matches user={user} />
                        </Main>
                        :
                        <Error code={403} />
                    } />
                    <Route exact path='/results' element={user
                        ?
                        <Main user={user}>
                            <Results user={user} />
                        </Main>
                        :
                        <Error code={403} />
                    } />
                    <Route path='*' element={<Error code={404} />} />
                </Routes>
                <footer>
                    &copy; Soccer Results 2022
                </footer>
                <Notifications notifications={notifications} />
            </div>
        </BrowserRouter>
    );
}
