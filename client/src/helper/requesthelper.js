// requesthelper.js
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Helper function to create a document request
// Helper function to create a document request
export async function createDocumentRequest(requestData) {
  try {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    console.log("Request URL:", `${process.env.REACT_APP_SERVER_DOMAIN}/student/create`);
    console.log("Request Data:", requestData);
    
    const response = await axios.post('/student/create', requestData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data; // Extract data property from the response
  } catch (error) {
    console.error("Error:", error);
    return { error: error.response?.data?.message || 'Internal Server Error. Please try again later.' };
  }
}
  
  // Helper function to get all document requests for a specific student
  export async function getAllDocumentRequests(studentId) {
    try {
      const response = await axios.get(`/student/all/${studentId}`);

      return { data: response.data, status: response.status };
    } catch (error) {
      return { error };
    }
  }
  
  // Helper function to update document request status
  export async function updateDocumentRequestStatus(documentRequestId, status) {
    try {
      const response = await axios.put(`/student/update/${documentRequestId}`, { status });
      
      return { data: response.data, status: response.status };
    } catch (error) {
      return { error };
    }
  }
  
  // Helper function to delete document request
  export async function deleteDocumentRequest(documentRequestId) {
    try {
       const response = await axios.delete(`/student/delete/${documentRequestId}`);

      return { data: response.data, status: response.status };
    } catch (error) {
      return { error };
    }
  }