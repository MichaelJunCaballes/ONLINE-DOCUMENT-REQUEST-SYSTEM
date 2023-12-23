import toast from 'react-hot-toast'
import { authenticate } from './studenthelper'

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        // check user exist or not
        const { status } = await authenticate(values.username);
        
        if(status !== 200){
            errors.exist = toast.error('User does not exist...!')
        }
    }

    return errors;
}

/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

/** validate register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}


/** ************************************************* */

/** validate password */
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}


/** validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

/** validate email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}


// Validate document request data
export async function validateDocumentRequest(data) {
    const errors = {};
  
    if (!data.documentType) {
      errors.documentType = 'Document type is required.';
    }
  
    if (!data.description) {
      errors.description = 'Description is required.';
    }

    if (!data.mobile) {
        errors.mobile = 'Mobile number is required.';
    }

    if (!data.lrnNo) {
      errors.lrnNo = 'LRN number is required.';
    }
    
    // Add additional validations as needed

    return errors;
}
  
  // Validate studentId for getAllDocumentRequests
  export async function validateStudentId(studentId) {
    const errors = {};
  
    if (!studentId) {
      errors.studentId = toast.error('Student ID is required.');
    }
  
    // Add additional validations as needed
  
    return errors;
  }
  
  // Validate status for updateDocumentRequestStatus
  export async function validateUpdateDocumentRequestStatus(status) {
    const errors = {};
  
    if (!status) {
      errors.status = toast.error('Status is required.');
    }
  
    // Add additional validations as needed
  
    return errors;
  }
  
  // Validate documentRequestId for deleteDocumentRequest
  export async function validateDocumentRequestId(documentRequestId) {
    const errors = {};
  
    if (!documentRequestId) {
      errors.documentRequestId = toast.error('Document Request ID is required.');
    }
  
    // Add additional validations as needed
  
    return errors;
  }