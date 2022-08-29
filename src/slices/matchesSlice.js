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
    },
});

export const { addMatch, loadMatches } = matchesSlice.actions;
export default matchesSlice.reducer;