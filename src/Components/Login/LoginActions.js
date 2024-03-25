import {URL_API_LOGIN, URL_API_LOGOUT, URL_API_VALIDATE_OTP,URL_API_CHANGE_PASSWORD} from '../apiList';
import _ from 'lodash';
const successResponse = [
{
  "statusCode": 200,
  "status": "success",
  "message": "User loggedIn successfully!",
  "value": {
      "firstName": "Admin",
      "lastName": "",
      "userName": "Admin",
      "email": "admin@reminder.com",
      "password": "Welcome@123",
      "role": "admin",
      "clientId": "e10c4434-733f-539c-84e9-e60d2af2f657",
      "userId": "10264d4c-036a-51b1-b42a-a7e7dff26324",
      "resetPasswordToken": null,
      "resetPasswordExpires": null,
      "createdAt": "2021-04-26T14:17:17.000Z",
      "updatedAt": "2021-08-04T06:42:20.000Z"
  },
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjY0ZDRjLTAzNmEtNTFiMS1iNDJhLWE3ZTdkZmYyNjMyNCIsInVzZXIiOiJyb2hpbmlwIiwic2NvcGUiOiJhZG1pbiIsImF1dGgiOjE2MzE2ODExMzIwMTcsImlhdCI6MTYzMTY4MTEzMiwiZXhwIjoxNjMxNjg0NzMyfQ.VHS1mG3wIogzb3auJ8h7svpuLJo9Igw8l9qaw79MbX4",
  "expires_in": 1631684732,
  "expires_seconds": "3600"
},
{
  "statusCode": 200,
  "status": "success",
  "message": "User loggedIn successfully!",
  "value": {
      "firstName": "Testuser",
      "lastName": "",
      "userName": "Testuser",
      "email": "tsetuser@reminder.com",
      "password": "Welcome@123",
      "role": "user",
      "clientId": "e10c4434-733f-539c-84e9-e60d2af2f657",
      "userId": "10264d4c-036a-51b1-b42a-a7e7dff26324",
      "resetPasswordToken": null,
      "resetPasswordExpires": null,
      "createdAt": "2021-04-26T14:17:17.000Z",
      "updatedAt": "2021-08-04T06:42:20.000Z"
  },
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjY0ZDRjLTAzNmEtNTFiMS1iNDJhLWE3ZTdkZmYyNjMyNCIsInVzZXIiOiJyb2hpbmlwIiwic2NvcGUiOiJhZG1pbiIsImF1dGgiOjE2MzE2ODExMzIwMTcsImlhdCI6MTYzMTY4MTEzMiwiZXhwIjoxNjMxNjg0NzMyfQ.VHS1mG3wIogzb3auJ8h7svpuLJo9Igw8l9qaw79MbX4",
  "expires_in": 1631684732,
  "expires_seconds": "3600"
},
{
  "statusCode": 200,
  "status": "success",
  "message": "User loggedIn successfully!",
  "value": {
      "firstName": "SehaUser1",
      "lastName": "",
      "userName": "sehauser1",
      "email": "tsetuser@reminder.com",
      "password": "Sehauser1@321",
      "role": "user",
      "clientId": "e10c4434-733f-539c-84e9-e60d2af2f657",
      "userId": "10264d4c-036a-51b1-b42a-a7e7dff26324",
      "resetPasswordToken": null,
      "resetPasswordExpires": null,
      "createdAt": "2021-04-26T14:17:17.000Z",
      "updatedAt": "2021-08-04T06:42:20.000Z"
  },
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjY0ZDRjLTAzNmEtNTFiMS1iNDJhLWE3ZTdkZmYyNjMyNCIsInVzZXIiOiJyb2hpbmlwIiwic2NvcGUiOiJhZG1pbiIsImF1dGgiOjE2MzE2ODExMzIwMTcsImlhdCI6MTYzMTY4MTEzMiwiZXhwIjoxNjMxNjg0NzMyfQ.VHS1mG3wIogzb3auJ8h7svpuLJo9Igw8l9qaw79MbX4",
  "expires_in": 1631684732,
  "expires_seconds": "3600"
},
{
  "statusCode": 200,
  "status": "success",
  "message": "User loggedIn successfully!",
  "value": {
      "firstName": "sehaUser2",
      "lastName": "",
      "userName": "sehauser2",
      "email": "tsetuser@reminder.com",
      "password": "Sehauser2@987",
      "role": "subadmin",
      "clientId": "e10c4434-733f-539c-84e9-e60d2af2f657",
      "userId": "10264d4c-036a-51b1-b42a-a7e7dff26324",
      "resetPasswordToken": null,
      "resetPasswordExpires": null,
      "createdAt": "2021-04-26T14:17:17.000Z",
      "updatedAt": "2021-08-04T06:42:20.000Z"
  },
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjY0ZDRjLTAzNmEtNTFiMS1iNDJhLWE3ZTdkZmYyNjMyNCIsInVzZXIiOiJyb2hpbmlwIiwic2NvcGUiOiJhZG1pbiIsImF1dGgiOjE2MzE2ODExMzIwMTcsImlhdCI6MTYzMTY4MTEzMiwiZXhwIjoxNjMxNjg0NzMyfQ.VHS1mG3wIogzb3auJ8h7svpuLJo9Igw8l9qaw79MbX4",
  "expires_in": 1631684732,
  "expires_seconds": "3600"
},
{
  "statusCode": 200,
  "status": "success",
  "message": "User loggedIn successfully!",
  "value": {
      "firstName": "Indumathi",
      "lastName": "P",
      "userName": "indu_pbx",
      "email": "indu.pbx@reminder.com",
      "password": "Welcome@123",
      "role": "calladmin",
      "clientId": "e10c4434-733f-539c-84e9-e60d2af2f657",
      "userId": "10264d4c-036a-51b1-b42a-a7e7dff26324",
      "resetPasswordToken": null,
      "resetPasswordExpires": null,
      "createdAt": "2021-04-26T14:17:17.000Z",
      "updatedAt": "2021-08-04T06:42:20.000Z"
  },
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjY0ZDRjLTAzNmEtNTFiMS1iNDJhLWE3ZTdkZmYyNjMyNCIsInVzZXIiOiJyb2hpbmlwIiwic2NvcGUiOiJhZG1pbiIsImF1dGgiOjE2MzE2ODExMzIwMTcsImlhdCI6MTYzMTY4MTEzMiwiZXhwIjoxNjMxNjg0NzMyfQ.VHS1mG3wIogzb3auJ8h7svpuLJo9Igw8l9qaw79MbX4",
  "expires_in": 1631684732,
  "expires_seconds": "3600"
}

]

