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
			default:
			return state
		}
}