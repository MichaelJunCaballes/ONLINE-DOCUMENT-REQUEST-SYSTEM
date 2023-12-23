import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';



import useFetch from '../../hooks/fetch.hook3';

import avatar from '../../assets/profile.png';
import extend from './profile.module.css'
import Logo from '../../assets/biglogo.png'

function AdminProfile() {
    const linkStyle = {
        textDecoration: 'none', // Remove underline    
        cursor: 'pointer',      // Change cursor on hover
        /* Add any other styles you want */
      };

  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
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
            <Link to="/admin/dashboard" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />Dashboard
            </Link>
            <Link to="/admin/profile" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />User Profile
            </Link>
            <Link to="/admin/accounts" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />User Accounts
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
          <li className="nav-item dropdow n">
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
    <div style={{ marginLeft: '30px', backgroundColor: 'white', marginRight: "10px", borderRadius: "25px" , width: "70%"}}>
    <section>
  <div className="container py-5">
    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
          <label htmlFor='profile'>
              <img src={apiData?.profile || avatar} className={`${extend.profile_img}`} style={{ width: "100%", borderRadius: "99px" }} alt="avatar" />
              </label>
            <h5 className="my-3">{apiData?.firstName || ''} {apiData?.lastName || ''}</h5>
           
            <div className="d-flex justify-content-center mb-2">
              <Link to='/admin/profile/edit' >
              <button type="button" className="btn btn-primary">Update Profile</button>
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
                <p className="text-muted mb-0">{apiData?.firstName || ''} {apiData?.lastName || ''}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{apiData?.email || ''}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone No</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{apiData?.mobile || ''}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Gender</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{apiData?.gender || ''}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{apiData?.address || ''}</p>
              </div>
            </div>
          </div>
        </div></form>
    </div></div>
  </section>
    </div>
  </div>
</div>
  )
}

export default AdminProfile