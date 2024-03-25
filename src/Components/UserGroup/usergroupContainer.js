import { connect } from "react-redux";
import listGroupType from './listUsergroup';
import { UserGroupLoad,UserGroupEditErrorClose,addUserGroup,editUserGroup } from './usergroupActions';

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    loggedinData: state.LoginReducer.loggedinData,
    userData:state.usergroupReducer.userData,
    isOpen: state.LoginReducer.isOpen,
    showMessage:state.usergroupReducer.showMessage,
    message:state.usergroupReducer.message,
    
    isPending:state.usergroupReducer.isPending,
    
  }  
}
const mapDispatchToProps = (dispatch) => ({
  UserGroupLoad: () => dispatch(UserGroupLoad()),
  UserGroupEditErrorClose:() => dispatch(UserGroupEditErrorClose()),
  addUserGroup: (a) => dispatch(addUserGroup(a)),
  editUserGroup: (a) => dispatch(editUserGroup(a)),
  
})

const usergroupContainer = connect(mapStateToProps, mapDispatchToProps)(listGroupType)

export default usergroupContainer;