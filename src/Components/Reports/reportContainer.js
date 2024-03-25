import { connect } from "react-redux";
import Report from './report';
import {} from './reportAction';
import {isErrorClose, getCampaignName, generateReport, downloadReport, generateDetailReport, downloadDetailReport} from './reportAction'

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    showMessage:state.reportReducer.showMessage,
    message:state.reportReducer.message,
    isOpen: state.LoginReducer.isOpen,
    isPending:state.reportReducer.isPending,
    reportData:state.reportReducer.reportData,
    reportHeader:state.reportReducer.reportHeader,
    campaignNameList:state.reportReducer.campaignNameList,
  }  
}
const mapDispatchToProps = (dispatch) => ({
  isErrorClose:() => dispatch(isErrorClose()),
  generateReport:(a) => dispatch(generateReport(a)),
  generateDetailReport:(a) => dispatch(generateDetailReport(a)),
  downloadReport:(a) => dispatch(downloadReport(a)),
  downloadDetailReport:(a) => dispatch(downloadDetailReport(a)),
  getCampaignName:() => dispatch(getCampaignName()),
  
})

const reportContainer = connect(mapStateToProps, mapDispatchToProps)(Report)

export default reportContainer;