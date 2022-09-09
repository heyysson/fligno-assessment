import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import AdminHeader from './frontend/AdminHeader';

function Addpizza() {

    const [pizzaInput, setPizza] = useState({
        name: '',
        price: '',
        descrip: '',
        avail: '',
    });
    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setPizza({...pizzaInput, [e.target.name]: e.target.value});
    }
    const handleImage = (e) => {
        setPicture({image: e.target.files[0]});
    }

    const submitPizza = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('name', pizzaInput.name);
        formData.append('price', pizzaInput.price);
        formData.append('descrip', pizzaInput.descrip);
        formData.append('avail', pizzaInput.avail);

        axios.post(`http://localhost:8000/api/store-pizza`, formData).then(res=>{
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setPizza({...pizzaInput,
                    name: '',
                    price: '',
                    descrip: '',
                    avail: '',
                });
                setPicture([]);
                setError([]);
            }
            else if(res.data.status === 422) {
                swal("All Fields are mandatory","","error");
                setError(res.data.errors);
            }
        });
    }


    return (
        <div>
            <AdminHeader />
            <div className="container col-md-5 py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4> Add Pizza
                                    <Link to={'/admin'} className="btn btn-warning btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={submitPizza} encType="multipart/form-data">
                                    <div className="form-group mb-3">
                                        <label>Pizza Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={pizzaInput.name} className="form-control" />
                                        <small className="text-danger">{errorlist.name}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Price</label>
                                        <input type="numeric" name="price" onChange={handleInput} value={pizzaInput.price} className="form-control" />
                                        <small className="text-danger">{errorlist.price}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Short Description</label>
                                        <div className="input-group">
                                            <textarea className="form-control"
                                                name="descrip"
                                                onChange={handleInput}
                                                value={pizzaInput.descrip}
                                                aria-label="With textarea">
                                            </textarea>
                                        </div>
                                        <small className="text-danger">{errorlist.descrip}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Upload Image</label>
                                        <div className="input-group mb-3">
                                            <input type="file" name="image" 
                                                onChange={handleImage}
                                                className="form-control" 
                                                id="inputGroupFile02"/>
                                        </div>
                                        <small className="text-danger">{errorlist.image}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                type="checkbox"
                                                name="avail"
                                                onChange={handleInput}
                                                value={pizzaInput.avail}
                                                id="flexCheckChecked" 
                                                // checked={this.state.avail}
                                                />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Pizza Available
                                            </label>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button type="submit" className="btn btn-dark">Save Pizza</button>
                                    </div>
                                </form>

                            </div>      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addpizza;