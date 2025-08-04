import React, { useContext } from 'react';
import { AuthContext } from './../AuthContext';
import { Link } from 'react-router-dom';

export const Home = () => {
    const { authData } = useContext(AuthContext);
    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                    <h1 className="display-4 mb-4" data-aos="fade-down">
                        Welcome to Our E-Commerce Store
                    </h1>
                    <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">
                        Discover amazing products at great prices. Shop with confidence and enjoy a seamless shopping experience.
                    </p>
                    <div className="row mt-5">
                        <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="fas fa-shopping-cart fa-3x text-primary mb-3"></i>
                                    <h5 className="card-title">Easy Shopping</h5>
                                    <p className="card-text">Browse through our extensive collection of products with ease.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="400">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="fas fa-shipping-fast fa-3x text-success mb-3"></i>
                                    <h5 className="card-title">Fast Delivery</h5>
                                    <p className="card-text">Get your orders delivered quickly and securely to your doorstep.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="500">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="fas fa-shield-alt fa-3x text-warning mb-3"></i>
                                    <h5 className="card-title">Secure Payments</h5>
                                    <p className="card-text">Shop with confidence with our secure payment processing system.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5" data-aos="fade-up" data-aos-delay="600">
                        <Link to="/products" className="btn btn-primary btn-lg me-3">
                            Browse Products
                        </Link>
                        {!authData?.user && (
                            <>
                                <Link to="/registration" className="btn btn-outline-primary btn-lg me-3">
                                    Get Started
                                </Link>
                                <Link to="/login" className="btn btn-outline-secondary btn-lg">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}