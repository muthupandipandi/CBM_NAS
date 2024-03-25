import { connect } from "react-redux";
import pbxCall from "./pbxCall";
import {isErrorClose, connectCall, getContactDetails} from './pbxAction'

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    showMessage:state.pbxReducer.showMessage,
    message:state.pbxReducer.message,
    isOpen: state.LoginReducer.isOpen,
    isPending:state.pbxReducer.isPending,
    contactList:state.pbxReducer.contactList,
    customerData:state.pbxReducer.customerData
  }  
}
const mapDispatchToProps = (dispatch) => ({
  isErrorClose:() => dispatch(isErrorClose()),
  connectCall:(a) => dispatch(connectCall(a)),
  getContactDetails:(a) => dispatch(getContactDetails())
})

const pbxCallContainer = connect(mapStateToProps, mapDispatchToProps)(pbxCall)

export default pbxCallContainer;