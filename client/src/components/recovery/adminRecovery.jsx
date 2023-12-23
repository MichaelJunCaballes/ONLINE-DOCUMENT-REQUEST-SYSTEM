import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { generateOTP, verifyOTP } from '../../helper/adminhelper';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/store3';

import Logo from '../../assets/biglogo.png'

function RegistrarRecovery() {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/admin/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
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
              <Link to= "/admin/login">
              <button className="btn btn-lg btn-primary w-100 fs-6 ml-auto">
                Back
              </button>
              </Link>
            </div>  
            <div className="header-text mb-4 col text-center">
              <h2>Recovery</h2>
            </div>


            <form onSubmit={onSubmit}>
            
            <div className="input-group mb-3">
              
              <div className="input input-group mb-3 text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  value={OTP}
                  className="form-control form-control-lg bg-light fs-6"
                  type="text"
                  placeholder="OTP"
                />
              </div>
            <div>
                <br />
            </div>
              <button type="submit" className="btn btn-lg btn-primary w-100 fs-6 ">
                Recover
              </button>
            </div>
            </form>
              <span>
                Can't get OTP?{' '}
                <button onClick={resendOTP} className="text-red-500">
                  Resend
                </button>
              </span>

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default RegistrarRecovery