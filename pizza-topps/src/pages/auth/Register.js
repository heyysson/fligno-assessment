import React, {useState} from'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Register() {

    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        username: '',
        name: '',
        address: '',
        email: '',
        phone: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: registerInput.username,
            name: registerInput.name,
            address: registerInput.address,
            email: registerInput.email,
            phone: registerInput.phone,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
                else {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return (
        <div className="container col-md-5 py-5 ">
            <br/>
            <div className="position-relative py-4">
                    <Link to={'/'}>
                        <img className="position-absolute top-0 start-50 bottom-100 translate-middle mb-3"
                            src={require('../../assets/small-logo.png')}
                            alt="logo"
                            width={107.5}
                            height={60.75}/>
                    </Link>
                </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Register
                                <Link to={'/login'} className="btn btn-link float-end">
                                    Already Registered? Login here.
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">

                            <form onSubmit={registerSubmit}>
                                <div className="form-group mb-3">
                                    <label>Username</label>
                                    <div className="input-group flex-nowrap">
                                        <span className="input-group-text" id="addon-wrapping">@</span>
                                        <input type="text" name="username" className="form-control" aria-label="Username" aria-describedby="addon-wrapping"
                                            onChange={handleInput} value={registerInput.username}/>
                                    </div>
                                    <small className="text-danger">{registerInput.error_list.username}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Full Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" />
                                    <small className="text-danger">{registerInput.error_list.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Address</label>
                                    <input type="text" name="address" onChange={handleInput} value={registerInput.address} className="form-control" />
                                    <small className="text-danger">{registerInput.error_list.address}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={handleInput} value={registerInput.email} className="form-control" />
                                    <small className="text-danger">{registerInput.error_list.email}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control" />
                                    <small className="text-danger">{registerInput.error_list.phone}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input type="text" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />
                                    <small className="text-danger">{registerInput.error_list.password}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="text-muted">By clicking Sign-up, you agree to the terms of use.</label>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="submit" className="btn btn-dark">Sign-up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;