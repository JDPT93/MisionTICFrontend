import React from 'react';

import './styles/Results.css';

import { useDispatch, useSelector } from 'react-redux';
import { popNotification, pushNotification } from '../slices/notificationsSlice';
import { loadMatches } from '../slices/matchesSlice';

import api from '../api';

export default function Results() {
    const matches = useSelector(state => state.matches);
    const dispatch = useDispatch();
    React.useEffect(() => {
        api.matches.findAll().then(data => {
            dispatch(loadMatches(data));
            dispatch(pushNotification({
                type: 'information',
                content: data.length > 0 ? 'Results were loaded' : 'No Results were found'
            }));
            setTimeout(() => dispatch(popNotification()), 10000);
        }).catch(error => {
            dispatch(pushNotification({
                type: 'error',
                content: error.message
            }));
            setTimeout(() => dispatch(popNotification()), 10000);
        });
    }, [dispatch]);
    return (
        <div id='results'>
            <h2>See Results</h2>
            {matches.length === 0
                ? <p>No results were found</p>
                : <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Local Match</th>
                            <th>Local Goals</th>
                            <th>Guest Goals</th>
                            <th>Guest Match</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map(match =>
                            <tr key={`match-${match.id}`}>
                                <td>{match.id}</td>
                                <td>{match.user.fullName}</td>
                                <td>{match.date.substr(0, 16).replace('T', ' ')}</td>
                                <td>{match.localTeam.name}</td>
                                <td>{match.localGoals}</td>
                                <td>{match.guestGoals}</td>
                                <td>{match.guestTeam.name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>}
        </div>
    );
}