import {CREATE_DISPOSTION,EDIT_DISPOSTION,DISPOSTION_LIST} from '../apiList';
import _ from 'lodash';

export function DispostionLoad(){
    return (dispatch,getState) => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        //headers.append("Authorization",token);
        // headers.append('Content-Type','application/json');
        // headers.append('Accept','application/json');
        fetch(DISPOSTION_LIST, {
            method: 'GET',
            headers:headers
          
        }).then((res) => res.json())
          .then((json) =>{
            dispatch(DispositionLoadSuccess(json))
          })
          .catch((error) =>{
            dispatch(DispositionEditError(error))
          })   
        }
}
export function addDisposition(newData){  
    return (dispatch, getState) => {
    let headers = new Headers()
    let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
    // const token = getState().LoginReducer.accessToken; 
    // headers.append("Authorization",token);
    headers.append('Content-Type','application/json');
    console.log(newData)
    // headers.append('Accept','application/json');
    fetch(CREATE_DISPOSTION, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {        
            dispatch(DispositionEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(DispostionLoad())
            }
        })
        .catch(error => {
            dispatch(DispositionEditError(error))
        })
    }
}
export function editDisposition(newData){  
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
    fetch(EDIT_DISPOSTION, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {        
            dispatch(DispositionEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(DispostionLoad())
            }
        })
        .catch(error => {
            dispatch(DispositionEditError(error))
        })
    }
}
export function DispositionLoadSuccess(data){
if(data.status === 200){  
    return{
    type:'DISPOSTION_MGM_LOAD',  
    userData:data.value,
    isPending:false,     
    }
} else {
    return (DispositionEditError(data))    
}
}


export function DispositionEditError(error){ 
    return{
        type: 'DISPOSTION_ERROR',
        message: error.message,
        showerror:true,
        isPending:false  
        } 
}
export function DispositionEditErrorClose(){
    return{
        type:'Disposition_VIEW_ERROR_CLOSE',
        showerror:false,
        message:''
    }
}
