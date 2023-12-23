import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../../helper/validate2';
import { resetPassword } from '../../helper/registrarhelper';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/store2';
import useFetch from '../../hooks/fetch.hook2';

import Logo from '../../assets/biglogo.png'

function StudentReset() {

    const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pwd: ''
    },
    validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });

      resetPromise.then(function(){ navigate('/registrar/password') })

    }
  })


  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/registrar/password'} replace={true}></Navigate>

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
              <h2>Reset Password</h2>
            </div>

            <form onSubmit={formik.handleSubmit}>
            
            <div className="input-group mb-3">
              {/* Add the onClick attribute to call the login function */}
              <div className="input input-group mb-3 text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <div className="input input-group mb-3 text-center">
                    <input {...formik.getFieldProps('password')} className="form-control form-control-lg bg-light fs-6" type="password" placeholder='New Password'/>
                </div>
                <div className="input input-group mb-3 text-center">
                    <input {...formik.getFieldProps('confirm_pwd')} className="form-control form-control-lg bg-light fs-6" type="password" placeholder='Repeat Password'/>
                </div>
              </div>
            <div>
                <br />
            </div>
              <button type="submit" className="btn btn-lg btn-primary w-100 fs-6 ">
                Reset
              </button>
            </div>
            </form>
            
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default StudentReset