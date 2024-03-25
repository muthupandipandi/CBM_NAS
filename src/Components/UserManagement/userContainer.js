import { connect } from "react-redux";
import user from "./user";
import { UserDataLoad, addnewUser,SkillSetLoad,AgentLoad, editUser, UserRoleData,UserGroupsData, IsEntityNameExists, DisableUser, UserErrorClose } from './userAction';

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    loggedinData: state.LoginReducer.loggedinData,
    isOpen: state.LoginReducer.isOpen,
    showMessage:state.userReducer.showMessage,
    message:state.userReducer.message,
    isPending:state.userReducer.isPending,
    timesList:state.userReducer.timesList,
    userData:state.userReducer.userData,
    rolesData:state.userReducer.rolesData,
    userGroupsData:state.userReducer.userGroupsData,
    userEntity:state.userReducer.userEntity,
    skillData:state.userReducer.skillData,
    agentData:state.userReducer.agentData,
    
  }  
}
const mapDispatchToProps = (dispatch) => ({
    UserDataLoad: () => dispatch(UserDataLoad()),
    addnewUser: (a) => dispatch(addnewUser(a)),
    editUser: (a) => dispatch(editUser(a)),
    UserRoleData: (a) => dispatch(UserRoleData(a)),
    UserGroupsData: (a) => dispatch(UserGroupsData(a)),
    SkillSetLoad: () => dispatch(SkillSetLoad()),
    AgentLoad: () => dispatch(AgentLoad()),
    DisableUser: (a) => dispatch(DisableUser(a)),
    IsEntityNameExists: (a) => dispatch(IsEntityNameExists(a)),
    UserErrorClose:() => dispatch(UserErrorClose()),
})

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(user)

export default UserContainer;