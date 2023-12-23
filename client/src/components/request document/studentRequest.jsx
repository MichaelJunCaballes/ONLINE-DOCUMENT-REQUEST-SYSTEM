import React from 'react';
import './studentRequest.css';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook';


import Logo from '../../assets/biglogo.png'

function StudentRequest() {
    const linkStyle = {
        textDecoration: 'none', // Remove underline    
        cursor: 'pointer',      // Change cursor on hover
        /* Add any other styles you want */
      };

      const [{ isLoading, apiData, serverError }] = useFetch();
      const navigate = useNavigate();

      // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

      if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
      if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <div className="d-flex" id="wrapper">
  {/* Sidebar */}
  <div className="bg-white" id="sidebar-wrapper">
            <div className="featured-image mb-3">
                <img src={Logo} className="img-fluid" style={{ width: 70, marginLeft: "85px", marginTop: "20px" }} alt="Logo" />
                <hr />
            </div>
            <div className="list-group list-group-flush my-3">
            <Link to="/student/dashboard" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />Dashboard
            </Link>
            <Link to="/student/request" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />Requests
            </Link>
            <Link to="/student/profile" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
                <i className="fas fa-tachometer-alt me-2" />User Profile
            </Link>
            <Link to="/student/tracking" style={linkStyle} className="list-group-item list-group-item-action bg-transparent second-text active">
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
                    <h2 className="fs-2 m-0">Requests</h2>
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
        {/* Requests History */}
        <div className="row my-5" style={{ marginLeft: "20px", marginRight: "20px", width: "70%"}}>
                    <Link to='/student/request/form' className='d-flex justify-content-end'>
                      <button type='button' className='btn btn-primary'>
                        Request a Document
                      </button>
                    </Link>
                    <h3 className="fs-4 mb-3">Request History</h3>
                    <div className="col">
                        <table className="table bg-white rounded shadow-sm  table-hover">
                        <thead>
                            <tr>
                            <th scope="col" width={50}>#</th>
                            <th scope="col">DOCUMENT</th>
                            <th scope="col">USERNAME</th>
                            <th scope="col">GMAIL</th>
                            <th scope="col">DATE OF REQUEST</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td />
                            <td />
                            <td />
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>

          
</div>
</div>
  )
}

export default StudentRequest