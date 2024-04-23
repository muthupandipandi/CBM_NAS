import { connect } from "react-redux";
import campaignManagement from './campaignManagement';
import { CampaignLoad,DispostionLoad,DNCLoad,startRunCampaignStatus,stopRunCampaignStatus,pauseRunCampaignStatus,resumeRunCampaignStatus, addnewCampaign,UserGroupsData,editCampaign, CampaignEditErrorClose, checkCampaignStatus, uploadContacts } from './campaignActions';
import { setNavOpen } from  '../Login/LoginActions';
import { add } from "lodash";
const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    loggedinData: state.LoginReducer.loggedinData,
    userData:state.campaignReducer.userData,
    rolesData:state.campaignReducer.rolesData,
    showMessage:state.campaignReducer.showMessage,
    message:state.campaignReducer.message,
    isOpen: state.LoginReducer.isOpen,
    isPending:state.campaignReducer.isPending,
    timesList:state.campaignReducer.timesList,
    groupsData:state.userReducer.groupsData,
    campaignStatus:state.campaignReducer.campaignStatus,
    dispostionData:state.campaignReducer.dispostionData,
    dncData:state.campaignReducer.dncData
    
  }  
}
const mapDispatchToProps = (dispatch) => ({
  CampaignLoad: () => dispatch(CampaignLoad()),
  DispostionLoad: () => dispatch(DispostionLoad()),
  DNCLoad: () => dispatch(DNCLoad()),
  addnewCampaign: (a) => dispatch(addnewCampaign(a)),
  editCampaign: (a) => dispatch(editCampaign(a)),
  CampaignEditErrorClose:() => dispatch(CampaignEditErrorClose()),
  checkCampaignStatus:(a) => dispatch(checkCampaignStatus(a)),
  UserGroupsData: (a) => dispatch(UserGroupsData(a)),
  uploadContacts: (a) => dispatch(uploadContacts(a)),
  startRunCampaignStatus: (a) => dispatch(startRunCampaignStatus(a)),
  stopRunCampaignStatus: (a) => dispatch(stopRunCampaignStatus(a)),
  pauseRunCampaignStatus: (a) => dispatch(pauseRunCampaignStatus(a)),
  resumeRunCampaignStatus: (a) => dispatch(resumeRunCampaignStatus(a)),

  setNavOpen:(a)=>dispatch(setNavOpen(add))
})

const campaignContainer = connect(mapStateToProps, mapDispatchToProps)(campaignManagement)

export default campaignContainer;