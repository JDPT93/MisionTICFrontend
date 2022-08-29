import { createSlice } from '@reduxjs/toolkit';

import api from '../api';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {},
    reducers: {
        signUp(state, action) {
            api.user.signUp(action.payload).then(data => {
                state.user = data.user;
                state.token = data.token;
                localStorage.setItem('token', state.token);
            }).catch(error => {
                console.error(error);
            });
        },
        signIn(state, action) {
            api.user.signIn(action.payload).then(data => {
                state.user = data.user;
                state.token = data.token;
                localStorage.setItem('token', state.token);
            }).catch(error => {
                console.error(error.message);
            });
        },
        signOut(state, action) {
            delete state.user;
            delete state.token;
        },
    },
});


export const { signUp, signIn, signOut } = sessionSlice.actions;
export default sessionSlice.reducer;