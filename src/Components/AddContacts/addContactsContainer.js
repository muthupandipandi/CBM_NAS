import { connect } from "react-redux";
import addContacts from './addContacts';
import {generateHistory,deleteHistory,downloadHistoryReport,isErrorClose} from './addContactsAction';
import {closeModalPopUp} from '../Login/LoginActions'

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    loggedinData: state.LoginReducer.loggedinData,
    showMessage:state.addContactsReducer.showMessage,
    message:state.addContactsReducer.message,
    isOpen:state.LoginReducer.isOpen,
    isPending:state.addContactsReducer.isPending,
    historyData:state.addContactsReducer.historyData
  }  
}
const mapDispatchToProps = (dispatch) => ({
    closeModalPopUp:() => dispatch(closeModalPopUp()),
    generateHistory:(a) => dispatch(generateHistory(a)),
    deleteHistory:(a,b) => dispatch(deleteHistory(a,b)),
    downloadHistoryReport:(a) => dispatch(downloadHistoryReport(a)),
    isErrorClose:() => dispatch(isErrorClose())
  
})

const addContactsContainer = connect(mapStateToProps, mapDispatchToProps)(addContacts)

export default addContactsContainer;