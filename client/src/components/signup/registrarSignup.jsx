import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import { registerUser } from '../../helper/studenthelper'
import avatar from '../../assets/profile.png';

import Logo from '../../assets/biglogo.png'

function RegistrarSignup () {
  const navigate = useNavigate()
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      const errors = await registerValidation(values);

      if (Object.keys(errors).length > 0) {
        // Display errors as toasts
        Object.values(errors).forEach(error => toast.error(error));
      } else {
        // Proceed with user registration
        values = await Object.assign(values, { profile: file || '' });
        let registerPromise = registerUser(values);

        toast.promise(registerPromise, {
          loading: 'Creating...',
          success: <b>Register Successfully...!</b>,
          error: <b>Could not Register.</b>
        });

        registerPromise.then(function () {
          navigate('/');
        });
      }
    }
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

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
        <div className="d-flex col-md-6 right-box">
          <div className="row align-items-center">
            <div className="input-group mb-3 justify-content-end">
              <Link to= "/registrar/login">
              <button className="btn btn-lg btn-primary w-100 fs-6 ml-auto">
                Back
              </button>
              </Link>
            </div>  
            <div className="header-text mb-4 col text-center">
              <h2>Sign Up</h2>
            </div>


            {/* Signup Form */}
            <form onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center align-items-center py-3'>
            <label>
              Upload Profile
            </label>
            <input onChange={onUpload} type="file" id={{ }} name='profile' className="file-input" />
            </div>
            <label>Email</label>
            <div className="input-group mb-2">
              <input {...formik.getFieldProps('email')} type="email" className="form-control form-control-lg bg-light fs-6" />
            </div>
            <label>Username</label>
            <div className="input-group mb-2">
              <input {...formik.getFieldProps('username')} type="text" className="form-control form-control-lg bg-light fs-6" />
            </div>
            <label>Password</label>
            <div className="input-group mb-2">
              <input {...formik.getFieldProps('password')} type="password" className="form-control form-control-lg bg-light fs-6" />
            </div>
            <div className="input-group mb-3">
              {/* Add the onClick attribute to call the login function */}
              <button type="submit" className="btn btn-lg btn-primary w-100 fs-6 ">
                Sign Up
              </button>
            </div>
            </form>


            {/* Signup with Google
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-light w-100 fs-6">
                <img src={GoogleLogo} style={{ width: 20 }} className="me-2" alt="Google Icon" />
                <small>Sign Up with Google</small>
              </button>
            </div> */}


          </div>
        </div>
        
      </div>
    </div>
  );
}

export default RegistrarSignup;
