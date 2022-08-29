import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        pushNotification(state, action) {
            state.unshift(action.payload);
        },
        popNotification(state, action) {
            state.pop();
        }
    },
});

export const { pushNotification, popNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;