import React from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';

import Logo from '../../assets/biglogo.png'

function LandingPage () {

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#4762e8' }}>
          <div className="featured-image mb-3">
            <img src= {Logo} className="img-fluid" style={{ width: 250 }} alt="Logo" />
          </div>
          <p className="text-white fs-2" style={{ fontFamily: '"Courier New", Courier, monospace', fontWeight: 100, textAlign: 'center' }} id="lnhs">
            Lampanusan National High School
          </p>
          <small className="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: '"Courier New", Courier, monospace' }}>
            Online Document Request
          </small>
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4 align col text-center">
              <h3>Hello, Welcome!</h3>
            </div>
            <div>
                <center>
                <p>What is your role?</p>
                </center>
            </div>
            <Link to= "/student/login">
            <div className="input-group mb-3 ">
              <button className="btn btn-lg btn-primary w-100 fs-6">
                Student
              </button>
            </div>
            </Link>
            <Link to= "/registrar/login">
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-primary w-100 fs-6">
                Registrar
              </button>
            </div>  
            </Link>
            <Link to= "/admin/login">
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-primary w-100 fs-6">
                Admin
              </button>
            </div>
            </Link>
            <div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
