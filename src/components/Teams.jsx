import React from 'react';

import './styles/Teams.css';

import { useDispatch, useSelector } from 'react-redux';
import { popNotification, pushNotification } from '../slices/notificationsSlice';
import { addTeam, loadTeams } from '../slices/teamsSlice';

import api from '../api';

export default function Teams() {
    const teams = useSelector(state => state.teams.sort((leftTeam, rightTeam) => leftTeam.name.localeCompare(rightTeam.name)));
    const dispatch = useDispatch();
    React.useEffect(() => {
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
        <div id='teams'>
            <h2>Manage Teams</h2>
            <form autoComplete='off' method='post' onSubmit={event => {
                event.preventDefault();
                api.teams.save({
                    name: event.target.name.value
                }).then(data => {
                    event.target.reset();
                    dispatch(addTeam(data));
                    dispatch(pushNotification({
                        type: 'success',
                        content: `Team '${data.name}' was added`
                    }));
                    setTimeout(() => dispatch(popNotification()), 10000);
                }).catch(error => {
                    dispatch(pushNotification({
                        type: 'error',
                        content: error.message
                    }));
                    setTimeout(() => dispatch(popNotification()), 10000);
                });
            }}>
                <label htmlFor='name'>Team Name</label>
                <input id='name' name='name' placeholder='Team Name' type='text' />
                <button type='submit'>Save Team</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Team Name</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team =>
                        <tr key={`team-${team.id}`}>
                            <td>{team.id}</td>
                            <td>{team.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}