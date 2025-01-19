
import { useDispatch, useSelector } from "react-redux";
import { addStaff, updateStaff, deleteStaff } from "../../../reducer/StaffSlice.ts";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "../staff/Staff.css"
import {useEffect, useState} from "react";

const StaffForm = () => {
    const dispatch = useDispatch();
    const staffList = useSelector((state) => state.staff.staffList);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        designation: "",
        gender: "",
        phoneNumber: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        if (selectedStaff) setFormData(selectedStaff);
    }, [selectedStaff]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            dispatch(updateStaff(formData));
        } else {
            dispatch(addStaff({ ...formData, id: uuidv4() }));
        }
        setFormData({ id: "", firstName: "", lastName: "", designation: "", gender: "", phoneNumber: "", email: "", role: "" });
        setSelectedStaff(null);
    };

    return (
        <div className="container">
            <h2 className="text-center">Staff Management</h2>
            <form onSubmit={handleSubmit} className="p-3 border rounded">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>First Name</label>
                        <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Last Name</label>
                        <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">{formData.id ? "Update" : "Add"} Staff</button>
            </form>
            <table className="table mt-4">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {staffList.map((staff) => (
                    <tr key={staff.id}>
                        <td>{staff.firstName} {staff.lastName}</td>
                        <td>{staff.designation}</td>
                        <td>
                            <button className="btn btn-primary btn-sm me-2" onClick={() => setSelectedStaff(staff)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteStaff(staff.id))}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffForm;