import { createSlice } from '@reduxjs/toolkit';

const teamsSlice = createSlice({
    name: 'teams',
    initialState: [],
    reducers: {
        loadTeams(state, action) {
            state.length = 0;
            state.push(...action.payload);
        },
        addTeam(state, action) {
            state.push(action.payload);
        },
    },
});

export const { loadTeams, addTeam } = teamsSlice.actions;
export default teamsSlice.reducer;