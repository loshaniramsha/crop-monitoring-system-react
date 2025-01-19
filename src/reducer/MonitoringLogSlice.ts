import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logs: [],
};

const logsSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        addLog: (state, action) => {
            state.logs.push(action.payload);
        },
        deleteLog: (state, action) => {
            state.logs = state.logs.filter(log => log.id !== action.payload);
        },
        updateLog: (state, action) => {
            const index = state.logs.findIndex(log => log.id === action.payload.id);
            if (index !== -1) {
                state.logs[index] = action.payload;
            }
        }
    }
});

export const { addLog, deleteLog, updateLog } = logsSlice.actions;
export default logsSlice.reducer;
