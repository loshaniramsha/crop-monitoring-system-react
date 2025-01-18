// src/components/VehicleForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVehicle, updateVehicle, setStaffIds, setSelectedVehicleId } from "../../../reducer/VehicleSlice.ts";
import { RootState } from "../../store/Store.ts";
import "../vehicle/Vehicle.css"

export const VehicleForm = () => {
    const dispatch = useDispatch();
    const { staffIds, selectedVehicleId, vehicles } = useSelector((state: RootState) => state.vehicle);

    const [formData, setFormData] = useState({
        vehicleCode: "",
        licensePlate: "",
        vehicleType: "",
        state: "",
        staffId: "",
        remark: "",
    });

    useEffect(() => {
        // For this example, let's assume staff IDs are fetched from an API.
        dispatch(setStaffIds(["ST001", "ST002", "ST003"]));
        if (selectedVehicleId) {
            const vehicle = vehicles.find((v) => v.vehicleCode === selectedVehicleId);
            if (vehicle) {
                setFormData(vehicle);
            }
        }
    }, [dispatch, selectedVehicleId, vehicles]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedVehicleId) {
            dispatch(updateVehicle(formData));
        } else {
            dispatch(addVehicle(formData));
        }
        setFormData({
            vehicleCode: "",
            licensePlate: "",
            vehicleType: "",
            state: "",
            staffId: "",
            remark: "",
        });
        dispatch(setSelectedVehicleId(null)); // Reset the selection
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    return (
        <section id="vehicle-section" style={{ padding: "20px" }}>
            <h1 className="text-center mb-5">Vehicle Registration</h1>
            <form id="vehicle-form" onSubmit={handleSubmit}>
                <div className="search-bar mb-4">
                    <label htmlFor="searchVehicleId" style={{ fontWeight: "bold", marginRight: "10px" }}>
                        Search by Vehicle ID:
                    </label>
                    <select className="form-control" id="searchVehicleId" style={{ width: "300px", display: "inline-block" }}>
                        <option value="">Select Vehicle ID</option>
                        {/* Add vehicle options dynamically here */}
                    </select>
                    <button className="btn btn-primary" style={{ marginLeft: "10px" }} >Search</button>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="vehicleCode">Vehicle Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="vehicleCode"
                            value={formData.vehicleCode}
                            onChange={handleChange}
                            placeholder="Enter Vehicle Code"
                            required
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="licensePlate">License Plate Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                            placeholder="Enter License Plate Number"
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="vehicleType">Vehicle Type</label>
                        <select
                            className="form-control"
                            id="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="Car">Car</option>
                            <option value="Truck">Truck</option>
                            <option value="Motorbike">Motorbike</option>
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="state">State</label>
                        <select
                            className="form-control"
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        >
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="NOT_AVAILABLE">NOT_AVAILABLE</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="staffId">Staff ID</label>
                        <select
                            className="form-control"
                            id="staffId"
                            value={formData.staffId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Staff ID</option>
                            {staffIds.map((staffId) => (
                                <option key={staffId} value={staffId}>
                                    {staffId}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="remark">Remark</label>
                        <input
                            type="text"
                            className="form-control"
                            id="remark"
                            value={formData.remark}
                            onChange={handleChange}
                            placeholder="Enter Remark"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-success mt-3">
                    {selectedVehicleId ? "Update Vehicle" : "Add Vehicle"}
                </button>
            </form>
        </section>
    );
};
export default VehicleForm;