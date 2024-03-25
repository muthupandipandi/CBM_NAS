const initialState = {
	isPending:true,
	showMessage:false,
	message:'',
	userData:[],
	
  }
  export default (state = initialState, action) => {
    switch (action.type) {
      	case "DNC_ERROR":
				return Object.assign({}, state, {
					isPending: action.isPending,
					showMessage: action.showerror,
					message: action.message,
				})
                case "DNC_VIEW_ERROR_CLOSE":
				return Object.assign({}, state, {
					showMessage: action.showerror,
					message:action.message,
					isPending: false,
				})
				case "DNC_LOAD":
                    console.log(action)
				return Object.assign({}, state, {
					isPending: false,
                    userData:action.userData
				})
				
			default:
			return state
		}
}