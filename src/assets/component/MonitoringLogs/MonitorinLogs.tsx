import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLog, deleteLog, updateLog } from "../../../reducer/MonitoringLogSlice.ts";
import "../MonitoringLogs/MonitoringLogs.css";

export const MonitoringLogs = () => {
    const dispatch = useDispatch();
    const logs = useSelector(state => state.logs.logs);

    const [logData, setLogData] = useState({
        id: "",
        logCode: "",
        logDate: "",
        logDetails: "",
        observedImage: null,
    });

    const [searchId, setSearchId] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Tracks if we're updating an entry

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogData({ ...logData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setLogData({ ...logData, observedImage: URL.createObjectURL(e.target.files[0]) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!logData.logCode || !logData.logDate || !logData.logDetails) {
            alert("Please fill all required fields!");
            return;
        }

        if (isEditing) {
            dispatch(updateLog(logData));
            setIsEditing(false);
        } else {
            const newLog = { ...logData, id: Date.now().toString() };
            dispatch(addLog(newLog));
        }

        setLogData({ id: "", logCode: "", logDate: "", logDetails: "", observedImage: null });
    };

    const handleDelete = (id) => {
        dispatch(deleteLog(id));
    };

    const handleUpdate = (log) => {
        setLogData(log);
        setIsEditing(true); // Set editing mode to true
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const foundLog = logs.find(log => log.id === searchId);
        if (foundLog) {
            setLogData(foundLog);
        } else {
            alert("Log not found!");
        }
    };

    return (
        <div className="monitoring-container">
            <h2>Monitoring Logs</h2>

            {/* Search */}
            <form className="search-bar" onSubmit={handleSearch}>
                <label>Search by Log ID:</label>
                <select onChange={(e) => setSearchId(e.target.value)} value={searchId}>
                    <option value="">Select Log ID</option>
                    {logs.map(log => (
                        <option key={log.id} value={log.id}>{log.id}</option>
                    ))}
                </select>
                <button type="submit">Search</button>
            </form>

            {/* Form */}
            <form className="monitoring-form" onSubmit={handleSubmit}>
                <input type="text" name="logCode" placeholder="Log Code" value={logData.logCode} onChange={handleChange} required />
                <input type="date" name="logDate" value={logData.logDate} onChange={handleChange} required />
                <textarea name="logDetails" placeholder="Log Details" value={logData.logDetails} onChange={handleChange} required />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {logData.observedImage && <img src={logData.observedImage} alt="Observed" className="preview-img" />}
                <button type="submit">{isEditing ? "Update Log" : "Add Log"}</button>
            </form>

            {/* Logs Table */}
            <table className="logs-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Log Code</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {logs.map(log => (
                    <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{log.logCode}</td>
                        <td>{log.logDate}</td>
                        <td>{log.logDetails}</td>
                        <td>{log.observedImage && <img src={log.observedImage} alt="Observed" className="table-img" />}</td>
                        <td>
                            <button onClick={() => handleUpdate(log)}>Update</button>
                            <button onClick={() => handleDelete(log.id)} className="delete-btn">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonitoringLogs;
