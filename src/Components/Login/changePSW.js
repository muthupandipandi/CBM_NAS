import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";
import ShowModalLogin from '../showModalLogin';
import '../../Resources/css/loggedIn.css';
import '../../Resources/css/loginback.css';
import { JSEncrypt } from 'jsencrypt';
//import royal from '../../Resources/images/royal.png';
import _ from 'lodash'

class PSWChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      oldPassword:'',
      confirmPassword:'',
      newPassword:'',
      passwordtype:"password",
      new_passwordtype:"password",
      cfm_passwordtype:"password",
      add:props.add
    };
  }
  viewPassword_New = (prop) => {
		this.setState({ new_passwordtype: prop })
	}
	viewPassword_Cnf = (prop) => {
		this.setState({ cfm_passwordtype: prop })
	}
  componentDidUpdate (prevProps, prevState) {    
console.log(this.props.action.showerror)
console.log(this.props.action.showerror)
    if(this.props.action.showerror===false){
      this.signIN()
    }
    // if(_.isEmpty(this.props.loggedInfo) && !_.isEqual(prevProps.loggedInfo, this.props.loggedInfo)){
    //    this.props.attemptInfo()
    // }    
  }
validateForm() {
    if(this.state.id && this.state.id.length > 0 && this.state.password.length > 0 && this.state.newPassword.length > 0 && this.state.confirmPassword.length > 0)
    return true;
}
UNSAFE_componentWillReceiveProps(nextProps){
  if(nextProps.isPending === false && !_.isEmpty(nextProps.loggedinData) && nextProps.showerror === false){
    this.signIN(nextProps.modules)
  }
}

handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
}

handleSubmit = event => {
  event.preventDefault();   
}

signIN = () =>{    
  // const {loggedinData} = this.props;
  if(this.state.clicked === true){
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
  let obj = {'userId': this.state.id , 'oldPassword': this.state.password,'newPassword': this.state.newPassword,'confirmPassword': this.state.confirmPassword}
  // let obj = {'username': this.state.id , 'password': 'nLip4KPigzhHYNsPae+yRPUWatS+Eh/LZbTe3dsiPcwYkcfFR3P4DbhusxzWEEo014jXrrfy7KU4e8JCQi9sBbZ7zDJojnFOPQIYtRZsZ/iF18ZFtCEyLPUdJ5sVCtWTlL6ia6b5hLht73exagy6LcNAxcKL9UiKYorOH7ia4w12iRPNPLYmAR0It4r/QGRzd/9A44+U3R69qmHCkAk4z+t7A4pjpvfW7oPj2loINZiIKGs7wDkqVM/waANabsUTL9uIoMa5s8OQNPLocPdpSyjUSG+UveqRFmEyUdi7BEaF8fDna//tzzZbeIk9ftAYamXQSoUtg7nTSXHkbEO3rQ=='}
  this.props.action.LoginChangePassword(obj)
  this.setState({clicked:true})
  console.log(this.props)
}
// loginattemptwithOTP = () =>{
//   let obj = {'employeeId': this.state.id , 'otpNumber': this.state.OTP}
//   this.props.LoginAttemptWithOTP(obj)
// }
 render() {
    return (
      <div className="login_container">
        <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div style={{'textAlign':'center'}}>
                    <br/>
                    {/* <h1 className="loginHeader">Appointment Reminder</h1> */}
                </div>
                <div class="login-form">
                <form onSubmit={this.handleSubmit}>
                  <h6 className="loginHeader">Change Password</h6>          

                  <FormGroup controlId="id" >          
                    <FormControl
                      autoFocus
                      type="id"
                      value={this.state.id}
                      onChange={this.handleChange}
                      placeholder = "UserName"
                    />
                  </FormGroup>
                  <FormGroup controlId="Old password">
                  <InputGroup>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    id='password'
                    type={this.state.passwordtype}
                    placeholder = "Old password"
                  />
                    {!_.isEmpty(this.state.password) ?
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">{this.state.passwordtype === "password" ?     
                        <i className='fas fa-eye' onClick={()=>this.viewPassword('text')} /> :
                        <i className='fas fa-eye-slash' onClick={()=>this.viewPassword('password')} /> }</InputGroup.Text>
                      </InputGroup.Append> : null }
                    </InputGroup>
                  </FormGroup> 
                  <FormGroup controlId="New password">
                  <InputGroup>
                  <FormControl
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    id='newPassword'
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
                  <FormGroup controlId="Confirm password">
                  <InputGroup>
                  <FormControl
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    id="confirmPassword"
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
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    className="buttonwidth"
                    onClick={this.loginattempt}
                  >
                  Update Password
                </Button>
                <br></br>
                <Button type="submit" block className="buttonwidth" variant="primary" onClick={this.props.closeModal}>Close</Button>
                </form>

                </div>
              </div>
            </div>
          </div>
        
        
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

