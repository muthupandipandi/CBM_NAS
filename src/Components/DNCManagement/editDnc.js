import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col,Form} from 'react-bootstrap';
import _, { toInteger } from 'lodash';
//import TimePicker from 'react-time-picker';
import ShowModalLogin from '../showModalLogin';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-picky/dist/picky.css'; 
import MessageShow from '../mesaageShow'
 export default class EditDnc extends Component {
	constructor(props){
		super(props)
		this.modalRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
		this.state = {
			saveMessage:false,
			clearMessage:false,
			descriptions:props.edit ? props.edit.description : '',
			dncName:props.edit ? props.edit.dncName : '',
			dncid: props.edit.dncid ? props.edit.dncid : '',
			dncStatus:true,
			selectedOption:'',
			insertNumber:'',
		 deleteNumber:''
			}; 
 }
 componentDidMount() {
	document.addEventListener('mousedown', this.handleClickOutside);
}

componentWillUnmount() {
	document.removeEventListener('mousedown', this.handleClickOutside);
}

handleClickOutside(event) {
	console.log(event)
	// if (this.modalRef && !this.modalRef.current.contains(event.target)) {
		// Click occurred outside of the modal, prevent modal from closing
		event.stopPropagation();
	// }
}

 handleCallBack = () =>{
	/// this.props.onCallBack(this.state)
	 this.props.closeModal()
   }

   
   handleChange = (event) => {
	if (parseInt(event.target.maxLength)>=event.target.value.length){
	this.setState({
	[event.target.id]: event.target.value
	});
	}
	
}
  
   validateForm() {
 
	const {descriptions,dncName,dncStatus} = this.state
	if (descriptions &&descriptions?.length > 0 &&dncName &&dncName?.length > 0 && dncStatus){
		if (this.state.selectedOption!==''){
		if (this.state.insertNumber && this.state.insertNumber?.length>0 || (this.state.deleteNumber && this.state.deleteNumber?.length>0)){
			return true
		}
		}
		else{
		// if(!_.isEmpty(loggedinData)){
		// 	if(loggedinData.ldapEnabled){
				return true
			// } else {
			// 	if(this.state.passwordIsValid && this.state.password && this.state.password?.length > 0){
			// 		return true
			// 	}
			}
	
   }
}


   checkDncStatus = () => {
	const {dncName} = this.state
	const obj = {'dncName': dncName}
	this.props.action.checkDncStatus(obj)
}
addDncclick=()=>{
	const {loggedinData} = this.props; 	
	const {descriptions,dncName,dncid} = this.state
	let obj={
		"contactNumber":this.state.insertNumber,
		"dncid":dncid
		
	}   
	//console.log("Ad Campaign",obj)     
	this.props.action.updateDNC(obj) 	 
}
deleteDncclick=()=>{
	const {loggedinData} = this.props; 	
	const {descriptions,dncName,dncid} = this.state
	let obj={
		"contactNumber":this.state.deleteNumber,
		"dncid":dncid
		
	}   
	//console.log("Ad Campaign",obj)     
	this.props.action.deleteDNC(obj) 	 
}
   handleSubmit =() => {  
	   const {loggedinData} = this.props; 	
	   const {descriptions,dncName,dncid} = this.state
	   let obj={
		   "description" : descriptions,
		   "dncName" : dncName,
		   "dncid":dncid
		   
	   }   
	   //console.log("Ad Campaign",obj)     
	   this.props.action.editDNC(obj) 	 
	   this.props.closeModal()
   } 
   listdatas = () => {
	console.log(this.props)
	let rolesData = _.cloneDeep(this.props.userData)
	console.log(rolesData)
	// rolesData = _.reject(rolesData,['roleId',1])
	return rolesData
}
handleAllowCharacters=(event)=>{
	const onlyLetters = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces

	if (onlyLetters.test(event.target.value) || event.target.value === '') {
		if (parseInt(event.target.maxLength)>=event.target.value.length){
			this.setState({
				[event.target.id]: event.target.value})
			}

	}
   }
   checkDNCExistence = () => {
	const { userData, dncName,dncStatus } = this.state;
	const dispositionExists = this.listdatas().find(item => item.dncName === dncName);
	console.log(dispositionExists)
	if (dispositionExists){
		
		this.setState({dncStatus : false})
	} else{
		this.setState({dncStatus : true})
	}
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
  handleOptionChange=(event)=>{
	this.setState({selectedOption : event.target.value})

  }
  handleAllowNubers = (event) => {
	const { value } = event.target;
	console.log(event.target.value)
	const onlyNumbers = /^[0-9]*$/; // Regular expression to allow only numbers
	if (parseInt(event.target.maxLength)>=event.target.value.length){
	if (onlyNumbers.test(value) || value === '') {
		this.setState({
			[event.target.id]: event.target.value
		});
	}
	else{
		this.setState({
			[event.target.id]: this.state[event.target.id]
		});
	}
}
}

  closeSaveClearMessage = () => {
	this.setState({saveMessage : false})
  }
render(){
	const {isOpen,isPending,showMessage,message} = this.props
	// const dncStatus = _.cloneDeep(this.props.action.dncStatus) 
	
	// console.log("creat state", this.state)
	// console.log("creat props", this.props)
	
	const {descriptions,
	dncName,dncStatus,saveMessage,clearMessage,selectedOption,insertNumber,deleteNumber} = this.state;	
	const {timesList} = this.props.action	
	
	
return(
	<div>        
		{/* {isPending ? <span className='spinner alignRight'>
		Loading... <Spinner animation="grow" role="status" size='lg'/>
			</span> : null} */}
		{(showMessage === true) ?
		<ShowModalLogin message={message} falseShowModalPopUp={this.props.UserGroupEditErrorClose}/> : null}
		<Modal
            show={true}
            onHide={this.props.closeModal}
            dialogClassName="modal-120w"
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
			backdrop="static"
    keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
			Edit DNC
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
		<div>
			<br/>
			<div >
				{/* <span className='alignLeft'>ADD DNC </span> */}
				<span className='alignRight colorRed'> * Indicates Required Field</span>
			</div>
			<div><br/><br/></div>
			<div className='addCampaign'>
				<div className="form_container">

					<Row className='align-items-center'>             
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; DNC Name  <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="dncName" maxLength={30}  
									onChange={this.handleAllowCharacters} value={dncName}
									onPaste={this.handleAllowCharacters}
									placeholder="Enter DNC Name"
									onBlur={this.checkDNCExistence}
									/>
									
								{(dncStatus === false) ? <span className="colorRed">&nbsp;****DNC name is already exits****</span>: null}
							
							</Col>
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Description <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="descriptions"  maxLength={200}
									 value={descriptions}
									placeholder="Enter Description"
									onChange={this.handleChange}
									/>
									
									
							</Col>

							

								{/* <Col md={2}>Active<span className='colorRed'></span></Col>
								<Col md={4}>
									<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
								</Col> */}
					</Row>
				
					
					<Row className='align-items-center'>
						
						
	  {/* {selectedOption && selectedOption === 'Insert_Number' && (
									<> */}
	  <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Insert Number  </Col>
							<Col md={3} ><FormControl  type='text' id="insertNumber" maxLength={10}  
									onChange={this.handleAllowNubers} onPaste={this.handleAllowNubers} value={insertNumber}
									placeholder="Enter Insert Number"
									
									/>
									
									
								
							
							</Col>
							<Col md={1}>
							<Button  variant="primary alignRight" style={{ cursor: this.state.insertNumber.length >9 ? 'auto' : 'not-allowed' }} disabled={!this.state.insertNumber || this.state.insertNumber.length <10} onClick={this.addDncclick}>Add</Button>
							</Col>
							
							{/* </>)} */}

	  {/* {selectedOption && selectedOption !== 'Insert_Number' && (
							<> */}

							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Delete Number </Col>
							<Col md={3} ><FormControl  type='text' id="deleteNumber"  maxLength={10}
									 value={deleteNumber}
									placeholder="Enter Delete Number"
									
									onChange={this.handleAllowNubers} onPaste={this.handleAllowNubers}
									/>
									
									
							</Col>
							<Col md={1}>
							<Button  variant="primary alignRight" style={{ cursor: this.state.deleteNumber.length >9 ? 'auto' : 'not-allowed' }} disabled={!this.state.deleteNumber || this.state.deleteNumber.length <10} onClick={this.deleteDncclick}>Delete</Button>
							</Col>
							{/* </>)} */}


					</Row>
					{/* <Row className='align-items-center'>             
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Name  <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="dispostionName"  
									 value={dispostionName}
									placeholder="Enter Dispostion Name"
									onBlur={this.checkCampaignStatus}
									/>
									
									
							</Col>
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Description <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="descriptions"  
									 value={descriptions}
									placeholder="Enter Dispostion Name"
									onBlur={this.checkCampaignStatus}
									/>
									
									
							</Col>

							

								<Col md={2}>Active<span className='colorRed'></span></Col>
								<Col md={4}>
									<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
								</Col>
					</Row> */}
					{/* <Row className='align-items-center'>             
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Name  <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="dispostionName"  
									 value={dispostionName}
									placeholder="Enter Dispostion Name"
									onBlur={this.checkCampaignStatus}
									/>
									
									
							</Col>
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Description <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="descriptions"  
									 value={descriptions}
									placeholder="Enter Dispostion Name"
									onBlur={this.checkCampaignStatus}
									/>
									
									
							</Col>

							

								<Col md={2}>Active<span className='colorRed'></span></Col>
								<Col md={4}>
									<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
								</Col>
					</Row> */}
					{/* <Row className='align-items-center'>             
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Name  <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="dispostionName"  
									 value={dispostionName}
									placeholder="Enter Dispostion Name"
									onBlur={this.checkCampaignStatus}
									/>
									
									
							</Col>
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Description <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="descriptions"  
									 value={descriptions}
									placeholder="Enter Dispostion Name"
									onBlur={this.checkCampaignStatus}
									/>
									
									
							</Col>

							

								 <Col md={2}>Active<span className='colorRed'></span></Col>
								<Col md={4}>
									<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
								</Col> 
					</Row> */}
					{/* <Row className='align-items-center'>             
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Name  <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="dispostionName"  
									 value={dispostionName}
									placeholder="Enter Dispostion Name"
									onBlur={this.checkCampaignStatus}
									/>
									
									
							</Col>
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Description <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="descriptions"  
									 value={descriptions}
									placeholder="Enter Dispostion Name"
									onBlur={this.checkCampaignStatus}
									/>
									
									
							</Col>

							

								 <Col md={2}>Active<span className='colorRed'></span></Col>
								<Col md={4}>
									<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
								</Col> 
					</Row> */}
					
				</div>
				<Row> <br/> </Row>
					<Row className='align-items-center'>
						<Col md={4}></Col>	
						<Col md={2}> <Button  variant="danger alignRight" onClick={this.openClearMessage}>Close</Button>
						</Col>
						
						<Col md={2}> <Button  variant="primary alignRight" style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} disabled={!this.validateForm()} onClick={this.openSaveClearMessage}>Update DNC</Button></Col>
						<Col md={4}></Col>	
					</Row>
				</div>
				{clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Update this DNC?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.handleSubmit} />
	  	  :null}
		</div> 
		</Modal.Body>
            </Modal>
	</div>
	)
}
}
