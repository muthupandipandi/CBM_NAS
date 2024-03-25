import { connect } from "react-redux";
import listDisposition from './listDisposition';
import { DispostionLoad,DispositionEditErrorClose,addDisposition,editDisposition } from './dispositionActions';

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    loggedinData: state.LoginReducer.loggedinData,
    userData:state.dispostionReducer.userData,
    
    showMessage:state.dispostionReducer.showMessage,
    message:state.dispostionReducer.message,
    
    isPending:state.dispostionReducer.isPending,
    
  }  
}
const mapDispatchToProps = (dispatch) => ({
    DispostionLoad: () => dispatch(DispostionLoad()),
    addDisposition: (a) => dispatch(addDisposition(a)),
    editDisposition: (a) => dispatch(editDisposition(a)),
    DispositionEditErrorClose:() => dispatch(DispositionEditErrorClose()),
  
})

const dispostionsContainer = connect(mapStateToProps, mapDispatchToProps)(listDisposition)

export default dispostionsContainer;