const successResponseUser = 
{
  "statusCode": 200,
  "status": "success",
  "message": "User loggedIn successfully!",
  "value": {
      "firstName": "Testuser",
      "lastName": "",
      "userName": "Testuser",
      "email": "tsetuser@reminder.com",
      "password": "$2b$10$tH4OOON5HEmpmlVm.w7Cr.PogXDUQUqyWgLCnsCjKOxpWwaoApfAi",
      "role": "user",
      "clientId": "e10c4434-733f-539c-84e9-e60d2af2f657",
      "userId": "10264d4c-036a-51b1-b42a-a7e7dff26324",
      "resetPasswordToken": null,
      "resetPasswordExpires": null,
      "createdAt": "2021-04-26T14:17:17.000Z",
      "updatedAt": "2021-08-04T06:42:20.000Z"
  },
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjY0ZDRjLTAzNmEtNTFiMS1iNDJhLWE3ZTdkZmYyNjMyNCIsInVzZXIiOiJyb2hpbmlwIiwic2NvcGUiOiJhZG1pbiIsImF1dGgiOjE2MzE2ODExMzIwMTcsImlhdCI6MTYzMTY4MTEzMiwiZXhwIjoxNjMxNjg0NzMyfQ.VHS1mG3wIogzb3auJ8h7svpuLJo9Igw8l9qaw79MbX4",
  "expires_in": 1631684732,
  "expires_seconds": "3600"
}

export function LoginAttemptAction(obj){
  let headers = new Headers()
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');  
  
  return dispatch => {
    //if((obj.userName === 'Admin' || obj.userName === 'Testuser' || obj.userName === 'sehauser1' || obj.userName === 'sehauser2') && obj.password === 'Welcome@123') {
    // if( _.find(successResponse,{value:{userName:obj.userName}})) {
    //   let logindata = _.find(successResponse,{value:{userName:obj.userName}})
    //   if(logindata.value.password === obj.password) {
    //     dispatch(LoginAttemptActionSuccess(logindata))  
    //   } else {
    //       const error = {'message' : 'Login Failed. Plese Enter valid Password'}
    //       dispatch(loginerror(error))
    //   } 
    // } else {
    //   const error = {'message' : 'Login Failed. Plese Enter valid Username'}
    //   dispatch(loginerror(error))
    // }
    dispatch(LoginAttemptActionPending())
    fetch(URL_API_LOGIN, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(obj)
    }).then((res) => res.json())
      .then((json) =>{
        dispatch(LoginAttemptActionSuccess(json))
        dispatch(makeShowmodalFalse())
      })
      .catch((error) =>{
        dispatch(LoginAttemptActionSuccess(successResponse))
        dispatch(makeShowmodalFalse())
        //dispatch(loginerror(error))       
      })   
    }
}
export function LoginAttemptActionPending(){
  return{
    type:'LOGIN_ACTION_PENDING',
    isPending:true
  }
}
export function LoginAttemptActionSuccess(data){
  // console.log(data.value['accessToken'])
  if(data.status === 1001){  
    window.localStorage.setItem('accessToken',data.value['accessToken'])
    window.localStorage.setItem('tokenType',data.value['tokenType'])
    
    window.localStorage.setItem('userGroup', data.value['userGroupName'])
    window.localStorage.setItem('role',data.value['roles'])
    // window.localStorage.setItem('email', JSON.stringify(input.email))
    return{
      type:'LOGIN_ACTION_SUCCESS',
      showerror:false,
      message:data.message,
      loggedinData:data.value,
      accessToken:" "+data.value['accessToken'],
      isPending:false,     
    }
  } else {
    return (loginerror(data))    
  }
}


