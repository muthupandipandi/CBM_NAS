import { connect } from "react-redux";
import AgentDashboard from "./agentDashborad";
import {RealtimeDashboard_Load,RealtimeDashboarErrorClose,isErrorClose} from './agentDashboradAction'

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    showMessage:state.agentDashboradReducer.showMessage,
    message:state.agentDashboradReducer.message,
    isOpen: state.LoginReducer.isOpen,
    isPending:state.agentDashboradReducer.isPending,
    userData:state.agentDashboradReducer.userData,
    // reportHeader:state.realtimeDasboardReducer.reportHeader,
  }  
}
const mapDispatchToProps = (dispatch) => ({
  isErrorClose:() => dispatch(isErrorClose()),
  RealtimeDashboard_Load: () => dispatch(RealtimeDashboard_Load()),
  RealtimeDashboarErrorClose:() => dispatch(RealtimeDashboarErrorClose()),
   
})

const agentDashboradContainer = connect(mapStateToProps, mapDispatchToProps)(AgentDashboard)

// const AuditContainer = connect(mapStateToProps, mapDispatchToProps)(AuditIndex)

export default agentDashboradContainer;