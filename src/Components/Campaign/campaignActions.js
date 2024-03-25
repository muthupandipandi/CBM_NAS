import {CAMPAIGN_INFO_LOAD,CAMPAIGN_INFO_LOAD_ALL,USER_GROUP,DISPOSTION_LIST,LIST_DNC, CAMPAIGN_INFO_ADD, CAMPAIGN_INFO_EDIT, CAMPAIGN_INFO_CHECK, UPLOAD_CONTACTS_CAMPAIGN} from '../apiList';
import _ from 'lodash';

export function CampaignLoad(){
    return (dispatch,getState) => {
      let headers = new Headers()
     
      let token = window.localStorage.getItem('accessToken')
    let user_group = window.localStorage.getItem('userGroup')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      //headers.append("Authorization",token);
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      let url=''
      if (user_group ==null || user_group ==''){
url=CAMPAIGN_INFO_LOAD_ALL
      }
      else{
        url=CAMPAIGN_INFO_LOAD+'?userGroup='+user_group
      }

      fetch(url, {
        method: 'GET',
        headers : headers,
        body: JSON.stringify()
      }).then((res) => res.json())
        .then((json) =>{
          dispatch(CampaignLoadSuccess(json))
        })
        .catch((error) =>{
          dispatch(CampaignEditError(error))
        })   
      }
}

export function CampaignLoadSuccess(data){
if(data.status === 200){  
    return{
    type:'CAMPAIGN_MGM_LOAD',  
    userData:data.value,
    isPending:false,     
    }
} else {
    return (CampaignEditError(data))    
}
}
export function UserGroupsData(){
    return (dispatch,getState) => {
      let headers = new Headers()
      let token = window.localStorage.getItem('accessToken')
      const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
      //headers.append("Authorization",token);
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      fetch(USER_GROUP, {
        method: 'POST',
        headers : headers,
        body: JSON.stringify()
      }).then((res) => res.json())
        .then((json) =>{
          dispatch(UserGroupDataSuccess(json))
        })
        .catch((error) =>{
          dispatch(CampaignEditError(error))
        })   
      }
  }
  
  
  
  export function UserGroupDataSuccess(data){
    if(data.status === 200){  
        return{
        type:'USER_Group_LOAD',  
        groupsData:data.value,
        isPending:false,
        showMessage:false     
        }
    } else {
        return (CampaignEditError(data))    
    }
    }

export function addnewCampaign(newData){  
    return (dispatch, getState) => {
    let headers = new Headers()
    let token = window.localStorage.getItem('accessToken')
    const tokenType = window.localStorage.getItem('tokenType')
      // console.log("LO STATE",  getState().LoginReducer)
      headers.append("Authorization",tokenType+ ' ' +token);
    //headers.append("Authorization",token);
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    fetch(CAMPAIGN_INFO_ADD, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {        
            dispatch(CampaignEditError(json))
            dispatch(CampaignLoad())
        })
        .catch(error => {
            dispatch(CampaignEditError(error))
        })
    }
}  
export function editCampaign(newData){  
    return (dispatch, getState)  => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        //headers.append("Authorization",token);
        headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
    fetch(CAMPAIGN_INFO_EDIT, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(newData)
    }).then((res) => res.json())
        .then(json => {
            dispatch(CampaignEditError(json))
            dispatch(CampaignLoad())
        })
        .catch(error => {
            dispatch(CampaignEditError(error))
        })
    }
}

export function checkCampaignStatus(obj){  
    return (dispatch, getState)  => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        //headers.append("Authorization",token);
        headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
    fetch(CAMPAIGN_INFO_CHECK, {
        method: 'POST',
        headers : headers,
        body:JSON.stringify(obj)
    }).then((res) => res.json())
        .then(json => {
            if(json.status === 200) {
                dispatch({type : "CAMPAIGN_STATUS_CHECK", campaignStatus : json.value})
            } else {
                dispatch(CampaignEditError(json))
            }
            
        })
        .catch(error => {
            dispatch(CampaignEditError(error))
        })
    }
}
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
            dispatch(DNCLoadSuccess(json))
          })
          .catch((error) =>{
            dispatch(CampaignEditError(error))
          })   
        }
}
export function DNCLoadSuccess(data){
    if(data.status === 200){  
        console.log('hi')
        return{
        type:'DNC_LOAD',  
        dncData:data.value,
        isPending:false,     
        }
    } else {
        return (CampaignEditError(data))    
    }
    }
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
            dispatch(CampaignEditError(error))
          })   
        }
}
export function DispositionLoadSuccess(data){
    if(data.status === 200){  
        return{
        type:'DISPOSTION_MGM_LOAD',  
        dispostionData:data.value,
        isPending:false,     
        }
    } else {
        return (CampaignEditError(data))    
    }
    }

export function uploadContacts(obj){  
    return (dispatch, getState)  => {
        let headers = new Headers()
        let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        //headers.append("Authorization",token);
        //headers.append('Content-Type','application/json');
        //headers.append('Accept','application/json');
    fetch(UPLOAD_CONTACTS_CAMPAIGN, {
        method: 'POST',
        headers : headers,
        body: obj
    }).then((res) => res.json())
        .then(json => {
            dispatch(CampaignEditError(json))
            dispatch(CampaignLoad())
        })
        .catch(error => {
            dispatch(CampaignEditError(error))
        })
    }
}

export function CampaignEditError(error){ 
    return{
        type: 'CAMPAIGN_VIEW_ERROR',
        message: error.message,
        showerror:true,
        isPending:false  
        } 
}
export function CampaignEditErrorClose(){
    return{
        type:'CAMPAIGN_VIEW_ERROR_CLOSE',
        showerror:false,
        message:''
    }
}