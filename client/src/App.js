import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Landing Page
import LandingPage from './components/landing/landingPage'

// Import Login Page for each roles (STUDENT, REGISTRAR, and ADMIN)
import StudentLogin from './components/login/studentLogin';
import RegistrarLogin from './components/login/registrarLogin';
import AdminLogin from './components/login/adminLogin';

// Import Login Page for only student and registrar
import StudentSignup from './components/signup/studentSignup';
import RegistrarSignup from './components/signup/registrarSignup';

// Import Password Page
import StudentPassword from './components/password/studentPassword';
import RegistrarPassword from './components/password/registrarPassword';
import AdminPassword from './components/password/adminPassword';

// Import Dashboards
import StudentDashboard from './components/dashboards/studentDashboard';
import RegistrarDashboard from './components/dashboards/registrarDashboard';
import AdminDashboard from './components/dashboards/adminDashboard';

// Import Request Frontend for Student
import StudentRequest from './components/request document/studentRequest';
import StudentRequestForm from './components/request document/studentRequestForm';

// Import Profile Page
import StudentProfile from './components/profiles/studentProfile';
import RegistrarProfile from './components/profiles/registrarProfile';
import AdminProfile from './components/profiles/adminProfile';

// Import Recovery Page
import StudentRecovery from './components/recovery/studentRecovery';
import RegistrarRecovery from './components/recovery/registrarRecovery';
import AdminRecovery from './components/recovery/adminRecovery';

import StudentReset from './components/reset/studentReset';
import RegistrarReset from './components/reset/registrarReset';
import AdminReset from './components/reset/adminReset';

// Import Student Document Tracking
import StudentTracking from './components/tracking/studentTracking';

// Import Edit Profile Pages
import StudentEdit from './components/profiles/studentEdit.jsx';
import RegistrarEdit from './components/profiles/registrarEdit.jsx';
import AdminEdit from './components/profiles/adminEdit.jsx';

// // Import Tools etc
// import axios from 'axios';

// Import auth Middleware
import { AuthorizeUser, ProtectRoute } from './middleware/Auth.js';
import { AuthorizeUser2, ProtectRoute2 } from './middleware/Auth2.js';
import { AuthorizeUser3, ProtectRoute3 } from './middleware/Auth3.js';


function App() {
  return (
    <Router>
      <Routes>
      {/* Landing Page */}
      <Route path="/" element={<>
        <LandingPage/>
      </>} />

      {/* Login Pages */}
      <Route path="/student/login" element={<>
        <StudentLogin/>
      </>} />
      <Route path="/registrar/login" element={<>
        <RegistrarLogin/>
      </>} />
      <Route path="/admin/login" element={<>
        <AdminLogin/>
      </>} />
      {/* Password Page */}
      <Route path="/student/password" element={<>
        <StudentPassword/>
      </>} />
      <Route path="/registrar/password" element={<>
        <RegistrarPassword/>
      </>} />
      <Route path="/admin/password" element={<>
        <AdminPassword/>
      </>} />
      
      {/* Signup Pages */}
      <Route path="/student/signup" element={<>
        <StudentSignup/>
      </>} />
      <Route path="/registrar/signup" element={<>
        <RegistrarSignup/>
      </>} />

      {/* Dashboard Pages */}
      <Route path="/student/dashboard" element={<>
        <StudentDashboard/>
      </>} />
      
      <Route path="/registrar/dashboard" element={<>
        <RegistrarDashboard/>
      </>} />
      
      <Route path="/admin/dashboard" element={<>
        <AdminDashboard/>
      </>} />

      {/* Student Request */}
      <Route path="/student/request" element={<>
        <StudentRequest/>
      </>} />
      <Route path="/student/request/form" element={<>
        <StudentRequestForm/>
      </>} />

      {/* Profiles */}
      <Route path="/student/profile" element={<>
        <StudentProfile/>
      </>} />
      <Route path="/registrar/profile" element={<>
        <RegistrarProfile/>
      </>} />
      <Route path="/admin/profile" element={<>
        <AdminProfile/>
      </>} />

      {/* Edit Profile */}
      <Route path="/student/profile/edit" element={<>
        <StudentEdit/>
      </>} />
      <Route path="/registrar/profile/edit" element={<>
        <RegistrarEdit/>
      </>} />
      <Route path="/admin/profile/edit" element={<>
        <AdminEdit/>
      </>} />
      
      {/* Student Document Tracking */}
      <Route path="/student/tracking" element={<>
        <StudentTracking/>
      </>} />

      {/* Recovery and Reset */}
      <Route path="/student/recovery" element={<>
        <StudentRecovery/>
      </>} />
      <Route path="/registrar/recovery" element={<>
        <RegistrarRecovery/>
      </>} />
      <Route path="/admin/recovery" element={<>
        <AdminRecovery/>
      </>} />
      <Route path="/student/reset" element={<>
        <StudentReset/>
      </>} />
      <Route path="/registrar/reset" element={<>
        <RegistrarReset/>
      </>} />
      <Route path="/admin/reset" element={<>
        <AdminReset/>
      </>} />
      </Routes>
    </Router>
  );
}

export default App;
