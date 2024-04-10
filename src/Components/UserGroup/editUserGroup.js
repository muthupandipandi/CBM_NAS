import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col} from 'react-bootstrap';
import _, { toInteger } from 'lodash';
//import TimePicker from 'react-time-picker';
import ShowModalLogin from '../showModalLogin';
import Select from 'react-dropdown-select';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-picky/dist/picky.css'; 
import {Picky} from 'react-picky';
import MessageShow from '../mesaageShow'

 export default class EditUSerGroup extends Component {
	constructor(props){
		super(props)
		this.modalRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
		console.log(props.edit.usergroupType);
		this.state = {
			items: '', // State to hold list of items
  			newItem: '',
			groupTypeList :[{'id':'Inbound','user_type':'Inbound'},{'id':'Outbound','user_type':'Outbound'},{'id':'Blend','user_type':'Blend'}],
  			groupDescriptions:props.edit ? props.edit.usergroupDesc : '',
			groupName:props.edit ? props.edit.usergroupName : '',
			businessHRView: false,
			groupType:props.edit ? props.edit.usergroupType : '',
			group_id:props.edit ? props.edit.usergroupId : '',
			clearMessage:false,
			saveMessage:false
			}; 
			
			
 }
 componentDidMount() {
	
    const selectgroupType = this.state.groupTypeList.find(dnc => dnc.user_type === this.props.edit.usergroupType);
	
	this.setState({groupType:selectgroupType})
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
   userType = () => {
	
	let rolesData = [{'id':'Inbound','user_type':'Inbound'},{'id':'Outbound','user_type':'Outbound'},{'id':'Blend','user_type':'Blend'}]
	return rolesData
}
  
   validateForm() {
	
	const {loggedinData} = this.props
	if (!_.isEmpty(this.state.groupType) &&this.state.groupName?.length > 0 && this.state.groupDescriptions?.length > 0  ){
		// if(!_.isEmpty(loggedinData)){
		// 	if(loggedinData.ldapEnabled){
				return true
			// } else {
			// 	if(this.state.passwordIsValid && this.state.password && this.state.password?.length > 0){
			// 		return true
			// 	}
			}
		
	

	   
   }
   handleInputChange = (e) => {
	const { name, value } = e.target;
	this.setState(prevState => ({
	  newItem: {
		...prevState.newItem,
		[name]: value
	  }
	}));
  }
  handleAddItem = () => {
	this.setState(prevState => ({
	  items: [...prevState.items, { ...prevState.newItem }],
	  newItem: { itemName: '' } // Reset newItem after adding
	}));
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
   handleSubmit =() => {  
	   const {loggedinData} = this.props; 	
	   const{items, newItem,groupDescriptions,groupName,businessHRView,groupType,group_id	} = this.state;
	   let obj={
		   "usergroupName" : groupName,
		   "usergroupDesc" : groupDescriptions,
		   "usergroupType" : groupType?groupType.user_type:'',
		   "usergroupId":group_id
		   
	   }   
	   //console.log("Ad Campaign",obj)     
	   this.props.action.editUserGroup(obj) 	 
	   this.props.closeModal()
   } 

   handleDeleteItem = (index) => {
	console.log(index)
	this.setState(prevState => ({
	  items: prevState.items.filter((_, i) => i !== index)
	}));
  }
  handleBusinessHRView = () => {
	this.setState({businessHRView : !this.state.businessHRView})
}
handleSelectUserType = (e) => {
	console.log(e)
	this.setState({ groupType: e})
	
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
handleChange = (event) => {
	if (parseInt(event.target.maxLength)>=event.target.value.length){
	this.setState({
	[event.target.id]: event.target.value
	});
}
}
render(){
	const {isOpen,isPending,showMessage,message} = this.props
	// const { newItem, items,businessHRView } = this.state;
	
	// console.log("creat state", this.state)
	// console.log("creat props", this.props)
	
	const{items, newItem,groupDescriptions,groupName,businessHRView,groupType,groupTypeList,group_id,clearMessage,saveMessage	} = this.state;	
	const {timesList} = this.props.action	
	
	
	
return(
	<div>        
		{/* {isPending ? <span className='spinner alignRight'>
		Loading... <Spinner animation="grow" role="status" size='lg'/>
			</span> : null} */}
		{(showMessage === true) ?
		<ShowModalLogin message={message} falseShowModalPopUp={this.props.CampaignEditErrorClose}/> : null}
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
			Edit User Group 
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
		<div>
			<br/>
			<div >
				{/* <span className='alignLeft'>Edit User Group </span> */}
				<span className='alignRight colorRed'> * Indicates Required Field</span>
			</div>
			<div><br/><br/></div>

			<div className='addCampaign'>
				<div className="form_container">

					<Row className='align-items-center'>             
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Group Name  <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="groupName"  
									 value={groupName}
									placeholder="Enter Group Name"
									maxLength={30}
									onChange={this.handleAllowCharacters}
									/>
									
									
							</Col>
							<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Description <span className='colorRed'>*</span></Col>
							<Col md={4} ><FormControl  type='text' id="groupDescriptions"  
									 value={groupDescriptions}
									 maxLength={100}
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
							 <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Group Type <span className='colorRed'>*</span></Col>
							<Col md={4} >
							<Picky
										value={groupType}
										options={groupTypeList}
										onChange={this.handleSelectUserType}
										open={false}
										valueKey="id"
										labelKey="user_type"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Type"}
										dropdownHeight={200} 
									/>	
							
								{/* <FormControl  type='text' id='agentType'
								onChange={this.handleChange} value={agentType} 
								placeholder="Enter Agent Type"
								/> */}
								{/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
							</Col>  
							
								{/* <FormControl  type='text' id='agentType'
								onChange={this.handleChange} value={agentType} 
								placeholder="Enter Agent Type"
								/> */}
								{/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
							 
							</Row>
				

		<div>
	{/* Existing items */}
   
  </div>
					
					
				</div>
		   

				<Row> <br/> </Row>
					<Row className='align-items-center'>
						<Col md={4}></Col>	
						<Col md={2}> <Button  variant="danger alignRight" onClick={this.openClearMessage}>Close</Button>
						</Col>
						<Col md={2}> <Button  variant="primary alignRight" style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} disabled={!this.validateForm()} onClick={this.openSaveClearMessage}>Update Group</Button></Col>
						<Col md={4}></Col>	
					</Row>
				</div>
				{clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Update this User Group?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.handleSubmit} />
	  	  :null}
		</div> 
		</Modal.Body>
            </Modal>
	</div>
	)
}
}

 

 