
import {CREATE_SKILLSET,EDIT_SKILLSET,SKILLSET_LIST} from '../apiList'
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
            headers:headers
          
        }).then((res) => res.json())
          .then((json) =>{
            dispatch(SkillSetLoadSuccess(json))
          })
          .catch((error) =>{
            dispatch(SkillSetEditError(error))
          })   
        }
}
export function addSkillSet(newData){  
    return (dispatch, getState) => {
    let headers = new Headers()
    // const token = getState().LoginReducer.accessToken; 
    // headers.append("Authorization",token);
    let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
    headers.append('Content-Type','application/json');
    console.log(newData)
    // headers.append('Accept','application/json');
    fetch(CREATE_SKILLSET, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {        
            dispatch(SkillSetEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(SkillSetLoad())
            }
        })
        .catch(error => {
            dispatch(SkillSetEditError(error))
        })
    }
}
export function editSkillSet(newData){  
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
    fetch(EDIT_SKILLSET, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {        
            dispatch(SkillSetEditError(json))
            //dispatch(UserDataLoad())
            if(json.status === 200){
              dispatch(SkillSetLoad())
            }
        })
        .catch(error => {
            dispatch(SkillSetEditError(error))
        })
    }
}

export function SkillSetLoadSuccess(data){
if(data.status === 200){  
    return{
    type:'SKILLSET_LOAD',  
    userData:data.value,
    isPending:false,     
    }
} else {
    return (SkillSetEditError(data))    
}
}


export function SkillSetEditError(error){ 
    return{
        type: 'SkillSet_ERROR',
        message: error.message,
        showerror:true,
        isPending:false  
        } 
}
export function SkillSetEditErrorEditErrorClose(){
    return{
        type:'SkillSet_VIEW_ERROR_CLOSE',
        showerror:false,
        message:''
    }
}
