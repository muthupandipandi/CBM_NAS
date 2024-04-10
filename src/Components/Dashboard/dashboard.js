import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Modal, FormControl, Button, FormGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {DashboardAction, LogoutAction, LoginAttemptAction ,LoginAttemptWithOTP, showModalLoginModal, makeShowmodalFalse,LoginChangePassword} from '../Login/LoginActions'
import TittleImage from '../../Resources/images/ap_img.jpg';
import cpm from '../../Resources/images/cpm.png';
import {Link} from 'react-router-dom'
import _ from 'lodash';
import PSWChange from './changePSW'


class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state={
      isOpen:false,
      add:false
    }
  }
  
  componentDidMount(){    
    //this.setSession()
    let dd=window.localStorage.getItem('modules')
    console.log(dd?JSON.parse(dd):[])
  }

  setSession(){
    window.onload = function(event) {       
      this.props.logout(this.props.history) 
      }.bind(this)
      if(!_.isEmpty(this.props.loggedinData.expirySeconds)){
        let timelapse = parseInt(this.props.loggedinData.expirySeconds)      
        timelapse = timelapse - 50000      
        setTimeout(() => {
          this.props.showModalLoginModal()
          }, timelapse);
        }
  }
  
  createSideNavigation = (data) =>{
     return  _.map(data, (obj, i) =>{
      return(  
        <Nav.Link key={i}><Link to={obj.path}>
          <span><i class={obj.icon}/> 
        </span>
        {obj.moduleName}</Link></Nav.Link>      
          // <li><Link to={obj.path} className={(this.props.location.pathname === obj.path) ? 'active' :'' }>
          // <span><i class={obj.icon}/></span>
          // {obj.moduleName.toUpperCase()}</Link></li>
        )
      })
  } 
  handleClick = (id) => {
    this.setState({active:id})
  } 
  createSideNavigationIcons = (data) =>{
    const {active} = this.state
          
    console.log(data)
    return  _.map(data, (obj, i) =>{
      return(  
        // <Nav.Link key={i}><Link to={obj.path}>
        //   <span><i className={obj.icon}/></span></Link>
        //   </Nav.Link>      
          // <li> className={(this.props.location.pathname === obj.path) ? 'active' :'' }>
          // <span><i class={obj.icon}/></span>
          // {obj.moduleName.toUpperCase()}</Link></li>
          
          <OverlayTrigger
            key={"right"}
            placement={"right"}
            overlay={
              <Tooltip id={`tooltip-${"right"}`}>
                {obj.moduleName}
              </Tooltip>
              }
            >     
            <Nav.Link key={i} className={active === i ? 'active' : ''} ><Link to={obj.path}>
                <span onClick={()=>this.handleClick(i)}><i class={obj.icon}/> 
              </span>
              </Link></Nav.Link>
            </OverlayTrigger>
          
        )
      })
  }
  changeState = () =>{
    this.props.DashboardAction(!this.state.isOpen)
    this.setState((prevState) =>{
      return {isOpen : !prevState.isOpen}
    })
  }
  LoginChangePasswords=(obj)=>{
    this.props.LoginChangePassword(obj)
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault();   
  }
  handleAdd = () => {
    this.setState({add:true})
}
handleAddClose = () => {
    this.setState({add:false})
}	
  login = () => {
    let obj = {'username': this.state.id , 'password': this.state.password}
    this.props.action(obj, true)
  }
  // loginattemptwithOTP = () =>{
  //   let obj = {'employeeId': this.state.id , 'otpNumber': this.state.OTP}
  //   this.props.LoginAttemptWithOTP(obj)
  // }
  render(){
    const {isOpen,add} = this.state
    const {data} = this.props
    let x = _.find(data, {'path':this.props.location.pathname})
    return (
      <div>      
        {add === true ? 
        <PSWChange action={this.props} add={add} closeModal={this.handleAddClose} /> :
        <div>
            {(isOpen === true) ?
             <div className="sidebarComponentsisOpen">         
              <div className='title'>
                  <h6><p to='/Dashboard'><img alt='icon' src={cpm} width='60px' height='58px'/></p></h6>
              </div>
            <Nav className="flex-column">
            {this.createSideNavigation(data)}
            </Nav> 
            </div>
            : 
            <div style={{ overflow: 'scroll' }} className="sidebarComponents"> 
              <div className='title'>
                  <h6><p to=''><img alt='icon' src={cpm} width='60px' height='58px'/></p></h6>
              </div>   
            <Nav className="flex-column">
            {this.createSideNavigationIcons(data)}
            </Nav>
            </div>}
            <div className='topHeader'>
            {/* <span><i className="fas fa-bars" onClick={this.changeState}></i></span> */}
            <span className='moduleName'>{x ?  x.moduleName.toUpperCase() : null}</span>
            
              
            
              
            
            <span><i className="fas fa-power-off"  onClick={()=>this.props.logout(this.props.history)}></i></span>
            <span className=" firstName"><Button variant="light" style={{color:'#1e4b99',padding: '0px',height: '29px',marginRight:'5px'}}  className="inlineBlock" onClick={this.handleAdd}> <span><i className="fas fa-plus-square m-r-20" ></i> </span> Change Password</Button>{this.props.loggedinData.userName}</span>
            </div>
            <div>

            {this.props.showModalLogin === true ?
              <Modal className="relogin" show={this.props.showModalLogin}
              onHide={this.props.makeShowmodalFalse}
              dialogClassName="modal-120w"
              size='sm'
              backdrop='static'
              aria-labelledby="contained-modal-title-vcenter"
              centered>     
              <Modal.Body>
              <div className='modalLogin'>
              <div className='login_content'>  
              <p>Session Expired! Kindly relogin!!</p>       
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="id" >          
              <FormControl
              autoFocus
              type="id"
              value={this.state.id}
              onChange={this.handleChange}
              placeholder = {"User ID"}
            />
          </FormGroup>
          <FormGroup controlId="password">
           <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder = {"Password"}
            />          
          </FormGroup>    
            <br/>  
          <Button
            type="submit"
            className="alignLeft buttonwidth"
            onClick={this.login}
          >
            LOGIN
            </Button>
          </form>
          </div>
          </div>
          </Modal.Body>
          </Modal>
         : null} 
        </div>
      </div>
      }
      </div>
      )
  }
}
function mapStateToProps(state){
  console.log(state)
  let dd=window.localStorage.getItem('modules')
    
  return{
   loggedinData: state.LoginReducer.loggedinData,
   data: dd?JSON.parse(dd):[],
   showModalLogin:state.LoginReducer.showModalLogin,
   showerror:state.LoginReducer.showerror,
   showMessage:state.LoginReducer.showerror,
   message:state.LoginReducer.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => ({
   action: (a) => dispatch(LoginAttemptAction(a)),
   DashboardAction:  (obj) =>dispatch(DashboardAction(obj)), 
   logout:  (a) =>dispatch(LogoutAction(a)), 
   showModalLoginModal:  () =>dispatch(showModalLoginModal()), 
   LoginChangePassword: (obj) => dispatch(LoginChangePassword(obj)),
   makeShowmodalFalse:() => dispatch(makeShowmodalFalse())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
