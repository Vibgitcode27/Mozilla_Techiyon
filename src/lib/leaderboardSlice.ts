
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeaderboardState {
    leaderboard: any[];
}

const initialState: LeaderboardState = {
    leaderboard: [],
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        updateLeaderboard(state, action: PayloadAction<any[]>) {
            state.leaderboard = action.payload;
        },
    },
});

export const { updateLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;