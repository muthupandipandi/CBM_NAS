import { connect } from "react-redux";
import {LoginAttemptAction, closeModalPopUp, LoginAttemptWithOTP,LoginChangePassword,setNavOpen} from './LoginActions';
import Login from './login';

function mapStateToProps(state){
    return{
      loggedinData: state.LoginReducer.loggedinData,
      modules: state.LoginReducer.modules,
      errorMessage: state.LoginReducer.errorMessage,
      showerror: state.LoginReducer.showerror,    
      isPending: state.LoginReducer.isPending,
      accessToken:state.LoginReducer.accessToken,
      navOpen:state.LoginReducer.navOpen,
    }  
  }
  const mapDispatchToProps = (dispatch) => ({
    // LoginAttemptWithOTP: (obj) => dispatch(LoginAttemptWithOTP(obj)),
    LoginAttemptAction: (obj) => dispatch(LoginAttemptAction(obj)),
    closeModalPopUp: () => dispatch(closeModalPopUp()),
    setNavOpen:(a) =>dispatch(setNavOpen(a))
    // LoginChangePassword:(a) =>dispatch(LoginChangePassword(a))
  })
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer


