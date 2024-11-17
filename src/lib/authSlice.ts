import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    jwt: string | null;
    teamId: string | null;
}

const initialState: AuthState = {
    jwt: null,
    teamId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveJwt(state, action: PayloadAction<string>) {
            state.jwt = action.payload;
        },
        saveTeamId(state, action: PayloadAction<string>) {
            state.teamId = action.payload;
        }
    },
});

export const { saveJwt, saveTeamId } = authSlice.actions;
export default authSlice.reducer;