import {Agent_Dashboard   } from '../apiList';
import _ from 'lodash';
import axios from 'axios';
export function RealtimeDashboard_Load(){
    return (dispatch,getState) => {
      let headers = new Headers()
      let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        let user_group = window.localStorage.getItem('userGroup')
      let url=''
    // if (user_group ==null || user_group ==''){
    //     url=RealTime_Dashboard_ALL
    //             }
    //   else{
    //     url=RealTime_Dashboard+'?userGroup='+user_group
    //   }
    //   const token = getState().LoginReducer.accessToken; 
    //   const token = JSON.parse(window.localStorage.getItem('cbi_c_b_m_s_t'))
    //   headers.append("Authorization",token);
    //   headers.append('Content-Type','application/json');
    //   headers.append('Accept','application/json');
//     axios.get(RealTime_Dashboard)
// //   .then(response => {
      fetch(Agent_Dashboard, {
        method: 'GET',
        headers:headers
      })
      .then((res) => res.json())
        .then((json) =>{
          if(json.status===401){
            window.location.href = '/'
           }
           else{
          dispatch(RealtimeDashboardSuccess(json))
           }
        })
        .catch((error) =>{
          dispatch(RealtimeDashboardError(error))
        })   
      }
}
export function RealtimeDashboardSuccess(data){
if(data.status === 200){  
    return{
    type:'RealTime_LOAD',
    // message: error.message,
    userData:data.value,
    isPending:false 
    }
} else {
    return (RealtimeDashboardError(data))    
}
}

export function RealtimeDashboardError(error){ 
    return{
        type: 'RealTime_ERROR',
        message: error.message,
        showerror:true,
        isPending:false  
        } 
}
export function RealtimeDashboarErrorClose(){
    return{
        type:'RealTime_ERROR_CLOSE',
        showerror:false,
        message:''
    }
}

// export function downloadReport(obj){
//     let headers = new Headers()
//     headers.append('Content-Type', 'application/json');
//     headers.append('Accept', 'application/json');
//     return (dispatch, getState) => {
//         // let hash = hashCode(JSON.stringify(obj));
//         // headers.append('X-PK-Signature', hash);
//         // headers.append('X-PK-Timestamp', '14-06-2021');
//         const token = getState().LoginReducer.accessToken;
//         headers.append("Authorization", token);
//         dispatch(isPending())
//         fetch(DOWNLOAD_AUDIT_LOGIN_REPORT, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(obj)
//         }).then((response) => {
//         if (response.status === 200) {
//             response.blob().then(function (myBlob) {
//             window.URL = window.webkitURL || window.URL;
//             var a = document.createElement('a');
//             a.href = window.URL.createObjectURL(myBlob);
//             a.download = "CampaignSummaryReport.xlsx"
//             a.click();
//             });
//             dispatch({ type: "IS_PENDING", isPending: false })
//         } else {
//             dispatch({ type: 'AUDIT_ERROR', message: "Not able to Download Report", showerror: true, isPending: false })
//         }
//         })
//         .catch(error => {
//             dispatch(isError(error))
//             dispatch({ type: "IS_PENDING", isPending: false })
//         })
//     }

// }

// export function downloadDetailReport(obj){
//     let headers = new Headers()
//     headers.append('Content-Type', 'application/json');
//     headers.append('Accept', 'application/json');
//     return (dispatch, getState) => {
//         // let hash = hashCode(JSON.stringify(obj));
//         // headers.append('X-PK-Signature', hash);
//         // headers.append('X-PK-Timestamp', '14-06-2021');
//         const token = getState().LoginReducer.accessToken;
//         headers.append("Authorization", token);
//         dispatch(isPending())
//         fetch(DOWNLOAD_AUDIT_USER_REPORT, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(obj)
//         }).then((response) => {
//         if (response.status === 200) {
//             response.blob().then(function (myBlob) {
//             window.URL = window.webkitURL || window.URL;
//             var a = document.createElement('a');
//             a.href = window.URL.createObjectURL(myBlob);
//             a.download = "CampaignDetailReport.xlsx"
//             a.click();
//             });
//             dispatch({ type: "IS_PENDING", isPending: false })
//         } else {
//             dispatch({ type: 'AUDIT_ERROR', message: "Not able to Download Report", showerror: true, isPending: false })
//         }
//         })
//         .catch(error => {
//             dispatch(isError(error))
//             dispatch({ type: "IS_PENDING", isPending: false })
//         })
//     }

// }


export function isError(error){ 
    return{
        type: 'AUDIT_ERROR',
        message: error.message,
        showerror:true,
        isPending:false  
        } 
}
export function isErrorClose(){
    return{
        type:'RealTime_ERROR_CLOSE',
        showerror:false,
        message:''
    }
}

export function isPending() {
    return {
      type: 'IS_PENDING',
      isPending: true
    }
  }