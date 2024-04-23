import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal,Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";
// import ShowModalLogin from '../showModalLogin';
import '../../Resources/css/loggedIn.css';
import '../../Resources/css/loginback.css';
import { JSEncrypt } from 'jsencrypt';
//import royal from '../../Resources/images/royal.png';
// import {LoginChangePassword} from '../Login/LoginActions';
import _ from 'lodash'
import ShowModalLogin from '../showModalLogin';
import MessageShow from '../mesaageShow'

class PSWChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.loggedinData.userName,
      password: "",
      oldPassword:'',
      confirmPassword:'',
      newPassword:'',
      passwordtype:"password",
      new_passwordtype:"password",
      cfm_passwordtype:"password",
      clearMessage:false,
      saveMessage:false,
      passwordStatus:false,
      loggedinData:this.props.loggedinData
      

      
    };
  }
  viewPassword_New = (prop) => {
		this.setState({ new_passwordtype: prop })
	}
	viewPassword_Cnf = (prop) => {
		this.setState({ cfm_passwordtype: prop })
	}
  componentDidUpdate (prevProps, prevState) {    
console.log(this.props)
    if(this.props.action.showerror===true){
      this.signIN()
    }
    // if(_.isEmpty(this.props.loggedInfo) && !_.isEqual(prevProps.loggedInfo, this.props.loggedInfo)){
    //    this.props.attemptInfo()
    // }    
  }
validateForm() {

    if(this.state.newPassword.length > 0 && this.state.confirmPassword.length > 0){
      if (this.state.id==this.props.action.loggedinData.userName){
        return true;
      }
    
    }
}
UNSAFE_componentWillReceiveProps(nextProps){
  if(nextProps.isPending === false && !_.isEmpty(nextProps.loggedinData) && nextProps.showerror === false){
    this.signIN(nextProps.modules)
  }
}

handleChange = event => {
  if (event.target.id!=='id'){
  this.setState({passwordStatus:false})
  }
  this.setState({
    [event.target.id]: event.target.value
  });
}

handleSubmit = event => {
  event.preventDefault();   
}
openClearMessage = () => {
		
  this.setState({clearMessage : true})
  }

  closeClearMessage = () => {
  this.setState({clearMessage : false})
  }

  openSaveClearMessage = () => {
  
  this.setState({saveMessage : true})
  }

  closeSaveClearMessage = () => {
  this.setState({saveMessage : false})
  }

