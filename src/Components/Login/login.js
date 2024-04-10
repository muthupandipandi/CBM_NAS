import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";
import ShowModalLogin from '../showModalLogin';
import '../../Resources/css/loggedIn.css';
import '../../Resources/css/loginback.css';
import { JSEncrypt } from 'jsencrypt';
// import PSWChange from './changePSW'
//import royal from '../../Resources/images/royal.png';
import _ from 'lodash'

 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      passwordtype:"password",
      add:false
    };
  }
  componentDidUpdate (prevProps, prevState) {    
    // showerror=this.props.showerror
    console.log(this.props)
    if(!_.isEmpty(this.props.accessToken)){
      this.signIN()
    }
    // if(_.isEmpty(this.props.loggedInfo) && !_.isEqual(prevProps.loggedInfo, this.props.loggedInfo)){
    //    this.props.attemptInfo()
    // }    
  }
validateForm() {
    if(this.state.id && this.state.id.length > 0 && this.state.password.length > 4 &&this.state.password.length > 0)
    return true;
}
UNSAFE_componentWillReceiveProps(nextProps){
  if(nextProps.isPending === false && !_.isEmpty(nextProps.loggedinData) && nextProps.showerror === false){
    this.signIN(nextProps.modules)
  }
}

handleChange = event => {
  if (parseInt(event.target.maxLength)>=event.target.value.length){
  this.setState({
    [event.target.id]: event.target.value
  });
}
}

handleSubmit = event => {
  event.preventDefault();   
}

signIN = () =>{    
  const {loggedinData} = this.props;
  if(this.state.clicked === true){
      this.props.history.push('/dashboard/reportgraph')
  }
}
viewPassword = (prop) => {
  this.setState({passwordtype:prop}) 
}
handleAdd = () => {
  this.setState({add:true})
}
handleAddClose = () => {
  this.setState({add:false})
}	
loginattempt = () =>{
  
  const publickey = process.env.REACT_APP_PUBLIC_KEY;
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publickey);
  const encyPassword = encrypt.encrypt(this.state.password);
  console.log(encyPassword)
  let obj = {'username': this.state.id , 'password': encyPassword}
  // let obj = {'username': this.state.id , 'password': 'nLip4KPigzhHYNsPae+yRPUWatS+Eh/LZbTe3dsiPcwYkcfFR3P4DbhusxzWEEo014jXrrfy7KU4e8JCQi9sBbZ7zDJojnFOPQIYtRZsZ/iF18ZFtCEyLPUdJ5sVCtWTlL6ia6b5hLht73exagy6LcNAxcKL9UiKYorOH7ia4w12iRPNPLYmAR0It4r/QGRzd/9A44+U3R69qmHCkAk4z+t7A4pjpvfW7oPj2loINZiIKGs7wDkqVM/waANabsUTL9uIoMa5s8OQNPLocPdpSyjUSG+UveqRFmEyUdi7BEaF8fDna//tzzZbeIk9ftAYamXQSoUtg7nTSXHkbEO3rQ=='}
  this.props.LoginAttemptAction(obj)
  this.setState({clicked:true})
}
// loginattemptwithOTP = () =>{
//   let obj = {'employeeId': this.state.id , 'otpNumber': this.state.OTP}
//   this.props.LoginAttemptWithOTP(obj)
// }
 render() {
  const {add} = this.state;
  console.log(this.props)
  const {showerror, message,errorMessage} = this.props;
    return (
      <div>{showerror}
        {(showerror === true) ?
        <ShowModalLogin action={this.props} message={errorMessage} falseShowModalPopUp={this.props.closeModalPopUp}/> : null}
      {/* {add === true ? 
        <PSWChange action={this.props} add={add} closeModal={this.handleAddClose} /> : */}
        <div className="login_container">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div style={{ textAlign: 'center' }}>
                  <br/>
                  <h1 className="loginHeader">Call Back Manager</h1>
                </div>
                <div className="login-form">
                  <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="id">
                      <FormControl
                        autoFocus
                        type="id"
                        value={this.state.id}
                        onChange={this.handleChange}
                        placeholder="UserName"
                        maxLength={30}
                      />
                    </FormGroup>
                    <FormGroup controlId="password">
                      <InputGroup>
                        <FormControl
                          value={this.state.password}
                          onChange={this.handleChange}
                          type={this.state.passwordtype}
                          minLength={5}
                          maxLength={20}
                          placeholder="Password"
                        />
                        {!_.isEmpty(this.state.password) && (
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">
                              {this.state.passwordtype === "password" ?     
                                <i className='fas fa-eye' onClick={()=>this.viewPassword('text')} /> :
                                <i className='fas fa-eye-slash' onClick={()=>this.viewPassword('password')} />}
                            </InputGroup.Text>
                          </InputGroup.Append>
                        )}
                      </InputGroup>
                    </FormGroup>
                    <Button variant="primary" block disabled={!this.validateForm()} type="submit" className="buttonwidth" onClick={this.loginattempt}>
                      LOGIN
                    </Button>
                  </form>
                  <br></br>
                  {/* <div className='alignRight clearing marginBottom'>
                    <Button className="inlineBlock" onClick={this.handleAdd}>
                      <span><i className="fas fa-plus-square m-r-20" ></i></span> Change Password
                    </Button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* {this.props.showerror === true && (
            <ShowModalLogin message={this.props.errorMessage} falseShowModalPopUp={this.props.closeModalPopUp} />
          )} */}
        </div>
      
    </div>
  );
}
}

export default Login;