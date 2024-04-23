import { USER_INFO_LOAD,Agent_LIST,USER_INFO_LOAD_ALL,SKILLSET_LIST, USER_INFO_ADD, USER_INFO_EDIT, USER_INFO_ROLES,
  VALIDATE_USER,VALIDATE_USEREXTN,VALIDATE_USEREMAIL,VALIDATE_USEREPHON, DISABLE_USER, ENTITY_EXISTS_FIND_USER,GROUP_LIST, APPROVE_USER, REJECT_USER  } from '../apiList';
import _ from 'lodash';

export function UserDataLoad(){
    return (dispatch,getState) => {
      let headers = new Headers()
      const token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      headers.append('Content-Type','application/json');
      let user_group = window.localStorage.getItem('userGroup')
      let url=''
    if (user_group ==null || user_group ==''){
        url=USER_INFO_LOAD_ALL
                }
      else{
        url=USER_INFO_LOAD+'?userGroup='+user_group
      }
      // headers.append('Accept','application/json');
      fetch(url, {
        method: 'Get',
        headers : headers,
        body: JSON.stringify()
      }).then((res) => res.json())
        .then((json) =>{
          if(json.status===401){
            window.location.href = '/'
           }
           else{
          if(json.status === 401){
            console.log("hi")
            // window.location.href = '/'
          }
          dispatch(UserDataLoadSuccess(json))
        }
        })
        .catch((error) =>{
          dispatch(UserError(error))
        })
      }
}
export function SkillSetLoad(){
  return (dispatch,getState) => {
      let headers = new Headers()
      
      let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      //headers.append("Authorization",token);
      // headers.append('Content-Type','application/json');
      // headers.append('Accept','application/json');
      fetch(SKILLSET_LIST, {
          method: 'GET',
          headers: headers,
        
      }).then((res) => res.json())
        .then((json) =>{
          if(json.status===401){
            window.location.href = '/'
           }
           else{
          dispatch(UserSkilldataSuccess(json))
           }
        })
        .catch((error) =>{
          dispatch(UserError(error))
        })   
      }
}
export function UserSkilldataSuccess(data){
  if(data.status === 200){
      return{
      type:'USER_SKILL_LOAD',
      skillData:data.value,
      isPending:false,
      }
  } else {
      return (UserError(data))
  }
  }

export function AgentLoad(){
    return (dispatch,getState) => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
        //headers.append("Authorization",token);
        // headers.append('Content-Type','application/json');
        // headers.append('Accept','application/json');
        fetch(Agent_LIST, {
            method: 'GET',
            headers:headers
          
        }).then((res) => res.json())
          .then((json) =>{
            if(json.status===401){
              window.location.href = '/'
             }
             else{
            dispatch(AgentdataSuccess(json))
             }
          })
          .catch((error) =>{
            dispatch(UserError(error))
          })   
        }
  }
  export function AgentdataSuccess(data){
    if(data.status === 200){
        return{
        type:'USER_AGENT_LOAD',
        agentData:data.value,
        isPending:false,
        }
    } else {
        return (UserError(data))
    }
    } 
export function UserDataLoadSuccess(data){
if(data.status === 200){
    return{
    type:'USER_MGM_LOAD',
    userData:data.value,
    isPending:false,
    }
} else {
    return (UserError(data))
}
}

export function UserRoleData(){
    return (dispatch,getState) => {
      let headers = new Headers()
      // const token = JSON.parse(window.localStorage.getItem('cbi_c_b_m_s_t'))
      // headers.append("Authorization",token);
      let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      headers.append('Content-Type','application/json');
      // headers.append('Accept','application/json');
      fetch(USER_INFO_ROLES, {
        method: 'Get',
        headers : headers,
        body: JSON.stringify()
      }).then((res) => res.json())
        .then((json) =>{
          if(json.status===401){
            window.location.href = '/'
           }
           else{
          dispatch(UserRoleDataSuccess(json))
           }
        })
        .catch((error) =>{
          dispatch(UserError(error))
        })
      }
}
export function UserRoleDataSuccess(data){
if(data.status === 200){
    return{
    type:'USER_ROLE_LOAD',
    rolesData:data.value,
    isPending:false,
    }
} else {
    return (UserError(data))
}
}

