import { createSlice } from '@reduxjs/toolkit';

const matchesSlice = createSlice({
    name: 'matches',
    initialState: [],
    reducers: {
        loadMatches(state, action) {
            state.length = 0;
            state.push(...action.payload);
        },
        addMatch(state, action) {
            state.push(action.payload);
        },
        updateMatch(state, action) {
            Object.assign(state.find(match => match.id === action.payload.id) || {}, action.payload);
        },
    },
});

export const { addMatch, loadMatches, updateMatch } = matchesSlice.actions;
export default matchesSlice.reducer;