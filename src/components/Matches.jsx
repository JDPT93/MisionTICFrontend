import React from 'react';

import './styles/Matches.css';

import { useDispatch, useSelector } from 'react-redux';
import { popNotification, pushNotification } from '../slices/notificationsSlice';
import { addMatch, loadMatches } from '../slices/matchesSlice';
import { loadTeams } from '../slices/teamsSlice';

import api from '../api';

export default function Matches() {
    const matches = useSelector(state => state.matches);
    const teams = useSelector(state => state.teams);
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
        api.teams.findAll().then(data => {
            dispatch(loadTeams(data));
            dispatch(pushNotification({
                type: 'information',
                content: data.length > 0 ? 'Teams were loaded' : 'No Teams were found'
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
        <div id='matches'>
            <h2>Manage Matches</h2>
            <form autoComplete='off' method='post' onSubmit={event => {

            }}>
                <label htmlFor='date'>Local Team</label>
                <input id='date' name='date' type='datetime-local' />
                <label htmlFor='localTeam'>Local Team</label>
                <select defaultValue={false} id='localTeam' name='localTeam'>
                    <option disabled value={false}>Choose a Team</option>
                    {teams.map(team => <option value={team}>{team.name}</option>)}
                </select>
                <label htmlFor='localGoals'>Local Goals</label>
                <input defaultValue={0} id='localGoals' min={0} name='localGoals' type='number' />
                <label htmlFor='guestTeam'>Guest Team</label>
                <select defaultValue={false} id='guestTeam' name='guestTeam'>
                    <option disabled value={false}>Choose a Team</option>
                    {teams.map(team => <option value={team}>{team.name}</option>)}
                </select>
                <label htmlFor='guestGoals'>Guest Goals</label>
                <input defaultValue={0} id='guestGoals' min={0} name='guestGoals' type='number' />
                <button type='submit'>Save Team</button>
            </form>
        </div>
    );
}