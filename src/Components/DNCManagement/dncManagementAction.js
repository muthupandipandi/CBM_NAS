import {CREATE_DNC, EDIT_DNC, LIST_DNC,UPLOAD_DNC,DNC_CONTACT_UPDATE,DNC_CONTACT_DELETE} from '../apiList';


export function DNCLoad(){
    return (dispatch,getState) => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        //headers.append("Authorization",token);
        // headers.append('Content-Type','application/json');
        // headers.append('Accept','application/json');
        fetch(LIST_DNC, {
            method: 'GET',
            headers:headers
          
        }).then((res) => res.json())
          .then((json) =>{
            if(json.status===401){
                window.location.href = '/'
               }
               else{
            dispatch(DNCLoadSuccess(json))
               }
          })
          .catch((error) =>{
            dispatch(DNCEditError(error))
          })   
        }
}
export function addDNC(newData){  
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
    fetch(CREATE_DNC, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {      
            if(json.status===401){
                window.location.href = '/'
               }
               else{  
            dispatch(DNCEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(DNCLoad())
            }
        }
        })
        .catch(error => {
            dispatch(DNCEditError(error))
        })
    }
}
export function updateDNC(newData){  
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
    fetch(DNC_CONTACT_UPDATE, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {        
            if(json.status===401){
                window.location.href = '/'
               }
               else{
            dispatch(DNCUpdateLoadSuccess(json))
               }
            //dispatch(UserDataLoad())
           
        })
        .catch(error => {
            dispatch(DNCEditError(error))
        })
    }
}

export function deleteDNC(newData){  
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
    fetch(DNC_CONTACT_DELETE, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {     
            if(json.status===401){
                window.location.href = '/'
               }
               else{   
            dispatch(DNCUpdateLoadSuccess(json))
               }
            //dispatch(UserDataLoad())
           
        })
        .catch(error => {
            dispatch(DNCEditError(error))
        })
    }
}
export function uploadDNC(newData){  
    return (dispatch, getState) => {
    let headers = new Headers()
    let token = window.localStorage.getItem('accessToken')
    const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
    headers.append("Authorization",tokenType+ ' ' +token);
    // const token = getState().LoginReducer.accessToken; 
    // headers.append("Authorization",token);
    // headers.append('Content-Type','multipart/form-data');
    // headers.append('Accept','application/json');
    fetch(UPLOAD_DNC, {
        method: 'POST',
        headers : headers,
        body:newData
    }).then((res) => res.json())
        .then(json => {        
            if(json.status===401){
                window.location.href = '/'
               }
               else{
            dispatch(DNCEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(DNCLoad())
            }
        }
        })
        .catch(error => {
            dispatch(DNCEditError(error))
        })
    }
}
export function editDNC(newData){  
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
    fetch(EDIT_DNC, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {      
            if(json.status===401){
                window.location.href = '/'
               }
               else{  
            dispatch(DNCEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(DNCLoad())
            }
        }
        })
        .catch(error => {
            dispatch(DNCEditError(error))
        })
    }
}

export function DNCLoadSuccess(data){
if(data.status === 200){  
    
    return{
    type:'DNC_LOAD',  
    userData:data.value,
    isPending:false,     
    }
} else {
    return (DNCEditError(data))    
}
}

export function DNCUpdateLoadSuccess(data){
    if(data.status === 200){  
        
        return{
        type:'UPDATEDNC_LOAD',  
        userData:data.value,
        isPending:false,   
        showerror:true,
        message: data.message,
        }
    } else {
        return (DNCEditError(data))    
    }
    }

export function DNCEditError(error){ 
    console.log('his')
    return{
        type: 'DNC_ERROR',
        message: error.message,
        
        showerror:true,
        isPending:false  
        } 
}
export function DNCEditErrorClose(){
    console.log('hie')
    return{
        type:'DNC_VIEW_ERROR_CLOSE',
        showerror:false,
        message:''
    }
}
