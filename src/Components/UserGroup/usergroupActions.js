import {CREATE_GROUP,EDIT_GROUP,GROUP_LIST,RealTime_Dashboard} from '../apiList'

export function UserGroupLoad(){
    return (dispatch,getState) => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        //headers.append("Authorization",token);
        // headers.append('Content-Type','application/json');
        // headers.append('Accept','application/json');
        fetch(GROUP_LIST, {
            method: 'GET',
            headers:headers
          
        }).then((res) => res.json())
          .then((json) =>{
            dispatch(UserGroupLoadSuccess(json))
          })
          .catch((error) =>{
            dispatch(UserGroupEditError(error))
          })   
        }
}
export function addUserGroup(newData){  
    return (dispatch, getState) => {
    let headers = new Headers()
    // const token = getState().LoginReducer.accessToken; 
    // headers.append("Authorization",token);
    let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
    headers.append('Content-Type','application/json');
    // headers.append('Accept','application/json');
    fetch(CREATE_GROUP, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {        
            dispatch(UserGroupEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(UserGroupLoad())
            }
        })
        .catch(error => {
            dispatch(UserGroupEditError(error))
        })
    }
}
export function editUserGroup(newData){  
    return (dispatch, getState) => {
    let headers = new Headers()
    let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
    // const token = getState().LoginReducer.accessToken; 
    // headers.append("Authorization",token);
    headers.append('Content-Type','application/json');
    // headers.append('Accept','application/json');
    fetch(EDIT_GROUP, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {        
            dispatch(UserGroupEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(UserGroupLoad())
            }
        })
        .catch(error => {
            dispatch(UserGroupEditError(error))
        })
    }
}

export function UserGroupLoadSuccess(data){
if(data.status === 200){  
    console.log('hi')
    return{
    type:'UserGroup_LOAD',  
    userData:data.value,
    isPending:false,     
    }
} else {
    return (UserGroupEditError(data))    
}
}


export function UserGroupEditError(error){ 
    console.log('his')
    return{
        type: 'UserGroup_ERROR',
        message: error.message,
        
        showerror:true,
        isPending:false  
        } 
}
export function UserGroupEditErrorClose(){
    console.log('hie')
    return{
        type:'USERGROUP_VIEW_ERROR_CLOSE',
        showerror:false,
        message:''
    }
}
