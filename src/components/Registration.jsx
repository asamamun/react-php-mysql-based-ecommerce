import React, { useState ,useContext} from 'react';
import { AuthContext } from './../AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from './../config';

const Registration = ()=> {
    const { authData } = useContext(AuthContext);
    // console.log(authData)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '2' // Default role is '2' (Admin)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}registration.php`, formData)
      .then(response => {
        console.log(response.data);
        if (response.data.message === 'Registration successfully !!!') {
          Swal.fire({
            title: 'Registration Successfully Done !!',
            icon: 'success'
          });
          // Reset form after successful registration
          setFormData({
            username: '',
            email: '',
            password: '',
            role: '2'
          });
        } else {
          Swal.fire({
            title: 'Registration Failed',
            icon: 'error'
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Registration Failed',
          icon: 'error'
        });
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">User Registration</h2>
              <form onSubmit={handleSubmit}>

                <div className="form-group  mt-2">
                  <input type="text" placeholder="Username" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div className="form-group  mt-2">
                  <input type="email" placeholder="Email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                
                <div className="form-group  mt-2">
                  <input type="password" placeholder="Password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="form-group  mt-2">
                  {/* <label htmlFor="role">Role:</label> */}
                  <select className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} required>
                    <option value="2">Admin</option>
                    <option value="1">Moderator</option>
                    <option value="3">User</option>
                  </select>
                </div>

                <div className="form-group mt-2">
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
