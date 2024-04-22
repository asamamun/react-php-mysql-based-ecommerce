// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from './AuthContext';
import { AuthContext } from '../AuthContext';

const Navbar = ()=> {
    const { authData, logout } = useContext(AuthContext);

    const handleLogout = () => {
        console.log('Logout clicked');
        logout();
        // Optionally, you can redirect the user to the login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    My App
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>
                        {authData?.user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">
                                        Cart
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>) :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/registration">
                                        Registration
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                            </>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
