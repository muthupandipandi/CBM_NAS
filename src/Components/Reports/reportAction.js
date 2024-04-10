import {GET_CAMPAIGN_NAME_LIST,CAMPAIGN_INFO_LOAD_ALL, GENERATE_REPORT, DOWNLOAD_CAMPAIGN_REPORT,GENERATE_DETAIL_REPORT, DOWNLOAD_CAMPAIGN_DETAIL_REPORT,  } from '../apiList';

export function generateReport(obj){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
    return (dispatch, getState) => {
        // let hash = hashCode(JSON.stringify(obj));
        // headers.append('X-PK-Signature', hash);
        // headers.append('X-PK-Timestamp', '14-06-2021');
        // const token = getState().LoginReducer.accessToken;
        // headers.append("Authorization", token);
        dispatch(isPending())
        fetch(GENERATE_REPORT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(obj)
        }).then((res) => res.json())
        .then((json) => {
            if(json.status===401){
                window.location.href = '/'
               }
               else{
            dispatch(generateReportSuccess(json))
               }
        })
        .catch((error) => {
            dispatch(isError(error))
        })
    }
}

export function generateDetailReport(obj){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
    return (dispatch, getState) => {
        // let hash = hashCode(JSON.stringify(obj));
        // headers.append('X-PK-Signature', hash);
        // headers.append('X-PK-Timestamp', '14-06-2021');
        // const token = getState().LoginReducer.accessToken;
        // headers.append("Authorization", token);
        dispatch(isPending())
        fetch(GENERATE_DETAIL_REPORT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(obj)
        }).then((res) => res.json())
        .then((json) => {
            if(json.status===401){
                window.location.href = '/'
               }
               else{
            dispatch(generateReportSuccess(json))
               }
        })
        .catch((error) => {
            dispatch(isError(error))
        })
    }
}

export function generateReportSuccess(data) {
    if(data.status === 200){  
        return{
        type:'GENERATE_REPORT_SUCCESS',  
        reportData:data.value,
        reportHeader:data.header,
        isPending:false,     
        }
    } else {
        return (isError(data))    
    }

}


export function downloadReport(obj){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
    return (dispatch, getState) => {
        // let hash = hashCode(JSON.stringify(obj));
        // headers.append('X-PK-Signature', hash);
        // headers.append('X-PK-Timestamp', '14-06-2021');
        // const token = getState().LoginReducer.accessToken;
        // headers.append("Authorization", token);
        dispatch(isPending())
        fetch(DOWNLOAD_CAMPAIGN_REPORT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(obj)
        }).then((response) => {
            if(response.status===401){
                window.location.href = '/'
               }
               else{
        if (response.status === 200) {
            response.blob().then(function (myBlob) {
            window.URL = window.webkitURL || window.URL;
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(myBlob);
            a.download = "CampaignSummaryReport.xlsx"
            a.click();
            });
            dispatch({ type: "IS_PENDING", isPending: false })
        } else {
            dispatch({ type: 'VIEW_ERROR', message: "Not able to Download Report", showerror: true, isPending: false })
        }
        }
        })
        .catch(error => {
            dispatch(isError(error))
            dispatch({ type: "IS_PENDING", isPending: false })
        })
    }

}

export function downloadDetailReport(obj){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let token = window.localStorage.getItem('accessToken')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
    return (dispatch, getState) => {
        // let hash = hashCode(JSON.stringify(obj));
        // headers.append('X-PK-Signature', hash);
        // headers.append('X-PK-Timestamp', '14-06-2021');
        // const token = getState().LoginReducer.accessToken;
        // headers.append("Authorization", token);
        dispatch(isPending())
        fetch(DOWNLOAD_CAMPAIGN_DETAIL_REPORT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(obj)
        }).then((response) => {
            if(response.status===401){
                window.location.href = '/'
               }
               else{
        if (response.status === 200) {
            response.blob().then(function (myBlob) {
            window.URL = window.webkitURL || window.URL;
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(myBlob);
            a.download = "CampaignDetailReport.xlsx"
            a.click();
            });
            dispatch({ type: "IS_PENDING", isPending: false })
        } else {
            dispatch({ type: 'VIEW_ERROR', message: "Not able to Download Report", showerror: true, isPending: false })
        }
    }
        })
        .catch(error => {
            dispatch(isError(error))
            dispatch({ type: "IS_PENDING", isPending: false })
        })
    }

}

export function getCampaignName(){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let token = window.localStorage.getItem('accessToken')
    let user_group = window.localStorage.getItem('userGroup')
        const tokenType = window.localStorage.getItem('tokenType')
        // console.log("LO STATE",  getState().LoginReducer)
        headers.append("Authorization",tokenType+ ' ' +token);
        let url=''
        if (user_group ==null || user_group ==''){
        url=CAMPAIGN_INFO_LOAD_ALL
                }
                else{
                    url=GET_CAMPAIGN_NAME_LIST+'?userGroup='+user_group
                }
    return (dispatch, getState) => {
        // let hash = hashCode(JSON.stringify(obj));
        // headers.append('X-PK-Signature', hash);
        // headers.append('X-PK-Timestamp', '14-06-2021');
        // const token = getState().LoginReducer.accessToken;
        // headers.append("Authorization", token);
        fetch(url, {
        method: 'GET',
        headers: headers,
       // body: JSON.stringify(obj)
        }).then((res) => res.json())
        .then((json) => {
            if(json.status===401){
                window.location.href = '/'
               }
               else{
            dispatch(getCampaignNameSuccess(json))
               }
        })
        .catch((error) => {
            dispatch(isError(error))
        })
    }
}

export function getCampaignNameSuccess(data){
    if(data.status === 200){  
        return{
        type:'GET_CAMPAIGN_SUCCESS',  
        campaignNameList:data.value,
        isPending:false,     
        }
    } else {
        return (isError(data))    
    }
}


export function isError(error){ 
    return{
        type: 'VIEW_ERROR',
        message: error.message,
        showerror:true,
        isPending:false  
        } 
}
export function isErrorClose(){
    return{
        type:'VIEW_ERROR_CLOSE',
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