const initialState = {
	isPending:true,
	showMessage:false,
	message:'',
	historyData : [],
  }
  export default (state = initialState, action) => {
    switch (action.type) {
      	case "VIEW_ERROR":
			return Object.assign({}, state, {
				isPending: action.isPending,
				showMessage: action.showerror,
				message: action.message,
			})
		case "GENERATE_CONTACT_REPORT_SUCCESS":
			return Object.assign({}, state, {
				isPending: action.isPending,
				historyData: action.historyData,
			})
		case "VIEW_CONTACT_ERROR":
				return Object.assign({}, state, {
					isPending: action.isPending,
					showMessage: action.showerror,
					message: action.message,
				})
		case "VIEW_CONTACT_ERROR_CLOSE":
				return Object.assign({}, state, {
					showMessage: action.showerror,
					message:action.message,
					isPending: false,
				})
		default:
		return state
	}
}