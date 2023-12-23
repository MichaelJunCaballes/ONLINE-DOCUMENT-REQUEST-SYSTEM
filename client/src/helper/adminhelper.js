import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** Make API Requests */


/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/admin/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/admin/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}


/** register user function */
export async function registerUser(credentials) {
    try {
      const response = await axios.post('/admin/register', credentials);
  
      const { data, status } = response;
      const { msg } = data;
  
      const { username, email } = credentials;
  
      // Send email if the registration is successful
      if (status === 201) {
        await axios.post('/admin/registerMail', { username, userEmail: email, text: msg });
      }
  
      return Promise.resolve(msg);
    } catch (error) {
      // Log the detailed error for debugging purposes
      console.error('Error in registerUser:', error);
  
      let serverError; // Define 'serverError' here
  
      if (error.response) {
        const { data, status } = error.response;
  
        if (data && data.error) {
          serverError = data.error; // Assign 'serverError' here
  
          // Return specific error messages based on the status code
          if (status === 400) {
            return Promise.reject({ validationError: serverError });
          } else if (status === 409) {
            return Promise.reject({ conflictError: serverError });
          }
        }
      }
  
      // Return a generic error message for unexpected errors
      return Promise.reject({ serverError });
    }
  }
  
  


/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/admin/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/admin/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/admin/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/admin/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/admin/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/admin/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}