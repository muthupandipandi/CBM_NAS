import { connect } from "react-redux";
import RealtimeDashboard from "./realtimeDashborad";
import {RealtimeDashboard_Load,RealtimeDashboarErrorClose,isErrorClose} from './realtimeDashboradAction'

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    showMessage:state.realtimeDashboradReducer.showMessage,
    message:state.realtimeDashboradReducer.message,
    isOpen: state.LoginReducer.isOpen,
    isPending:state.realtimeDashboradReducer.isPending,
    userData:state.realtimeDashboradReducer.userData,
    // reportHeader:state.realtimeDasboardReducer.reportHeader,
  }  
}
const mapDispatchToProps = (dispatch) => ({
  isErrorClose:() => dispatch(isErrorClose()),
  RealtimeDashboard_Load: () => dispatch(RealtimeDashboard_Load()),
  RealtimeDashboarErrorClose:() => dispatch(RealtimeDashboarErrorClose()),
   
})

const realtimeDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(RealtimeDashboard)

// const AuditContainer = connect(mapStateToProps, mapDispatchToProps)(AuditIndex)

export default realtimeDashboardContainer;