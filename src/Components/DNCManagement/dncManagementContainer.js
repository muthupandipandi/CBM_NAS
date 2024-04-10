import { connect } from "react-redux";
import listDnc from './listDnc';
import { DNCLoad,addDNC,uploadDNC,editDNC,DNCEditErrorClose,updateDNC,deleteDNC } from './dncManagementAction';

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    loggedinData: state.LoginReducer.loggedinData,
    userData:state.dncManagementReducer.userData,
    
    showMessage:state.dncManagementReducer.showMessage,
    message:state.dncManagementReducer.message,
    
    isPending:state.dncManagementReducer.isPending,
    
  }  
}
const mapDispatchToProps = (dispatch) => ({
  DNCLoad: () => dispatch(DNCLoad()),
  addDNC: (a) => dispatch(addDNC(a)),
  editDNC: (a) => dispatch(editDNC(a)),
  uploadDNC: (a) => dispatch(uploadDNC(a)),
  updateDNC: (a) => dispatch(updateDNC(a)),
  deleteDNC: (a) => dispatch(deleteDNC(a)),
  DNCEditErrorClose:() => dispatch(DNCEditErrorClose()),
  
})

const dncManagementContainer = connect(mapStateToProps, mapDispatchToProps)(listDnc)

export default dncManagementContainer;