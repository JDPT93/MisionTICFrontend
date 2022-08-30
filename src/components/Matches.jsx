import React from 'react';

import './styles/Matches.css';

import { useDispatch, useSelector } from 'react-redux';
import { popNotification, pushNotification } from '../slices/notificationsSlice';
import { addMatch, loadMatches, updateMatch } from '../slices/matchesSlice';
import { loadTeams } from '../slices/teamsSlice';

import api from '../api';

export function MatchesTable({ editable }) {
    const matches = useSelector(state => [...state.matches].sort((leftMatch, rightMatch) => new Date(rightMatch.date).getTime() - new Date(leftMatch.date).getTime()));
    const dispatch = useDispatch();
    React.useEffect(() => {
        api.matches.findAll().then(data => {
            dispatch(loadMatches(data));
            dispatch(pushNotification({
                type: 'information',
                content: data.length > 0 ? 'Matches were loaded' : 'No Matches were found'
            }));
            setTimeout(() => dispatch(popNotification()), 5000);
        }).catch(error => {
            dispatch(pushNotification({
                type: 'error',
                content: error.message
            }));
            setTimeout(() => dispatch(popNotification()), 5000);
        });
    }, [dispatch]);
    return (
        matches.length === 0
            ? <p>No Matches were found</p>
            : <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Local Team</th>
                        <th>Local Goals</th>
                        <th>Guest Goals</th>
                        <th>Guest Team</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match =>
                        <tr key={`match-${match.id}`}>
                            <td>{match.id}</td>
                            <td>{match.user.fullName}</td>
                            <td>{match.date.substr(0, 16).replace('T', ' ')}</td>
                            <td>{match.localTeam.name}</td>
                            <td>{editable
                                ? <input defaultValue={match.localGoals} min={0} onChange={event => {
                                    api.matches.save({
                                        ...match,
                                        localGoals: event.target.value,
                                    }).then(data => {
                                        dispatch(updateMatch(data));
                                        dispatch(pushNotification({
                                            type: 'success',
                                            content: `Match ${data.localTeam.name} vs. ${data.guestTeam.name} - ${data.date} was updated`
                                        }));
                                        setTimeout(() => dispatch(popNotification()), 5000);
                                    }).catch(error => {
                                        dispatch(pushNotification({
                                            type: 'error',
                                            content: error.message
                                        }));
                                        setTimeout(() => dispatch(popNotification()), 5000);
                                    });
                                }} type='number' />
                                : match.localGoals
                            }</td>
                            <td>{editable
                                ? <input defaultValue={match.guestGoals} min={0} onChange={event => {
                                    api.matches.save({
                                        ...match,
                                        guestGoals: event.target.value,
                                    }).then(data => {
                                        dispatch(updateMatch(data));
                                        dispatch(pushNotification({
                                            type: 'success',
                                            content: `Match ${data.localTeam.name} vs. ${data.guestTeam.name} - ${data.date} was updated`
                                        }));
                                        setTimeout(() => dispatch(popNotification()), 5000);
                                    }).catch(error => {
                                        dispatch(pushNotification({
                                            type: 'error',
                                            content: error.message
                                        }));
                                        setTimeout(() => dispatch(popNotification()), 5000);
                                    });
                                }} type='number' />
                                : match.guestGoals
                            }</td>
                            <td>{match.guestTeam.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
    );
}

export default function Matches({ user }) {
    const teams = useSelector(state => [...state.teams].sort((leftTeam, rightTeam) => leftTeam.name.localeCompare(rightTeam.name)));
    const dispatch = useDispatch();
    React.useEffect(() => {
        api.teams.findAll().then(data => {
            dispatch(loadTeams(data));
            dispatch(pushNotification({
                type: 'information',
                content: data.length > 0 ? 'Teams were loaded' : 'No Teams were found'
            }));
            setTimeout(() => dispatch(popNotification()), 5000);
        }).catch(error => {
            dispatch(pushNotification({
                type: 'error',
                content: error.message
            }));
            setTimeout(() => dispatch(popNotification()), 5000);
        });
    }, [dispatch]);
    return (
        <div id='matches'>
            <h2>Manage Matches</h2>
            <form autoComplete='off' method='post' onSubmit={event => {
                event.preventDefault();
                api.matches.save({
                    user,
                    localTeam: teams[event.target.localTeam.value],
                    guestTeam: teams[event.target.guestTeam.value],
                    date: event.target.date.value,
                    localGoals: event.target.localGoals.value,
                    guestGoals: event.target.guestGoals.value,
                }).then(data => {
                    event.target.reset();
                    dispatch(addMatch(data));
                    dispatch(pushNotification({
                        type: 'success',
                        content: `Match ${data.localTeam.name} vs. ${data.guestTeam.name} - ${data.date} was added`
                    }));
                    setTimeout(() => dispatch(popNotification()), 5000);
                }).catch(error => {
                    dispatch(pushNotification({
                        type: 'error',
                        content: error.message
                    }));
                    setTimeout(() => dispatch(popNotification()), 5000);
                });
            }}>
                <label htmlFor='date'>Date</label>
                <input id='date' name='date' type='datetime-local' />
                <label htmlFor='localTeam'>Local Team</label>
                <select defaultValue={-1} id='localTeam' name='localTeam'>
                    <option disabled value={-1}>Choose a Team</option>
                    {teams.map((team, index) => <option key={`local-team-${index}`} value={index}>{team.name}</option>)}
                </select>
                <label htmlFor='localGoals'>Local Goals</label>
                <input defaultValue={0} id='localGoals' min={0} name='localGoals' type='number' />
                <label htmlFor='guestTeam'>Guest Team</label>
                <select defaultValue={-1} id='guestTeam' name='guestTeam'>
                    <option disabled value={-1}>Choose a Team</option>
                    {teams.map((team, index) => <option key={`local-team-${index}`} value={index}>{team.name}</option>)}
                </select>
                <label htmlFor='guestGoals'>Guest Goals</label>
                <input defaultValue={0} id='guestGoals' min={0} name='guestGoals' type='number' />
                <button type='submit'>Save Team</button>
            </form>
            <MatchesTable editable={true} />
        </div >
    );
}