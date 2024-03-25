import { connect } from "react-redux";
import skillSetList from './listSkillSet';
import { SkillSetLoad,SkillSetEditErrorEditErrorClose,addSkillSet,editSkillSet } from './skillsetActions';

const mapStateToProps = (state) => {
  return {
    fullScreen: state.LoginReducer.isOpen,
    loggedinData: state.LoginReducer.loggedinData,
    userData:state.skillsetReducer.userData,
    
    showMessage:state.skillsetReducer.showMessage,
    message:state.skillsetReducer.message,
    
    isPending:state.skillsetReducer.isPending,
    
  }  
}
const mapDispatchToProps = (dispatch) => ({
  SkillSetLoad: () => dispatch(SkillSetLoad()),
  addSkillSet: (a) => dispatch(addSkillSet(a)),
  editSkillSet: (a) => dispatch(editSkillSet(a)),
  SkillSetEditErrorEditErrorClose:() => dispatch(SkillSetEditErrorEditErrorClose()),
  
})

const skillsetContainer = connect(mapStateToProps, mapDispatchToProps)(skillSetList)

export default skillsetContainer;