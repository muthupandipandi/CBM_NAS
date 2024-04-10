const initialState = {
	isPending:true,
	showMessage:false,
	message:'',
	userData:[],
	agentData:[]
	
	
	


  }
  export default (state = initialState, action) => {
    switch (action.type) {
      	case "RealTime_ERROR":
				return Object.assign({}, state, {
					isPending: action.isPending,
					showMessage: action.showerror,
					message: action.message,
				})
				case "RealTime_ERROR_CLOSE":
				return Object.assign({}, state, {
					showMessage: action.showerror,
					message:action.message,
					isPending: false,
				})
				case "RealTime_LOAD":
				return Object.assign({}, state, {
					userData: action.userData,
					isPending: action.isPending,
				})
				case "AgentRealTime_LOAD":
				return Object.assign({}, state, {
					agentData: action.agentData,
					isPending: action.isPending,
				})
				// case "RealTime_ERROR_CLOSE":
				// 	return Object.assign({}, state, {
				// 		showMessage: action.showerror,
				// 		message:action.message,
				// 		isPending: false,
				// 	})
				
			default:
			return state
		}
}