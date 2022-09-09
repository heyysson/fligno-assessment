import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AdminHeader() {

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                navigate('/');
            }
        });
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img  src={require('../../assets/small-logo.png')} alt="pizza" width={53.75} height={30.375}/>
                </Link>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="#" className="nav-link px-2 link-secondary">Home</Link></li>
                    <li><Link to="#" className="nav-link px-2 link-dark">Pizzas</Link></li>
                    <li><Link to="#" className="nav-link px-2 link-dark">Order Request</Link></li>
                </ul>

                <div className="col-md-3 text-end">
                    <Link to={'register'}>
                        <button type="button" onClick={logoutSubmit} className="btn btn-dark">Logout</button>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default AdminHeader;