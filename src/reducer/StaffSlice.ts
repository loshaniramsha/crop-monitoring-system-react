import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staffList: [],
};

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        addStaff: (state, action) => {

            state.staffList.push(action.payload);
        },
        updateStaff: (state, action) => {
            const index = state.staffList.findIndex((staff) => staff.id === action.payload.id);
            if (index !== -1) {
                state.staffList[index] = action.payload;
            }
        },
        deleteStaff: (state, action) => {
            state.staffList = state.staffList.filter((staff) => staff.id !== action.payload);
        },
    },
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;
export default staffSlice.reducer;