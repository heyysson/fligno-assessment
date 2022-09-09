import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from '../pages/frontend/AdminHeader';
import axios from 'axios';
import swal from 'sweetalert';

function Pizza() {

    const [pizza, setPizza] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/view-pizza`).then(res => {
            if(res.data.status === 200) {
                setPizza(res.data.pizzas);
            }
            setLoading(false);
        });
    }, []);

    const deletePizza = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-pizza/${id}`).then(res => {
            if(res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });

    }

    var displayPizza = "";

    if(loading) {
        <div className="container col-sm-5">
            <div className="d-flex align-items-center justify-content-center">
                <strong>Loading...</strong>
                <div className="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div>
            </div>

        </div>
    }
    else {
        displayPizza = pizza.map((item, i) => {
            return (
                <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} height="60px" width="60px" alt={item.name}/></td>
                    <td>{item.available}</td>
                    <td><Link to={`edit-pizza/${item.id}` }className="btn btn-warning btn-sm">Edit</Link></td>
                    <td><button type="button" onClick={(e) => deletePizza(e, item.id)} className="btn btn-dark btn-sm">Delete</button></td>
                </tr>
            );
        });
    }

    return (
        <div>
            <AdminHeader />
            <div className="container col-md-12 py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4> Pizza Database
                                    <Link to={'add-pizza'} className="btn btn-warning btn-sm float-end">Add Pizza</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Short Description</th>
                                                <th>Image</th>
                                                <th>Available</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>{displayPizza}</tbody>
                                    </table>
                                </div>
                            </div>      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pizza;