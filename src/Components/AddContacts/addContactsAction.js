import { GENERATE_HISTORY, DOWNLOAD_GENERATE_HISTORY, DELETE_HISTORY} from '../apiList';

export function generateHistory(obj){
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
        fetch(GENERATE_HISTORY, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(obj)
        }).then((res) => res.json())
        .then((json) => {
            dispatch(generateReportSuccess(json))
        })
        .catch((error) => {
            dispatch(isError(error))
        })
    }
}

export function deleteHistory(obj, data){
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
        fetch(DELETE_HISTORY, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(obj)
        }).then((res) => res.json())
        .then((json) => {
            dispatch(isError(json))
            dispatch(generateHistory(data))
        })
        .catch((error) => {
            dispatch(isError(error))
        })
    }
}

export function generateReportSuccess(data) {
    if(data.status === 200){  
        return{
        type:'GENERATE_CONTACT_REPORT_SUCCESS',  
        historyData:data.value,
        isPending:false,     
        }
    } else {
        return (isError(data))    
    }

}

export function downloadHistoryReport(obj){
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
        fetch(DOWNLOAD_GENERATE_HISTORY, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(obj)
        }).then((response) => {
        if (response.status === 200) {
            response.blob().then(function (myBlob) {
            window.URL = window.webkitURL || window.URL;
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(myBlob);
            a.download = "ContactUploadHistory.xlsx"
            a.click();
            });
            dispatch({ type: "IS_PENDING", isPending: false })
        } else {
            dispatch({ type: 'VIEW_CONTACT_ERROR', message: "Not able to Download Report", showerror: true, isPending: false })
        }
        })
        .catch(error => {
            dispatch(isError(error))
            dispatch({ type: "IS_PENDING", isPending: false })
        })
    }

}

export function isError(error){ 
    return{
        type: 'VIEW_CONTACT_ERROR',
        message: error.message,
        showerror:true,
        isPending:false  
        } 
}
export function isErrorClose(){
    return{
        type:'VIEW_CONTACT_ERROR_CLOSE',
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
