  import _ from 'lodash';
const initialState = {
  isPending:false,
  showerror:false,
  loggedinData:{},
  message:"",
  modules:[],
  isOpen:false,
  accessToken : ''
}
export default (state = initialState, action) => { 
  let moduledata = []
  console.log(action.loggedinData)
  if(!_.isEmpty(action.loggedinData)){  
    if(_.isEqual('[Admin]',action.loggedinData.roles)){
      moduledata = [
        // {"moduleName": "Dashboard", "icon": "fas fa-home", "path" :"/dashboard/reportgraph"},
        // {"moduleName": "Campaign Management", "icon": "fas fa-rocket", "path" :"/dashboard/campaign"},
        // {"moduleName": "Realtime Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/realtimedashboard"},
        {"moduleName": "Dashboard", "icon": "fas fa-home", "path" :"/dashboard/reportgraph"},
        {"moduleName": "Campaign Management", "icon": "fas fa-rocket", "path" :"/dashboard/campaign"},
        {"moduleName": "User Management", "icon": "fas fa-user-plus", "path" :"/dashboard/users"},
        {"moduleName": "Skill Set", "icon": "fas fa-user-graduate", "path" :"/dashboard/skillset"},
        {"moduleName": "Disposition Management", "icon": "fas fa-tasks", "path" :"/dashboard/dispostions"},  
        
        {"moduleName": "DNC", "icon": "fas fa-phone-slash", "path" :"/dashboard/dnc"},  
        {"moduleName": "User Group", "icon": "fas fa-users", "path" :"/dashboard/usergroup"},
        {"moduleName": "Realtime Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/realtimedashboard"},
        {"moduleName": "Agent Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/agentdashboard"},
        {"moduleName": "List Upload History", "icon": "fas fa-clipboard-list", "path" :"/dashboard/contacts"},
        {"moduleName": "Reports", "icon": "fas fa-file-invoice", "path" :"/dashboard/reports"},
      ]
    } 
    else if(_.isEqual('[Agent]',action.loggedinData.roles)){
      moduledata = [
        {"moduleName": "Dashboard", "icon": "fas fa-home", "path" :"/dashboard/reportgraph"},
        {"moduleName": "Campaign Management", "icon": "fas fa-rocket", "path" :"/dashboard/campaign"},
        {"moduleName": "Realtime Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/realtimedashboard"},
        {"moduleName": "Agent Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/agentdashboard"},
        // {"moduleName": "Dashboard", "icon": "fas fa-home", "path" :"/dashboard/reportgraph"},
        // {"moduleName": "Campaign Management", "icon": "fas fa-rocket", "path" :"/dashboard/campaign"},
        // {"moduleName": "User Management", "icon": "fas fa-user-plus", "path" :"/dashboard/users"},
        // {"moduleName": "SkillSet", "icon": "fas fa-user-graduate", "path" :"/dashboard/skillset"},
        // {"moduleName": "Dispostion Management", "icon": "fas fa-tasks", "path" :"/dashboard/dispostions"},  
        
        // {"moduleName": "DNC", "icon": "fas fa-phone-slash", "path" :"/dashboard/dnc"},  
        // {"moduleName": "User Group", "icon": "fas fa-users", "path" :"/dashboard/usergroup"},
        // {"moduleName": "Realtime Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/realtimedashboard"},
        // {"moduleName": "List Upload History", "icon": "fas fa-clipboard-list", "path" :"/dashboard/contacts"},
        // {"moduleName": "Reports", "icon": "fas fa-file-invoice", "path" :"/dashboard/reports"},
      ]
    } 
    else if(_.isEqual('[Supervisor]',action.loggedinData.roles)){
      
      moduledata = [     
        {"moduleName": "Dashboard", "icon": "fas fa-home", "path" :"/dashboard/reportgraph"},
        {"moduleName": "Campaign Management", "icon": "fas fa-rocket", "path" :"/dashboard/campaign"},
        {"moduleName": "User Management", "icon": "fas fa-user-plus", "path" :"/dashboard/users"},
        {"moduleName": "Skill Set", "icon": "fas fa-user-graduate", "path" :"/dashboard/skillset"},
        {"moduleName": "Disposition Management", "icon": "fas fa-tasks", "path" :"/dashboard/dispostions"},  
        
        {"moduleName": "DNC", "icon": "fas fa-phone-slash", "path" :"/dashboard/dnc"},  
        // {"moduleName": "User Group", "icon": "fas fa-users", "path" :"/dashboard/usergroup"},
        {"moduleName": "Realtime Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/realtimedashboard"},
        {"moduleName": "Agent Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/agentdashboard"},
        {"moduleName": "List Upload History", "icon": "fas fa-clipboard-list", "path" :"/dashboard/contacts"},
        {"moduleName": "Reports", "icon": "fas fa-file-invoice", "path" :"/dashboard/reports"},
       
        //{"moduleName": "IVR Configuration", "icon": "fa fa-phone-square", "path" :"/dashboard/ivr"},
        // {"moduleName": "Update Form", "icon": "fas fa-cubes", "path" :"/dashboard/updateForm"},
        // {"moduleName": "Search Form", "icon": "fas fa-search", "path" :"/dashboard/searchForm"},
        // {"moduleName": "Set Priority", "icon": "fas fa-list-ol", "path" :"/dashboard/setPriority"}
      ]
    }
    else if(_.isEqual('[QA]',action.loggedinData.roles)){
      
      moduledata = [     
        {"moduleName": "Dashboard", "icon": "fas fa-home", "path" :"/dashboard/reportgraph"},
        
        // {"moduleName": "User Group", "icon": "fas fa-users", "path" :"/dashboard/usergroup"},
        {"moduleName": "Realtime Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/realtimedashboard"},
        {"moduleName": "Agent Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/agentdashboard"},
        {"moduleName": "List Upload History", "icon": "fas fa-clipboard-list", "path" :"/dashboard/contacts"},
        {"moduleName": "Reports", "icon": "fas fa-file-invoice", "path" :"/dashboard/reports"},
       
        //{"moduleName": "IVR Configuration", "icon": "fa fa-phone-square", "path" :"/dashboard/ivr"},
        // {"moduleName": "Update Form", "icon": "fas fa-cubes", "path" :"/dashboard/updateForm"},
        // {"moduleName": "Search Form", "icon": "fas fa-search", "path" :"/dashboard/searchForm"},
        // {"moduleName": "Set Priority", "icon": "fas fa-list-ol", "path" :"/dashboard/setPriority"}
      ]
    }
    else{
      moduledata = [     
        {"moduleName": "Dashboard", "icon": "fas fa-home", "path" :"/dashboard/reportgraph"},
        
        // {"moduleName": "User Group", "icon": "fas fa-users", "path" :"/dashboard/usergroup"},
        {"moduleName": "Realtime Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/realtimedashboard"},
        {"moduleName": "Agent Dashboard", "icon": "fas fa-tachometer-alt", "path" :"/dashboard/agentdashboard"},
        // {"moduleName": "List Upload History", "icon": "fas fa-clipboard-list", "path" :"/dashboard/contacts"},
        {"moduleName": "Reports", "icon": "fas fa-file-invoice", "path" :"/dashboard/reports"},
       
        //{"moduleName": "IVR Configuration", "icon": "fa fa-phone-square", "path" :"/dashboard/ivr"},
        // {"moduleName": "Update Form", "icon": "fas fa-cubes", "path" :"/dashboard/updateForm"},
        // {"moduleName": "Search Form", "icon": "fas fa-search", "path" :"/dashboard/searchForm"},
        // {"moduleName": "Set Priority", "icon": "fas fa-list-ol", "path" :"/dashboard/setPriority"}
      ]

    }
  }

  switch (action.type) {
    case 'LOGIN_ACTION_PENDING':
      return Object.assign({}, state, {
        isPending: action.isPending
      })
    case 'LOGIN_ACTION_SUCCESS':
      console.log(action)
      window.localStorage.setItem('modules',JSON.stringify(moduledata))
      return Object.assign({}, state, {      
        loggedinData: action.loggedinData,
        accessToken: action.accessToken,
        errorMessage: action.message,
        showerror: action.showerror,
        isPending: action.isPending,   
        modules: moduledata
      })
    case 'LOGIN_ACTION_ERROR':
      return Object.assign({}, state, {
        errorMessage: action.message,
        loggedinData: action.loggedinData,
        accessToken: action.accessToken,
        showerror: action.showerror,
        isPending: action.isPending,
        modules:[]
      })  
    case "LOGIN_ACTION_MODAL_CLOSE":
      return Object.assign({}, state, {
        showerror: action.showerror,
      })
    case "LOGIN_ACTION_SUCCESS_OTP":
      return Object.assign({}, state, {
        showerror: action.showerror,
        isPending: action.isPending,
      })
      case "CHANGE_PASSWORD":
        return Object.assign({}, state, {
          
        errorMessage: action.message,
        showerror: action.showerror,
        })
    case "LOGIN_ACTION_DASHBOARD":
      return Object.assign({}, state, {
        isOpen: action.isOpen,
      })
    case "SHOW_LOGIN_MODAL":
      return Object.assign({}, state, {
        showModalLogin: action.showModalLogin,
      })
      case "SHOW_LOGIN_MODAL_FALSE":
    return Object.assign({}, state, {
      showModalLogin: action.showModalLogin,
    })
    default:
      return state
  }
 }