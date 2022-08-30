import React from 'react';

import './styles/Error.css';

import { Link } from 'react-router-dom';

export default function Error({ code }) {
    return (
        <div id='error'>
            <h1>Error {code}: {{ 403: 'Frobidden', 404: 'Not Found' }[code]}</h1>
            <p>{{
                403: 'You must sign in to continue.',
                404: 'Resource was not found.',
            }[code]}</p>
            <p><Link to='/'>Go home</Link></p>
        </div>
    );
}