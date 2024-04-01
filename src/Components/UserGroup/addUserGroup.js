import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col, InputGroup} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';
import Select from 'react-dropdown-select';

import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-picky/dist/picky.css'; 
import _, { toInteger } from 'lodash';
import { Link } from "react-router-dom";
import MessageShow from '../mesaageShow'

 export default class AddUserGroup extends Component {
	 constructor(props){
			super(props)
			this.state = {
				clearMessage:false,
				saveMessage:false,
                items: [{itemName: ''}], // State to hold list of items
      newItem: {
        itemName: '',
        
      },
	  groupDescriptions:'',
                groupName:'',
                businessHRView: false,
				groupType:'',usergroupStatus:true
				}; 
                
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
		
		if (!_.isEmpty(this.state.groupType) &&this.state.groupName?.length > 0 && this.state.groupDescriptions?.length > 0 &&this.state.usergroupStatus){
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

	   handleSubmit =() => {  
		   const {loggedinData} = this.props; 	
		   const{items, newItem,groupDescriptions,groupName,businessHRView,groupType	} = this.state;
		   let obj={
			   "usergroupName" : groupName,
			   "usergroupDesc" : groupDescriptions,
			   "usergroupType" : groupType,
			   
		   }   
		   //console.log("Ad Campaign",obj)     
		   this.props.action.addUserGroup(obj) 	 
		   this.props.closeModal()
	   } 
	   listdatas = () => {
		console.log(this.props)
		let rolesData = _.cloneDeep(this.props.userData)
		console.log(rolesData)
		// rolesData = _.reject(rolesData,['roleId',1])
		return rolesData
	}

	  checkUsergroupExistence = () => {
		const { userData, groupName } = this.state;
		const dispositionExists = this.listdatas().find(item => item.usergroupName === groupName);
		if (dispositionExists){
			
			this.setState({usergroupStatus : false})
		} else{
			this.setState({usergroupStatus : true})
		}
		
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
		this.setState({ groupType: e[0].user_type})
		
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
		
		const{items, newItem,groupDescriptions,groupName,businessHRView,groupType,usergroupStatus,clearMessage,saveMessage	} = this.state;	
		const {timesList} = this.props.action	
		
		
	return(
		<div>        
			{/* {isPending ? <span className='spinner alignRight'>
			Loading... <Spinner animation="grow" role="status" size='lg'/>
				</span> : null} */}
			{(showMessage === true) ?
			<ShowModalLogin message={message} falseShowModalPopUp={this.props.CampaignEditErrorClose}/> : null}
			
			<div>
				<br/>
				<div >
					<span className='alignLeft'>ADD User Group </span>
					<span className='alignRight colorRed'> * Indicates Required Field</span>
				</div>
				<div><br/><br/></div>

				<div className='addCampaign'>
					<div className="form_container">

						<Row className='align-items-center'>             
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Group Name  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="groupName"  
										 value={groupName}
										 maxLength={30}
										placeholder="Enter Group Name"
										onChange={this.handleAllowCharacters}
										
										onBlur={this.checkUsergroupExistence}
										
										/>
										{(usergroupStatus === false) ? <span className="colorRed">&nbsp;****User Group name is already exits****</span>: null}
										
										
										
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
								<Select
                                        value={this.state.groupType}
                                        options={this.userType()}
                                        labelField='user_type'
                                        dropdownPosition='auto'
                                        valueField='id'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select Type"
                                        onChange={this.handleSelectUserType}
                                        closeOnSelect={true}
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
							<Col md={2}> <Button  variant="primary alignRight" style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} disabled={!this.validateForm()} onClick={this.openSaveClearMessage}>Add Group</Button></Col>
							<Col md={4}></Col>	
						</Row>
					</div>
					{clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Create this User Group?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.handleSubmit} />
	  	  :null}
			</div> 
        </div>
		)
	}
 }

 

  