import {PBX_CALL_LIST,PBX_CONNECT_CALL} from '../apiList';

export function connectCall(obj){
    let headers = new Headers()
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    return (dispatch, getState) => {
        // let hash = hashCode(JSON.stringify(obj));
        // headers.append('X-PK-Signature', hash);
        // headers.append('X-PK-Timestamp', '14-06-2021');
        // const token = getState().LoginReducer.accessToken;
        // headers.append("Authorization", token);
        dispatch(isPending())
        fetch(PBX_CONNECT_CALL, {
        method: 'POST',
        headers: headers,
        body: obj
        }).then((res) => res.json())
        .then((json) => {
            dispatch(connectCallSuccess(json))
            dispatch(isError(json))
        })
        .catch((error) => {
            dispatch(isError(error))
        })
    }
}

export function getContactDetails(){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return (dispatch, getState) => {
        // let hash = hashCode(JSON.stringify(obj));
        // headers.append('X-PK-Signature', hash);
        // headers.append('X-PK-Timestamp', '14-06-2021');
        // const token = getState().LoginReducer.accessToken;
        // headers.append("Authorization", token);
        dispatch(isPending())
        fetch(PBX_CALL_LIST, {
        method: 'POST',
        headers: headers,
        }).then((res) => res.json())
        .then((json) => {
            dispatch(getContactDetailsSuccess(json))
        })
        .catch((error) => {
            dispatch(isError(error))
        })
    }
}
export function getContactDetailsSuccess(data) {
    if(data.status === 200){  
        return{
        type:'CALL_CONTACT_LIST',  
        contactList:data.value,
        isPending:false,     
        }
    } else {
        return (isError(data))    
    }

}
export function connectCallSuccess(data) {
    if(data.status === 200){  
        return{
        type:'CALL_CONNECT_SUCCESS',  
        customerData:data.value[0],
        isPending:false,     
        }
    } else {
        return (isError(data))    
    }

}

export function isError(error){ 
    return{
        type: 'CALL_ERROR',
        message: error.message,
        showerror:true,
        isPending:false  
        } 
}
export function isErrorClose(){
    return{
        type:'CALL_ERROR_CLOSE',
        showerror:false,
        message:''
    }
}

export function isPending() {
    return {
      type: 'CALL_IS_PENDING',
      isPending: true
    }
  }