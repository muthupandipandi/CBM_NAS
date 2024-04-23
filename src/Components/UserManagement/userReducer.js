const initialState = {
	isPending:true,
	showMessage:false,
	message:'',
	userData:[],
	rolesData:[],
    skillData:[],
    agentData:[],
    userGroupsData:[],
    userEntity:false,
    userPhoneStatus:true,
    userIdStatus:true,
    userExtnStatus:true,
    userEmailStatus:true
  }
  export default (state = initialState, action) => {
    switch (action.type) {
      	case "USER_VIEW_ERROR":
            return Object.assign({}, state, {
                isPending: action.isPending,
                showMessage: action.showerror,
                message: action.message,
            })
            case "USER_VIEW_ERROR_CLOSE":
            return Object.assign({}, state, {
                showMessage: action.showerror,
                message:action.message,
                isPending: false,
            })
            case "USER_MGM_LOAD":
            return Object.assign({}, state, {
                userData: action.userData,
                isPending: action.isPending,
            })
            case "USER_GROUP_LOAD":
                
            return Object.assign({}, state, {
                userGroupsData: action.userGroupsData,
                isPending: action.isPending,
                
            })
            case "USER_SKILL_LOAD":
                
            return Object.assign({}, state, {
                skillData: action.skillData,
                isPending: action.isPending,
                
            })
            case "USER_AGENT_LOAD":
                
            return Object.assign({}, state, {
                agentData: action.agentData,
                isPending: action.isPending,
                
            })
            case "USER_ROLE_LOAD":
            return Object.assign({}, state, {
                rolesData: action.rolesData,
                isPending: action.isPending,
            })
            case 'USER_ENTITY_CHECK':
            return Object.assign({}, state, {
                userEntity: action.userEntity,
            })
            case 'USER_ID_CHECK':
            return Object.assign({}, state, {
                userIdStatus: action.userIdStatus,
            })
            case 'USER_EXTN_CHECK':
            return Object.assign({}, state, {
                userExtnStatus: action.userExtnStatus,
            })
            case 'USER_PHONE_CHECK':
            return Object.assign({}, state, {
                userPhoneStatus: action.userPhoneStatus,
            })
            case 'USER_Email_CHECK':
            return Object.assign({}, state, {
                userEmailStatus: action.userEmailStatus,
            })
			default:
			return state
		}
}