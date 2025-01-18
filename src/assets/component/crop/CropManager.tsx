import { useDispatch, useSelector } from "react-redux";
import { addCrop, deleteCrop, updateCrop, searchCrop } from "../../../reducer/CropSlice.ts";
import { useState } from "react";
import "../crop/Crop.css";
import { RootState } from "../../store/Store.ts";

interface Crop {
    id: number | null;
    name: string;
    scientificName: string;
    category: string;
    season: string;
    cropImage: File | null;
    fieldCode: string;
    logId: string;
}

export const CropManager = () => {
    const dispatch = useDispatch();
    const { crops, searchQuery } = useSelector((state: RootState) => state.crops);

    const [formData, setFormData] = useState<Crop>({
        id: null,
        name: "",
        scientificName: "",
        category: "",
        season: "",
        cropImage: null,
        fieldCode: "",
        logId: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCrop = {
            ...formData,
            id: formData.id || Date.now(),
            cropImage: formData.cropImage ? URL.createObjectURL(formData.cropImage) : null, // Convert file to URL
        };

        if (formData.id) {
            dispatch(updateCrop(newCrop));
        } else {
            dispatch(addCrop(newCrop));
        }

        setFormData({
            id: null,
            name: "",
            scientificName: "",
            category: "",
            season: "",
            cropImage: null,
            fieldCode: "",
            logId: "",
        });
    };

    const handleEdit = (crop: Crop) => {
        setFormData(crop);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteCrop(id));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchCrop(e.target.value));
    };

    return (
        <div className="crop-container">
            <h2>Crop Management</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search crops..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />

            {/* Form for Adding/Updating Crops */}
            <form onSubmit={handleSubmit} className="crop-form">
                <input
                    type="text"
                    placeholder="Crop Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Scientific Name"
                    value={formData.scientificName}
                    onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Season"
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                />

                {/* File Input for Crop Image */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, cropImage: e.target.files?.[0] || null })}
                />

                <input
                    type="text"
                    placeholder="Field Code"
                    value={formData.fieldCode}
                    onChange={(e) => setFormData({ ...formData, fieldCode: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Log ID"
                    value={formData.logId}
                    onChange={(e) => setFormData({ ...formData, logId: e.target.value })}
                />
                <button type="submit">{formData.id ? "Update Crop" : "Add Crop"}</button>
            </form>

            {/* Crop Table */}
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Scientific Name</th>
                    <th>Category</th>
                    <th>Season</th>
                    <th>Crop Image</th>
                    <th>Field Code</th>
                    <th>Log ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {crops
                    .filter((crop) => crop.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((crop) => (
                        <tr key={crop.id}>
                            <td>{crop.name}</td>
                            <td>{crop.scientificName}</td>
                            <td>{crop.category}</td>
                            <td>{crop.season}</td>
                            <td>
                                {crop.cropImage && <img src={crop.cropImage} alt={crop.name} width="50" height="50" />}
                            </td>
                            <td>{crop.fieldCode}</td>
                            <td>{crop.logId}</td>
                            <td>
                                <button onClick={() => handleEdit(crop)}>Edit</button>
                                <button onClick={() => handleDelete(crop.id!)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CropManager;
