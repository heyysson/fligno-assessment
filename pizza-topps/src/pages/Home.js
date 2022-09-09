import React from 'react';
// import {Link} from 'react-router-dom';
import Header from '../pages/frontend/Header';

function Home() {
    return (
        <div>
            <Header />
            <div className="px-4 py-3 my-5 text-center">
                <img className="d-block mx-auto mb-4" src={require('../assets/new-logo.png')} alt="logo" width={374.5} height={340.75}/>
                <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">It's Pizza TOPPS time! Treat yourself to our best seller's pizza flavors now and enjoy the taste of goodness! 
                A Homegrown Specialty Pizza, Lasagna and Chicken based in Cagayan de Oro City.</p>
                <div className="d-grid gap-2 py-3 d-sm-flex justify-content-sm-center">
                    <button type="button" className="btn btn-dark btn-lg px-4 gap-3">Order Now</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Home;