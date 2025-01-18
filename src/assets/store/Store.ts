import { configureStore } from "@reduxjs/toolkit";
import cropReducer from "../../reducer/CropSlice.ts";

export const store = configureStore({
    reducer: {
        crops: cropReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;