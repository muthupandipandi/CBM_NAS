const initialState = {
	isPending: true,
	showMessage:false,
	message:'',
	reportData : [],
	reportHeader : [],
	campaignNameList : []
  }
  export default (state = initialState, action) => {
    switch (action.type) {
		case "GENERATE_REPORT_SUCCESS":
				return Object.assign({}, state, {
					isPending: action.isPending,
					reportData: action.reportData,
					reportHeader: action.reportHeader
				})
		case "GET_CAMPAIGN_SUCCESS":
				return Object.assign({}, state, {
					isPending: action.isPending,
					campaignNameList: action.campaignNameList
				})
      	case "VIEW_ERROR":
				return Object.assign({}, state, {
					isPending: action.isPending,
					showMessage: action.showerror,
					message: action.message,
				})
		case "VIEW_ERROR_CLOSE":
					return Object.assign({}, state, {
						showMessage: action.showerror,
						message:action.message,
						isPending: false,
					})
		case "IS_PENDING":
					return Object.assign({}, state, {
						isPending: action.isPending,
					})
			default:
			return state
		}
				
}