export function LoginChangePassword(obj){
  let headers = new Headers()
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');  
  
  return dispatch => {
    //if((obj.userName === 'Admin' || obj.userName === 'Testuser' || obj.userName === 'sehauser1' || obj.userName === 'sehauser2') && obj.password === 'Welcome@123') {
    // if( _.find(successResponse,{value:{userName:obj.userName}})) {
    //   let logindata = _.find(successResponse,{value:{userName:obj.userName}})
    //   if(logindata.value.password === obj.password) {
    //     dispatch(LoginAttemptActionSuccess(logindata))  
    //   } else {
    //       const error = {'message' : 'Login Failed. Plese Enter valid Password'}
    //       dispatch(loginerror(error))
    //   } 
    // } else {
    //   const error = {'message' : 'Login Failed. Plese Enter valid Username'}
    //   dispatch(loginerror(error))
    // }
    
    fetch(URL_API_CHANGE_PASSWORD, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(obj)
    }).then((res) => res.json())
      .then((json) =>{
        dispatch(changePasswordActionSuccess(json))
        
      })
      .catch((error) =>{
        dispatch(changePasswordActionSuccess(successResponse))
       
        //dispatch(loginerror(error))       
      })   
    }
}
export function changePasswordActionSuccess(data){
  // console.log(data.value['accessToken'])
  if(data.status === 1001){  
   
    // window.localStorage.setItem('email', JSON.stringify(input.email))
    return{
      type:'CHANGE_PASSWORD',
      showerror:true,
      message:data.message,
      
      isPending:false,     
    }
  } else {
    return (loginerror(data))    
  }
}
// export function LoginAttemptWithOTP(obj){
//   let headers = new Headers()
//   headers.append('Content-Type','application/json');
//   headers.append('Accept','application/json');   
//   return  (dispatch, getState) => {
//     const token = getState().LoginReducer.accessToken;  
//     headers.append("Authorization", token);
//     dispatch(LoginAttemptActionPending())
//     fetch(URL_API_VALIDATE_OTP, {
//       method: 'POST',
//       headers : headers,
//       body:JSON.stringify(obj)
//     }).then((res) => res.json())
//       .then((json) =>{
//         dispatch(LoginAttemptWithOTPSuccess(json))
//         dispatch(makeShowmodalFalse())
//       })
//       .catch((error) =>{
//         dispatch(loginerror(error))
//       })   
//     }
// }
// export function LoginAttemptWithOTPSuccess(data){
//   if(data.status === 1001){  
//     return{
//       type:'LOGIN_ACTION_SUCCESS_OTP',
//       showerror:false,
//       authorized:true,
//       showOtp:false,
//       isPending:false,     
//     }
//   } else {
//     return (loginerror(data))    
//   }
// }
export function LogoutAction(history){  
  let headers = new Headers()
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  history.push("/")
  return  (dispatch, getState) => {
    console.log(getState().LoginReducer.loggedinData)
    const userName = getState().LoginReducer.loggedinData.userName;  
    const token = getState().LoginReducer.accessToken;  
    let obj = {'employeeId':userName, "token": token}
    headers.append("Authorization", token);
    dispatch(LoginAttemptActionPending())
    fetch(URL_API_LOGOUT, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(obj)
    }).then((res) => res.json())
      .then((json) =>{    
        dispatch(LogoutActionSuccess(json))
      })
      .catch((error) =>{dispatch(LogoutActionSuccess(error))
      })   
    }
}
export function LogoutActionSuccess(){
  return {
    type:"LOG_OUT"
  }
}
export function loginerror(data){
  return {
    type:'LOGIN_ACTION_ERROR',
    message:data.message,
    showerror:true,
    isPending:false,
    loggedinData:{},
    accessToken:""
  }
}
export function DashboardAction(value){
  return{
    type:'LOGIN_ACTION_DASHBOARD',
    isOpen:value
  }
}
export function closeModalPopUp(){
  return{
    type:'LOGIN_ACTION_MODAL_CLOSE',
    showerror:false
  }
}
export function showModalLoginModal(){
  return{
    type:"SHOW_LOGIN_MODAL",
    showModalLogin:true,
  }

}
export function makeShowmodalFalse(){
  return{
    type:"SHOW_LOGIN_MODAL_FALSE",
    showModalLogin:false
  }
}

