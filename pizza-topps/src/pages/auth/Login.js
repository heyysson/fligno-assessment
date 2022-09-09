import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Login() {

    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        username: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: loginInput.username,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    if (res.data.role === 'admin') {
                        navigate('/admin');
                    }
                    else {
                        navigate('/');
                    }
                }
                else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                }
                else {
                    setLogin({...loginInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return(
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <img className="" src={require('../../assets/7.png')} alt="logo" width={500} height={500}/>
                </div>
                

                <div className="col-md-10 mx-auto col-lg-5">
                    <form onSubmit={loginSubmit} className="p-4 p-md-5 border rounded-3 g-lg-5 bg-light">
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
                    <div className="form-floating mb-3">
                        <input type="text"
                            name="username" 
                            className={`form-control ${loginInput.error_list.username ? 'form-control is-invalid':''}`} 
                            onChange={handleInput} 
                            value={loginInput.username} 
                            id="floatingInput" placeholder="Username"/>
                        <label htmlFor="floatingInput">Username</label>
                        <small className="text-danger">{loginInput.error_list.username}</small>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password"
                            name="password"
                            className={`form-control ${loginInput.error_list.password ? 'form-control is-invalid':''}`}
                            onChange={handleInput} 
                            value={loginInput.password} 
                            id="floatingPassword" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                        <small className="text-danger">{loginInput.error_list.password}</small>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-dark" type="submit">Sign in</button>
                    <hr className="my-4"/>
                    <p className="text-center">
                        <Link to={'/register'} className="link-warning">Create New Account</Link>
                    </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login