export function UserGroupsData(){
  return (dispatch,getState) => {
    let headers = new Headers()
    // const token = JSON.parse(window.localStorage.getItem('cbi_c_b_m_s_t'))
    // headers.append("Authorization",token);
    headers.append('Content-Type','application/json');
    let token = window.localStorage.getItem('accessToken')
    const tokenType = window.localStorage.getItem('tokenType')
    // console.log("LO STATE",  getState().LoginReducer)
    headers.append("Authorization",tokenType+ ' ' +token);
    // headers.append('Accept','application/json');
    fetch(GROUP_LIST, {
      method: 'Get',
      headers : headers,
      body: JSON.stringify()
    }).then((res) => res.json())
      .then((json) =>{
        if(json.status===401){
          window.location.href = '/'
         }
         else{
        dispatch(UserGroupDataSuccess(json))
         }
      })
      .catch((error) =>{
        dispatch(UserError(error))
      })
    }
}

export function checkUserStatus(obj){  
  return (dispatch, getState)  => {
      let headers = new Headers()
      let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      //headers.append("Authorization",token);
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
  fetch(VALIDATE_USER, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(obj)
  }).then((res) => res.json())
      .then(json => {
          if(json.status===401){
              window.location.href = '/'
             }
             else{
          if(json.status === 200) {
              dispatch({type : "USER_ID_CHECK", userIdStatus : json.value})
          } else {
              dispatch(UserError(json))
          }
      }
      })
      .catch(error => {
          dispatch(UserError(error))
      })
  }
}
export function checkUserPhoneStatus(obj){  
  return (dispatch, getState)  => {
      let headers = new Headers()
      let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      //headers.append("Authorization",token);
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
  fetch(VALIDATE_USEREPHON, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(obj)
  }).then((res) => res.json())
      .then(json => {
          if(json.status===401){
              window.location.href = '/'
             }
             else{
          if(json.status === 200) {
              dispatch({type : "USER_PHONE_CHECK", userPhoneStatus : json.value})
          } else {
              dispatch(UserError(json))
          }
      }
      })
      .catch(error => {
          dispatch(UserError(error))
      })
  }
}
export function checkUserExtnStatus(obj){  
  return (dispatch, getState)  => {
      let headers = new Headers()
      let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      //headers.append("Authorization",token);
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
  fetch(VALIDATE_USEREXTN, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(obj)
  }).then((res) => res.json())
      .then(json => {
          if(json.status===401){
              window.location.href = '/'
             }
             else{
          if(json.status === 200) {
              dispatch({type : "USER_EXTN_CHECK", userExtnStatus : json.value})
          } else {
              dispatch(UserError(json))
          }
      }
      })
      .catch(error => {
          dispatch(UserError(error))
      })
  }
}
export function checkUserEmailStatus(obj){  
  return (dispatch, getState)  => {
      let headers = new Headers()
      let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      //headers.append("Authorization",token);
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
  fetch(VALIDATE_USEREMAIL, {
      method: 'POST',
      headers : headers,
      body:JSON.stringify(obj)
  }).then((res) => res.json())
      .then(json => {
          if(json.status===401){
              window.location.href = '/'
             }
             else{
          if(json.status === 200) {
              dispatch({type : "USER_Email_CHECK", userEmailStatus : json.value})
          } else {
              dispatch(UserError(json))
          }
      }
      })
      .catch(error => {
          dispatch(UserError(error))
      })
  }
}
export function UserGroupDataSuccess(data){
  if(data.status === 200){
    console.log(data.value)
    console.log('check')
      return{
      type:'USER_GROUP_LOAD',
      userGroupsData:data.value,
      isPending:false,
      }
  } else {
      return (UserError(data))
  }
  }



