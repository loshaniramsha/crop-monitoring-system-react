import "./Navbar.css"

export const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <h2 className="logo">Crop Monitoring</h2>
                <div className="nav-links">
                    <button>Home</button>
                    <button>Profile</button>
                    <button>Logout</button>
                </div>
            </nav>


        </>
    );
};