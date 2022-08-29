import React from 'react';

import './styles/Results.css';

import { MatchesTable } from './Matches';

export default function Results() {
    return (
        <div id='results'>
            <h2>See Results</h2>
            <MatchesTable />
        </div>
    );
}