export function addnewUser(newData){
    return (dispatch, getState) => {
    let headers = new Headers()
    let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    fetch(USER_INFO_ADD, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {
          if(json.status===401){
            window.location.href = '/'
           }
           else{
            dispatch(UserError(json))
            dispatch(UserDataLoad())
            dispatch(AgentLoad())
            if(json.status === 1001){
              dispatch(ApproveUser(json.value))
            }
            }
        })
        .catch(error => {
            dispatch(UserError(error))
        })
    }
}
export function editUser(newData){
    return (dispatch, getState)  => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
    fetch(USER_INFO_EDIT, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {
          if(json.status===401){
            window.location.href = '/'
           }
           else{
            dispatch(UserError(json))
            dispatch(UserDataLoad())
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(ApproveUser(json.value))
              dispatch(UserDataLoad())
            dispatch(AgentLoad())
            }
          }
        })
        .catch(error => {
            dispatch(UserError(error))
        })
    }
}

export function DisableUser(data) {
    return (dispatch, getState) => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
        fetch(DISABLE_USER, {
        method: 'POST',
        headers: headers,
        body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(json => {
          if(json.status===401){
            window.location.href = '/'
           }
           else{
            dispatch(UserError(json))
            // dispatch(UserDataLoad())
            if(json.status === 1001){
              dispatch(ApproveUser(json.value))
            }
          }
        })
        .catch  (error => {
        })
        }
}

export function ApproveUser(obj) {
  let headers = new Headers()
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return (dispatch, getState) => {
    // obj['approvedBy'] = getState().LoginReducer.loggedinData.userName;
    obj['approvedBy'] = 'SuperAdmin';
    obj['approverComment'] = 'approved';
    // let hash = hashCode(JSON.stringify(obj));
    // headers.append('X-PK-Signature', hash);
    // headers.append('X-PK-Timestamp', '14-06-2021');
    const token = getState().LoginReducer.accessToken;
    headers.append("Authorization", token);
    //dispatch(isPending())
    fetch( APPROVE_USER, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj)
    }).then((res) => res.json())
      .then((json) => {
        if(json.status===401){
          window.location.href = '/'
         }
         else{
        //dispatch(UserError(json))
        dispatch(UserDataLoad())
         }
      })
      .catch((error) => {
        dispatch(UserError(error))
        //  dispatch(LoadVerifyingItemsSuccess(data))
      })
  }
}
export function RejectUser(obj) {
  let headers = new Headers()
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return (dispatch, getState) => {
    // let hash = hashCode(JSON.stringify(obj));
    // headers.append('X-PK-Signature', hash);
    // headers.append('X-PK-Timestamp', '14-06-2021');
    const token = getState().LoginReducer.accessToken;
    headers.append("Authorization", token);
    //dispatch(isPending())
    fetch(REJECT_USER, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj)
    }).then((res) => res.json())
      .then((json) => {
        if(json.status===401){
          window.location.href = '/'
         }
         else{
        dispatch(UserError(json))
        dispatch(UserDataLoad())
        }
      })
      .catch((error) => {
        dispatch(UserError(error))
        //  dispatch(LoadVerifyingItemsSuccess(data))
      })
  }
}

export function IsEntityNameExists(obj) {

    let headers = new Headers()
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    return (dispatch, getState) => {
    //   let hash = hashCode(WebGLVertexArrayObject);
    //   headers.append('X-PK-Signature', hash);
    //   headers.append('X-PK-Timestamp', '14-06-2021');
      const token = getState().LoginReducer.accessToken;
      headers.append("Authorization", token);
      fetch(ENTITY_EXISTS_FIND_USER, {
        method: 'POST',
        headers: headers,
        body: obj
      }).then((res) => res.json())
        .then((json) => {
          if(json.status===401){
            window.location.href = '/'
           }
           else{
          dispatch(IsEntityNameExistsSuccess(json))
           }
        })
        .catch((error) => {
          dispatch(UserError(error))
        })
    }
  }
  export function IsEntityNameExistsSuccess(data) {
    if (data.status === 1001) {
      return {
        type: 'USER_ENTITY_CHECK',
        userEntity: data.value
      }
    } else {
      return {
        type: 'USER_ENTITY_CHECK',
        userEntity: false
      }
    }
  }


export function UserError(error){
    return{
        type: 'USER_VIEW_ERROR',
        message: error.message,
        showerror:true,
        isPending:false
        }
}
export function UserErrorClose(){
    return{
        type:'USER_VIEW_ERROR',
        showerror:false,
        message:''
    }
}