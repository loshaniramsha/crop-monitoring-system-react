import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Crop {
    id: number;
    name: string;
    scientificName: string;
    category: string;
    season: string;
    cropImage: string | null; // Storing image URL
    fieldCode: string;
    logId: string;
}

interface CropState {
    crops: Crop[];
    searchQuery: string;
}

const initialState: CropState = {
    crops: [],
    searchQuery: "",
};

const cropSlice = createSlice({
    name: "crops",
    initialState,
    reducers: {
        addCrop: (state, action: PayloadAction<Crop>) => {
            state.crops.push({ ...action.payload, id: Date.now() });
        },
        updateCrop: (state, action: PayloadAction<Crop>) => {
            const index = state.crops.findIndex((crop) => crop.id === action.payload.id);
            if (index !== -1) state.crops[index] = action.payload;
        },
        deleteCrop: (state, action: PayloadAction<number>) => {
            state.crops = state.crops.filter((crop) => crop.id !== action.payload);
        },
        searchCrop: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { addCrop, updateCrop, deleteCrop, searchCrop } = cropSlice.actions;
export default cropSlice.reducer;
