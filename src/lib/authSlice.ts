
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    jwt: string | null;
}

const initialState: AuthState = {
    jwt: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveJwt(state, action: PayloadAction<string>) {
            state.jwt = action.payload;
        },
    },
});

export const { saveJwt } = authSlice.actions;
export default authSlice.reducer;