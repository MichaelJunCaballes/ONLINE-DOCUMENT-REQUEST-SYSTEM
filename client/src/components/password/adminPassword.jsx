import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../../helper/validate3'
import useFetch from '../../hooks/fetch.hook3';
import { useAuthStore } from '../../store/store3';
import { verifyPassword } from '../../helper/adminhelper';
import ReCAPTCHA from 'react-google-recaptcha';
// recaptcha site key : 6Lc65jUpAAAAADT-5ay0NJYmGUXNfe0hMUGJQ8fa

import Logo from '../../assets/biglogo.png'
import GoogleLogo from '../../assets/icons8google48-1@2x.png'

function AdminPassword () {

    const navigate = useNavigate()
    const { username } = useAuthStore(state => state.auth)
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  
    const formik = useFormik({
      initialValues : {
        password : ''
      },
      validate : passwordValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
        
        let loginPromise = verifyPassword({ username, password : values.password })
        toast.promise(loginPromise, {
          loading: 'Checking...',
          success : <b>Login Successfully...!</b>,
          error : <b>Password Not Match!</b>
        });
  
        loginPromise.then(res => {
          let { token } = res.data;
          localStorage.setItem('token', token);
          navigate('/admin/dashboard')
        })
      }
    })

    const [ capVal, setCapVal] = useState(null)
  
    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

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
              <h2>HELLO {apiData?.firstName || apiData?.username || 'Loading...'}!</h2>
              <p>Enter Password</p>
            </div>


            {/* Login student */}
            <form onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center align-items-center py-3'>
                    <img src={apiData?.profile || avatar} alt="avatar" style={{ marginLeft: "90px",maxWidth: '50%', height: 'auto' }} />
                    </div>
            <div className="input-group mb-3">
              <input {...formik.getFieldProps('password')} type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password"/>
            </div>
            <div className="input-group mb-5 d-flex justify-content-between">
            <div className="forgot">
                <Link to="/admin/recovery" style={{ fontSize: 'small' }}>
                  Forgot Password?
                </Link>
            </div>
              <ReCAPTCHA sitekey = '6Lc65jUpAAAAADT-5ay0NJYmGUXNfe0hMUGJQ8fa' onChange={(val) => setCapVal(val)} />
            </div>
            <div className="input-group mb-3">
              <button disabled={!capVal} type="submit" className="btn btn-lg btn-primary w-100 fs-6" style={{ marginTop: "-25px"}}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPassword;
