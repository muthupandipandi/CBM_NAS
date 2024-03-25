const initialState = {
	isPending: true,
	showMessage:false,
	message:'',
	contactList : [],
    customerData : {}
  }
  export default (state = initialState, action) => {
    switch (action.type) {
		case "CALL_CONTACT_LIST":
				return Object.assign({}, state, {
					isPending: action.isPending,
					contactList: action.contactList
				})
        case "CALL_CONNECT_SUCCESS":
                return Object.assign({}, state, {
                    isPending: action.isPending,
                    customerData: action.customerData
                })
      	case "CALL_ERROR":
				return Object.assign({}, state, {
					isPending: action.isPending,
					showMessage: action.showerror,
					message: action.message,
				})
		case "CALL_ERROR_CLOSE":
					return Object.assign({}, state, {
						showMessage: action.showerror,
						message:action.message,
						isPending: false,
					})
		case "CALL_IS_PENDING":
					return Object.assign({}, state, {
						isPending: action.isPending,
					})
			default:
			return state
		}
				
}