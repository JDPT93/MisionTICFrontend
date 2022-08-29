import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {},
    reducers: {
        signUp(state, action) {
            state.user = action.payload;
        },
        signIn(state, action) {
            state.user = action.payload;
        },
        signOut(state, action) {
            delete state.user;
        },
    },
});

export const { signUp, signIn, signOut } = usersSlice.actions;
export default usersSlice.reducer;