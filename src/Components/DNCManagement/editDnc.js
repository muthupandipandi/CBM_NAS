import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col} from 'react-bootstrap';
import _, { toInteger } from 'lodash';
//import TimePicker from 'react-time-picker';
import ShowModalLogin from '../showModalLogin';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-picky/dist/picky.css'; 

 export default class EditDnc extends Component {
	constructor(props){
		super(props)
		this.state = {
			descriptions:props.edit ? props.edit.description : '',
			dncName:props.edit ? props.edit.dncName : '',
			dncid: props.edit.dncid ? props.edit.dncid : '',
			dncStatus:true
			}; 
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
		// if(!_.isEmpty(loggedinData)){
		// 	if(loggedinData.ldapEnabled){
				return true
			// } else {
			// 	if(this.state.passwordIsValid && this.state.password && this.state.password?.length > 0){
			// 		return true
			// 	}
			}
	
   }

   checkDncStatus = () => {
	const {dncName} = this.state
	const obj = {'dncName': dncName}
	this.props.action.checkDncStatus(obj)
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


render(){
	const {isOpen,isPending,showMessage,message} = this.props
	// const dncStatus = _.cloneDeep(this.props.action.dncStatus) 
	
	// console.log("creat state", this.state)
	// console.log("creat props", this.props)
	
	const {descriptions,
	dncName,dncStatus} = this.state;	
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
									onChange={this.handleChange} value={dncName}
									placeholder="Enter DNC Name"
									onBlur={this.checkDNCExistence}
									/>
									
								{(dncStatus === false) ? <span className="colorRed">&nbsp;****DNC name is already exits****</span>: null}
							
							</Col>
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Description <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="descriptions"  maxLength={200}
									 value={descriptions}
									placeholder="Enter Descriptions"
									onChange={this.handleChange}
									/>
									
									
							</Col>

							

								{/* <Col md={2}>Active<span className='colorRed'></span></Col>
								<Col md={4}>
									<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
								</Col> */}
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
						<Col md={2}> <Button  variant="danger alignRight" onClick={this.props.closeModal}>Close</Button>
						</Col>
						<Col md={2}> <Button  variant="primary alignRight" disabled={!this.validateForm()} onClick={this.handleSubmit}>Update DNC</Button></Col>
						<Col md={4}></Col>	
					</Row>
				</div>
		</div> 
		</Modal.Body>
            </Modal>
	</div>
	)
}
}
