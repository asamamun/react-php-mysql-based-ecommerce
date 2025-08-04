// Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); // Pass email and password to login function
  };

  return (
    <div className="container mt-5" data-aos="fade-up">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg" data-aos="zoom-in" data-aos-delay="200">
            <div className="card-header bg-primary text-white" data-aos="fade-down" data-aos-delay="300">
              <h4 className="mb-0">Login</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3" data-aos="fade-up" data-aos-delay="500">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" data-aos="fade-up" data-aos-delay="600">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
