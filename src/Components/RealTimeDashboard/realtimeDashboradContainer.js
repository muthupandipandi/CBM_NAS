import { connect } from "react-redux";
import RealtimeDashboard from "./realtimeDashborad";
import {RealtimeDashboard_Load,RealtimeDashboarErrorClose,isErrorClose,AgentRealtimeDashboard_Load} from './realtimeDashboradAction'

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    showMessage:state.realtimeDashboradReducer.showMessage,
    message:state.realtimeDashboradReducer.message,
    isOpen: state.LoginReducer.isOpen,
    isPending:state.realtimeDashboradReducer.isPending,
    userData:state.realtimeDashboradReducer.userData,
    agentData:state.realtimeDashboradReducer.agentData
    // reportHeader:state.realtimeDasboardReducer.reportHeader,
  }  
}
const mapDispatchToProps = (dispatch) => ({
  isErrorClose:() => dispatch(isErrorClose()),
  RealtimeDashboard_Load: () => dispatch(RealtimeDashboard_Load()),
  RealtimeDashboarErrorClose:() => dispatch(RealtimeDashboarErrorClose()),
  AgentRealtimeDashboard_Load:()=> dispatch(AgentRealtimeDashboard_Load())
  
   
})

const realtimeDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(RealtimeDashboard)

// const AuditContainer = connect(mapStateToProps, mapDispatchToProps)(AuditIndex)

export default realtimeDashboardContainer;