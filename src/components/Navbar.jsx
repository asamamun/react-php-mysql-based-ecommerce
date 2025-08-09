// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from './AuthContext';
import { AuthContext } from '../AuthContext';

const Navbar = ()=> {
    const { authData, logout } = useContext(AuthContext);
console.log(authData);
    const handleLogout = () => {
        console.log('Logout clicked');
        logout();
        // Optionally, you can redirect the user to the login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" data-aos="fade-down">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" data-aos="fade-right" data-aos-delay="100">
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
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" data-aos="fade-down" data-aos-delay="300">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item" data-aos="fade-down" data-aos-delay="400">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item" data-aos="fade-down" data-aos-delay="500">
{authData?.user && (
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                            )}
                        </li>
                        {authData?.user ? (
                            <>
                                <li className="nav-item" data-aos="fade-down" data-aos-delay="600">
                                    <Link className="nav-link" to="/cart">
                                        Cart
                                    </Link>
                                </li>
                                {
                                    authData?.user?.role === '2' && (
                                        <li className="nav-item" data-aos="fade-down" data-aos-delay="700">
                                            <Link className="nav-link" to="/orders">
                                                Orders
                                            </Link>
                                        </li>
                                    )
                                }
                                <li className="nav-item" data-aos="fade-down" data-aos-delay="700">
                                    <Link className="nav-link" to="/my-orders">
                                        My Orders
                                    </Link>
                                </li>
                                <li className="nav-item" data-aos="fade-down" data-aos-delay="800">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>) :
                            <>
                                <li className="nav-item" data-aos="fade-down" data-aos-delay="600">
                                    <Link className="nav-link" to="/registration">
                                        Registration
                                    </Link>
                                </li>
                                <li className="nav-item" data-aos="fade-down" data-aos-delay="700">
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
