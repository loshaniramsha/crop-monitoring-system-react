// src/reducer/VehicleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vehicle {
    vehicleCode: string;
    licensePlate: string;
    vehicleType: string;
    state: string;
    staffId: string;
    remark: string;
}

interface VehicleState {
    vehicles: Vehicle[];
    staffIds: string[];
    selectedVehicleId: string | null;
}

const initialState: VehicleState = {
    vehicles: [],
    staffIds: [],
    selectedVehicleId: null,
};

const vehicleSlice = createSlice({
    name: "vehicles",
    initialState,
    reducers: {
        addVehicle: (state, action: PayloadAction<Vehicle>) => {
            state.vehicles.push(action.payload);
        },
        updateVehicle: (state, action: PayloadAction<Vehicle>) => {
            const index = state.vehicles.findIndex((vehicle) => vehicle.vehicleCode === action.payload.vehicleCode);
            if (index !== -1) {
                state.vehicles[index] = action.payload;
            }
        },
        deleteVehicle: (state, action: PayloadAction<string>) => {
            state.vehicles = state.vehicles.filter((vehicle) => vehicle.vehicleCode !== action.payload);
        },
        setStaffIds: (state, action: PayloadAction<string[]>) => {
            state.staffIds = action.payload;
        },
        setSelectedVehicleId: (state, action: PayloadAction<string | null>) => {
            state.selectedVehicleId = action.payload;
        },
    },
});

export const { addVehicle, updateVehicle, deleteVehicle, setStaffIds, setSelectedVehicleId } = vehicleSlice.actions;
export default vehicleSlice.reducer;
