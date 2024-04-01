import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Modal, FormControl, Button, FormGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {DashboardAction, LogoutAction, LoginAttemptAction ,LoginAttemptWithOTP, showModalLoginModal, makeShowmodalFalse} from '../Login/LoginActions'
import TittleImage from '../../Resources/images/ap_img.jpg';
import cpm from '../../Resources/images/cpm.png';
import {Link} from 'react-router-dom'
import _ from 'lodash';


class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state={
      isOpen:false
    }
  }
  
  componentDidMount(){    
    //this.setSession()
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
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault();   
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
    const {isOpen} = this.state
    const {data} = this.props
    let x = _.find(data, {'path':this.props.location.pathname})
    return (
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
            <div className="sidebarComponents"> 
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
            <span className=" firstName">{this.props.loggedinData.userName}</span>
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
      </div>)
  }
}
function mapStateToProps(state){
  return{
   loggedinData: state.LoginReducer.loggedinData,
   data: state.LoginReducer.modules,
   showModalLogin:state.LoginReducer.showModalLogin,
  }
}

const mapDispatchToProps = (dispatch) => ({
   action: (a) => dispatch(LoginAttemptAction(a)),
   DashboardAction:  (obj) =>dispatch(DashboardAction(obj)), 
   logout:  (a) =>dispatch(LogoutAction(a)), 
   showModalLoginModal:  () =>dispatch(showModalLoginModal()), 
  //  LoginAttemptWithOTP: (obj) => dispatch(LoginAttemptWithOTP(obj)),
   makeShowmodalFalse:() => dispatch(makeShowmodalFalse())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
