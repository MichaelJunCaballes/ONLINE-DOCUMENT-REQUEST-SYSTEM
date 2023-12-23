import React, {useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../../helper/validate3';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook3';
import { updateUser } from '../../helper/adminhelper';

import './profile.module.css'
import Logo from '../../assets/biglogo.png'

function AdminEdit() {
    const linkStyle = {
        textDecoration: 'none', // Remove underline    
        cursor: 'pointer',      // Change cursor on hover
        /* Add any other styles you want */
      };

      const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || '',
      gender : apiData?.gender || '',
      gradeLevel : apiData?.gradeLevel || '',
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });
      navigate('/admin/profile')

    }
  })

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }


  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="d-flex" id="wrapper">
      <Toaster position='bottom-right' reverseOrder={false}></Toaster>
  {/* Sidebar */}
  <div className="bg-white" id="sidebar-wrapper">
            <div className="featured-image mb-3">
                <img src={Logo} className="img-fluid" style={{ width: 70, marginLeft: "85px", marginTop: "20px" }} alt="Logo" />
                <hr />
            </div>
            <div className="list-group list-group-flush my-3">
            <Link to="/registrar/dashboard" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />Dashboard
            </Link>
            <Link to="/registrar/request" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />Request Document
            </Link>
            <Link to="/registrar/profile" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />User Profile
            </Link>
            <Link to="/registrar/tracking" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />Document Tracking
            </Link>
            
            </div>
        </div>
  {/* /#sidebar-wrapper */}
  {/* Page Content */}
  <div id="page-content-wrapper">
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
      <div className="d-flex align-items-center">
        <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
        <h2 className="fs-2 m-0">Admin Profile</h2>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user me-2" />Welcome, {apiData?.firstName || apiData?.username || 'Loading...'}!
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              
              <li><a className="dropdown-item" onClick={userLogout}>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>


    {/* Profile Content */}
    <div style={{ marginLeft: '30px', backgroundColor: 'white', marginRight: "10px", borderRadius: "25px" , width: "70%", height: "80%"}}>
    <form onSubmit={formik.handleSubmit}>
    <section>
  <div className="container py-5">
    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            <h5 className="my-3">{apiData?.firstName || ''} {apiData?.lastName || ''}</h5>
           
            <div className="d-flex justify-content-center mb-2">
              
              <button type="submit" className="btn btn-primary" >Update</button>
              
            </div>
            <div className="d-flex justify-content-center mb-2">
            <Link to='/admin/profile' >
              <button type="button" className="btn btn-primary">Cancel</button>
            </Link>
            </div>
          </div>
        </div>
      </div>
      <form className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
              <input {...formik.getFieldProps('firstName')} className="form-control form-control-lg bg-light fs-6" type="text" placeholder='FirstName*' />
              <input {...formik.getFieldProps('lastName')}  className="form-control form-control-lg bg-light fs-6" type="text" placeholder='LastName*' />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
              <input {...formik.getFieldProps('email')} className="form-control form-control-lg bg-light fs-6" type="text" placeholder='ex. example@gmail.com' />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone No</p>
              </div>
              <div className="col-sm-9">
                <input {...formik.getFieldProps('mobile')} className="form-control form-control-lg bg-light fs-6" type="text" placeholder='ex. 09234154234' />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Gender</p>
              </div>
              <div className="col-sm-9">
              <input {...formik.getFieldProps('gender')} className="form-control form-control-lg bg-light fs-6" type="text" placeholder='ex. Female'/>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <input {...formik.getFieldProps('address')} className="form-control form-control-lg bg-light fs-6" type="text" placeholder='ex. Valencia, Bukidnon' />
              </div>
            </div>
          </div>
        </div></form>
    </div></div>
  </section>

    </form>
    </div>
  </div>
</div>
  )
}

export default AdminEdit