import {Navbar} from "../navbar/Navbar.tsx";
import "./Dashboad.css"

export const Dashboad = () => {
    return (
        <>
            <div className="dashboard">
                <Navbar/>
                <div className="dashboard-container">
                    <aside className="sidebar">
                        <ul>
                            <li>
                                <button>Crop</button>
                            </li>
                            <li>
                                <button>Equipment</button>
                            </li>
                            <li>
                                <button>Field</button>
                            </li>
                            <li>
                                <button>Vehicle</button>
                            </li>
                            <li>
                                <button>Staff</button>
                            </li>
                            <li>
                                <button>Monitoring Log</button>
                            </li>
                            <li>
                                <button>Settings</button>
                            </li>
                        </ul>
                    </aside>
                    <main className="main-content">
                        <h1>Welcome to the Dashboard</h1>
                        <p>Select an option from the sidebar to get started.</p>
                    </main>
                </div>
            </div>
        </>
    );
};