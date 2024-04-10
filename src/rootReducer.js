import { combineReducers } from 'redux';
import LoginReducer from './Components/Login/LoginReducer'; 
import campaignReducer from './Components/Campaign/campaignReducer';
import addContactsReducer from './Components/AddContacts/addContactsReducer';
import reportReducer from './Components/Reports/reportReducer';
import pbxReducer from './Components/PbxCall/pbxReducer';
import userReducer from './Components/UserManagement/userReducer';
import realtimeDashboradReducer from './Components/RealTimeDashboard/realtimeDashboradReducer';
import dispostionReducer from './Components/DispositionManagement/dispostionReducer'
import usergroupReducer from './Components/UserGroup/usergroupReducer'
import skillsetReducer from './Components/SkillSet/skillsetReducer'
import dncManagementReducer from './Components/DNCManagement/dncManagementReducer'
import agentDashboradReducer from './Components/AgentDashboard/agentDashboradReducer'
const appReducer = combineReducers({
  LoginReducer,
  campaignReducer,
  reportReducer,
  addContactsReducer,
  pbxReducer,
  userReducer,
  realtimeDashboradReducer,
  dispostionReducer,
  usergroupReducer,
  skillsetReducer,
  dncManagementReducer,
  agentDashboradReducer

  
});

const rootReducer = (state, action) => {  
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  console.log(state,action)
  return appReducer(state, action);
}

export default rootReducer;