signIN = () =>{    
  // const {loggedinData} = this.props;
  console.log(this.props)
  if(this.state.clicked === true){
    console.log('hii')
    this.props.closeModal()
  }
}
viewPassword = (prop) => {
  this.setState({passwordtype:prop}) 
}
loginattempt = () =>{
  
  // const publickey = process.env.REACT_APP_PUBLIC_KEY;
  // const encrypt = new JSEncrypt()
  // encrypt.setPublicKey(publickey);
  // const encyPassword = encrypt.encrypt(this.state.password);
  // console.log(encyPassword)
  let obj = {'userId': this.state.loggedinData.userName, 'oldPassword': this.state.password,'newPassword': this.state.newPassword,'confirmPassword': this.state.confirmPassword}
  // let obj = {'username': this.state.id , 'password': 'nLip4KPigzhHYNsPae+yRPUWatS+Eh/LZbTe3dsiPcwYkcfFR3P4DbhusxzWEEo014jXrrfy7KU4e8JCQi9sBbZ7zDJojnFOPQIYtRZsZ/iF18ZFtCEyLPUdJ5sVCtWTlL6ia6b5hLht73exagy6LcNAxcKL9UiKYorOH7ia4w12iRPNPLYmAR0It4r/QGRzd/9A44+U3R69qmHCkAk4z+t7A4pjpvfW7oPj2loINZiIKGs7wDkqVM/waANabsUTL9uIoMa5s8OQNPLocPdpSyjUSG+UveqRFmEyUdi7BEaF8fDna//tzzZbeIk9ftAYamXQSoUtg7nTSXHkbEO3rQ=='}
  this.setState({clicked:true})
  this.props.action.LoginChangePassword(obj)
  
  console.log(this.props)
}
handlePaste = (e) => {
  e.preventDefault(); // Prevent pasting
};
handleBlur = () => {
  if (this.state.confirmPassword.length!=0){
    if (this.state.newPassword!==this.state.confirmPassword){
      this.setState({passwordStatus:true})
    }
  }
  // You can perform any actions you want when the input field loses focus
};
// loginattemptwithOTP = () =>{
//   let obj = {'employeeId': this.state.id , 'otpNumber': this.state.OTP}
//   this.props.LoginAttemptWithOTP(obj)
// }
 render() {
  const {isOpen,isPending} = this.props
  const {showMessage,message} = this.props.action
		const { clearMessage,
			saveMessage,passwordStatus } = this.state;
		
		// console.log("creat state", this.state)
		// console.log("creat props", this.props)
		
		const {descriptions,
        dispostionName} = this.state;	
		const {timesList} = this.props.action	
//   if(showMessage === true)
// {
//   this.autoHide()
//  }
    return (
      
      <div>
        {(showMessage === true) ?
		<ShowModalLogin message={message} falseShowModalPopUp={this.props.CampaignEditErrorClose}/> : null}
		<Modal
            show={true}
            onHide={this.props.closeModal}
            dialogClassName="modal-80w"
            size="m"
            aria-labelledby="contained-modal-title-vcenter"
            centered
			backdrop="static"
    keyboard={false}
            >
            <Modal.Header closeButton>
            
            </Modal.Header>
            <Modal.Body>
        <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div style={{'textAlign':'center'}}>
                    <br/>
                    {/* <h1 className="loginHeader">Appointment Reminder</h1> */}
                </div>
                <div class="login-form-psw">
                <form onSubmit={this.handleSubmit}>
                  <h6 className="loginHeader-psw">Change Password</h6>          

                  {/* <FormGroup controlId="id" >          
                    <FormControl
                      autoFocus
                      type="id"
                      value={this.state.id}
                      onChange={this.handleChange}
                      placeholder = "UserName"
                    />
                  </FormGroup> */}
                  
                 
                  <FormGroup controlId="newPassword">
                  <InputGroup>
                  <FormControl
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onPaste={this.handlePaste}
                          onCopy={this.handlePaste}
                          onCut={this.handlePaste}
                    type={this.state.new_passwordtype}
                    placeholder = "New password"
                  />
                    {!_.isEmpty(this.state.newPassword) ?
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">{this.state.new_passwordtype === "password" ?     
                        <i className='fas fa-eye' onClick={()=>this.viewPassword_New('text')} /> :
                        <i className='fas fa-eye-slash' onClick={()=>this.viewPassword_New('password')} /> }</InputGroup.Text>
                      </InputGroup.Append> : null }
                    </InputGroup>
                  </FormGroup> 
                  {(passwordStatus === true) ? <span className="colorRed">&nbsp;****The Passwords you entered do not match****</span>: null}
                  <FormGroup controlId="confirmPassword">
                  <InputGroup>
                  <FormControl
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onPaste={this.handlePaste}
                          onCopy={this.handlePaste}
                          onCut={this.handlePaste}
                    type={this.state.cfm_passwordtype}
                    placeholder = "Confirm password"
                  />
                    {!_.isEmpty(this.state.confirmPassword) ?
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">{this.state.cfm_passwordtype === "password" ?     
                        <i className='fas fa-eye' onClick={()=>this.viewPassword_Cnf('text')} /> :
                        <i className='fas fa-eye-slash' onClick={()=>this.viewPassword_Cnf('password')} /> }</InputGroup.Text>
                      </InputGroup.Append> : null }
                    </InputGroup>
                  </FormGroup> 
                  {/* {this.props.showOtp === true ?<FormGroup controlId="OTP" >          
                    <FormControl
                      autoFocus
                      type="number"
                      value={this.state.OTP}
                      onChange={this.handleChange}
                      placeholder = "OTP"
                    />
                  </FormGroup> : null}             */}
                  {/* {this.props.showOtp === true ?
                  <Button variant="primary"
                  block
                //  disabled={!this.validateFormOTP()}
                  type="submit"
                  className="buttonwidth"
                  onClick={this.loginattemptwithOTP}
                  >
                  LOGIN
                </Button>
                :  */}
                
                <Button variant="primary"
                style={{width:'40%',margin:'0 auto',fontSize:'22px',background:'#3e8ade'}}
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    className="buttonwidth"
                    onClick={this.openSaveClearMessage}
                  >
                  Submit
                </Button>
                <br></br>
                
                </form>

                </div>
                {clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Update the password?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.loginattempt} />
	  	  :null}
              </div>
            </div>
          </div>

          </Modal.Body>
            </Modal>
        
        
        {/* <div className='login_Content'>
                    
        </div>  */}
        {/* {this.props.action.showerror === true ||this.state.add===true && (
            <ShowModalLogin message={this.props.action.errorMessage} falseShowModalPopUp={this.props.action.closeModalPopUp} />
          )} */}
      </div>
    );
  }
}
export default PSWChange

