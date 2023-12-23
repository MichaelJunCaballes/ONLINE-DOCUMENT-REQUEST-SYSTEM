import React from "react";
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { usernameValidate } from '../../helper/validate2'
import { useAuthStore } from '../../store/store2'
import avatar from '../../assets/profile.png';

import Logo from '../../assets/biglogo.png'
import GoogleLogo from '../../assets/icons8google48-1@2x.png'

function RegistrarLogin () {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/registrar/password')
    }
  })

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <Toaster position='bottom-right' reverseOrder={false}></Toaster>
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#4762e8' }}>
          <div className="featured-image mb-3">
            <img src={Logo} className="img-fluid" style={{ width: 250 }} alt="Logo" />
          </div>
          <p className="text-white fs-2" style={{ fontFamily: '"Courier New", Courier, monospace', fontWeight: 100, textAlign: 'center' }} id="lnhs">
            Lampanusan National High School
          </p>
          <small className="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: '"Courier New", Courier, monospace' }}>
            Online Document Request
          </small>
        </div>
        <div className="col-md-6 right-box ">
          <div className="row align-items-center">
            <div className="input-group mb-3 justify-content-end">
              <Link to= "/">
              <button className="btn btn-lg btn-primary w-100 fs-6 ml-auto">
                Back
              </button>
              </Link>
            </div>  
            <div className="header-text mb-4 col text-center">
              <h2>HELLO</h2>
              <p>Welcome to Registrar Login!</p>
            </div>


            {/* Login student */}
            <form onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center align-items-center py-3'>
                    <img src={avatar} alt="avatar" style={{ marginLeft: "90px",maxWidth: '50%', height: 'auto' }} />
                    </div>
            <div className="input-group mb-3">
              <input {...formik.getFieldProps('username')} type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Username"/>
            </div>
            <div className="input-group mb-3">
              {/* Add the onClick attribute to call the login function */}
              <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">
                Login
              </button>
            </div>
            </form>


            {/* Signin with Google */}
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-light w-100 fs-6">
                <img src={GoogleLogo} style={{ width: 20 }} className="me-2" alt="Google Icon" />
                <small>Sign In with Google</small>
              </button>
            </div>
            <div className="row">
              <small>
                Don't have an account? <Link to='/registrar/signup'>Sign Up</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarLogin;
