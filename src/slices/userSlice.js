import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
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

export const { signUp, signIn, signOut } = userSlice.actions;
export default userSlice.reducer;