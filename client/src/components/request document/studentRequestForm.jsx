import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook';
import { createDocumentRequest } from '../../helper/requesthelper';
import toast from 'react-hot-toast';
import Logo from '../../assets/biglogo.png'

const validationSchema = Yup.object({
  documentType: Yup.string().required('Document type is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  description: Yup.string().required('Description is required'),
  mobile: Yup.string().required('Phone number is required'),
  lrnNo: Yup.string().required('LRN number is required'),
});

function StudentRequestForm() {
  const linkStyle = {
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      documentType: '',
      email: '',
      description: '',
      mobile: '',
      lrnNo: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createDocumentRequest(values);
        console.log(response);

        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success(response || 'Document Request Created Successfully');
          navigate('/student/request');
        }
      } catch (error) {
        console.error('Error creating document request:', error);
        toast.error('Failed to create document request');
      }
    },
  });

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
                    <h2 className="fs-2 m-0">Request Form</h2>
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
    {/* Form Content */}
    <div style={{ marginLeft: '30px', backgroundColor: 'white', marginRight: "10px", borderRadius: "25px" , width: "70%", height: "80%"}}>
    <form onSubmit={formik.handleSubmit}>
    <section>
  <div className="container py-5" style={{ width: "95%",marginLeft: "20px"}}>
    <div className="row">

        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Document Type</p>
              </div>
              <div className="col-sm-9">
              <input {...formik.getFieldProps('documentType')} className="form-control form-control-lg bg-light fs-6" type="text" placeholder='ex. Transcript' />
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
                <p className="mb-0">Description</p>
              </div>
              <div className="col-sm-9">
              <input {...formik.getFieldProps('description')} className="form-control form-control-lg bg-light fs-6"  type="text" placeholder='State the reason of request' />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone No.</p>
              </div>
              <div className="col-sm-9">
              <input {...formik.getFieldProps('mobile')} className="form-control form-control-lg bg-light fs-6"  type="text" placeholder='ex. 09313684814' />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">LRN No.</p>
              </div>
              <div className="col-sm-9">
              <input {...formik.getFieldProps('lrnNo')} className="form-control form-control-lg bg-light fs-6"  type="text" placeholder='ex. 126719313123' />
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-end gap-2 mb-2">
            <Link to='/student/request' >
              <button type="button" className="btn btn-primary">Cancel Request</button>
            </Link>
              <div></div>
              <button type="submit" className="btn btn-primary" >Confirm Request</button>
              
            </div>
        </div>
      </div>
    </div>
    </div>
  </section>

    </form>
    </div>

          
</div>
</div>
  )
}

export default StudentRequestForm