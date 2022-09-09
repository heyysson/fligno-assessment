import {Outlet, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

function AdminPrivateRoute() {
    
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then(res => {
            if(res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false);
        });

        return () => {
            setAuthenticated(false);
        };

    }, []);

    useEffect(() => {
        axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
            if(err.response.status === 401) {
                swal("Unauthorized", err.response.data.message, "error");
                navigate('/');
            }
            else if (err.response.status === 403) { // Access Denied
                swal("Forbidden", err.response.data.message, "error");
                navigate('/');
            }
            else if (err.response.status === 404) { // Page Not Found
                swal("404 Error", "Page Not Found", "error");
                navigate('/');
            }
            return err;
        });
    });

    // useEffect(() => {
    //     axios.interceptors.response.use(function (response) {
    //         return response; 
    //         }, function (error) {
    //             if (error.response.status === 403) { // Access Denied
    //                 swal("Forbidden", error.response.data.message, "error");
    //                 navigate('/');
    //             }
    //             else if (error.response.status === 404) { // Page Not Found
    //                 swal("404 Error", "Page Not Found", "error");
    //                 navigate('/');
    //             }
    
    //             return error;
    //         }
            
    //     );
    // });



    if(loading) {
        return (
            <div className="container col-sm-5">
                <div className="d-flex align-items-center justify-content-center">
                    <strong>Loading...</strong>
                    <div className="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div>
                </div>

            </div>
        );
    }

    
    // const auth = localStorage.getItem('auth_token');

    return authenticated ? <Outlet /> : <Navigate to="/login" />;

}

export default AdminPrivateRoute;