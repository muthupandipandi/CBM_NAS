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
 export default class AddSkillSet extends Component {
	 constructor(props){
			super(props)
			this.state = {
                
				skillName:'',
                language:'',
                timeZone: '',
				channelType:'',
				serviceLevelThresold:'',
				shortcallThresold:0,
				shortAbandoneThresold:0,
				serviceLevelGoal:0,
				abandoneRateThresold:0,
				countAbandoneAgainestSLA:0,

				firstCallResalution:0,
				skillStatus:true
				}; 
                
	 }

	 handleCallBack = () =>{
		/// this.props.onCallBack(this.state)
		 this.props.closeModal()
	   }
	   userType = () => {
		
		let rolesData = [{'id':'inbound','user_type':'Inbound'},{'id':'outbount','user_type':'Outbound'},{'id':'blend','user_type':'Blend'}]
		return rolesData
	}
	  
	   validateForm() {
		
		const {loggedinData} = this.props; 	
		   const { skillName,language,timeZone,channelType,serviceLevelThresold,shortcallThresold,
			shortAbandoneThresold,
			serviceLevelGoal,
			abandoneRateThresold,
			countAbandoneAgainestSLA,skillStatus,
	
			firstCallResalution,newItem, items,businessHRView } = this.state;
			console.log(channelType)
			console.log(timeZone)
			console.log(skillName)
		if(skillName && skillName.length > 0 && language && language.length > 0 &&skillStatus
			   && !_.isEmpty(channelType)  && !_.isEmpty(timeZone) )
			{
						return true
					
		   	}
			else{
				console.log('test')
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
	  handleSelectTimeZone=(e) => {
		console.log(e)
		this.setState({timeZone : e[0].value})
		// Update the agentType property of the first object in the updatedAgent array
		// updatedAgent[0] = { ...updatedAgent[0], timeZone: e[0].value};
		
		
	}
	handleSelectChannelType=(e)=>{
		this.setState({channelType : e[0].value})
	}
	channelType = () => {
		
		// let rolesData = [{id:'voice',value:'Voice'},{id:'sms',value:'SMS'},{id:'socialmedia',value:'SocialMedia'},
		// {id:'message',value:'Message'},{id:'email',value:'Email'},{id:'whatsapp',value:'WhatsApp'}]
		let rolesData = [{'id':'inbound','value':'Inbound'},{'id':'outbount','value':'Outbound'},{'id':'blend','value':'Blend'}]
		return rolesData
		// return rolesData
	}
	typeSLA = () => {
		
		// let rolesData = [{id:'voice',value:'Voice'},{id:'sms',value:'SMS'},{id:'socialmedia',value:'SocialMedia'},
		// {id:'message',value:'Message'},{id:'email',value:'Email'},{id:'whatsapp',value:'WhatsApp'}]
		let rolesData = [{'id':'Yes','value':'Yes'},{'id':'No','value':'No'}]
		return rolesData
		// return rolesData
	}
	timeZoneData = () => {
		
		let rolesData = [{id:'(UTC +14)Christmas Island/Kiribati',value:'(UTC +14)Christmas Island/Kiribati'},
		{id:'(UTC +13:45)Chatham Islands/New Zealand',value:'(UTC +13:45)Chatham Islands/New Zealand'},
		{id:'(UTC +13)New Zealand with exceptions and 5 more',value:'(UTC +13)New Zealand with exceptions and 5 more'},
		{id:'(UTC +12)Fiji, small region of Russia and 7 more',value:'(UTC +12)Fiji, small region of Russia and 7 more'},
		{id:'(UTC +11)much of Australia and 6 more',value:'(UTC +11)much of Australia and 6 more'},
		{id:'(UTC +10:30)small region of Australia',value:'(UTC +10:30)small region of Australia'},
		{id:'(UTC +10)Queensland/Australia and 6 more',value:'(UTC +10)Queensland/Australia and 6 more'},
		{id:'(UTC +9:30)Northern Territory/Australia',value:'(UTC +9:30)Northern Territory/Australia'},
		{id:'(UTC +9)Japan, South Korea and 5 more',value:'(UTC +9)Japan, South Korea and 5 more'},{id:'(UTC +8:45)Western Australia/Australia',value:'(UTC +8:45)Western Australia/Australia'},
		{id:'(UTC +8)China, Philippines and 11 more',value:'(UTC +8)China, Philippines and 11 more'},{id:'(UTC +7)much of Indonesia, Thailand and 7 more',value:'UTC +7	much of Indonesia, Thailand and 7 more'},
		{id:'(UTC +6:30)Myanmar and Cocos Islands',value:'(UTC +6:30)Myanmar and Cocos Islands'},{id:'(UTC +6)Bangladesh and 6 more',value:'(UTC +6)Bangladesh and 6 more'},
		{id:'(UTC +5:45)Nepal',value:'(UTC +5:45)Nepal'},
		{id:'(UTC +5:30)India and Sri Lanka',value:'(UTC +5:30)India and Sri Lanka'},{id:'(UTC +5)Pakistan and 9 more',value:'(UTC +5)Pakistan and 9 more'},{id:'(UTC +4:30)Afghanistan',value:'(UTC +4:30)Afghanistan'},{id:'(UTC +4)Azerbaijan and 8 more',value:'(UTC +4)Azerbaijan and 8 more'},
		{id:'(UTC +3:30)Iran',value:'(UTC +3:30)Iran'},{id:'(UTC +3)Moscow/Russia and 23 more',value:'(UTC +3)	Moscow/Russia and 23 more'},
		{id:'(UTC +2)Greece and 30 more',value:'(UTC +2)Greece and 30 more'},{id:'(UTC +1)	Germany and 45 more',value:'(UTC +1)	Germany and 45 more'},
		{id:'(UTC +0)United Kingdom and 24 more',value:'(UTC +0)United Kingdom and 24 more'},{id:'(UTC -1)Cabo Verde and 2 more',value:'(UTC -1)Cabo Verde and 2 more'},
		{id:'(UTC -2)most of Greenland and 2 more',value:'(UTC -2)most of Greenland and 2 more'},
		{id:'(UTC -3)most of Brazil, Argentina and 8 more',value:'(UTC -3)	most of Brazil, Argentina and 8 more'},
		{id:'(UTC -3:30)Newfoundland and Labrador/Canada',value:'(UTC -3:30)Newfoundland and Labrador/Canada'},
		{id:'(UTC -4)some regions of Canada and 29 more',value:'(UTC -4)	some regions of Canada and 29 more'},
		{id:'(UTC -5)regions of USA and 14 more',value:'(UTC -5)	regions of USA and 14 more'},
		{id:'(UTC -6)regions of USA and 9 more',value:'(UTC -6)	regions of USA and 9 more'},
		{id:'(UTC -7)some regions of USA and 2 ',value:'(UTC -7)	some regions of USA and 2 '},
		{id:'(UTC -8)regions of USA and 4 more',value:'(UTC -8)	regions of USA and 4 more'},
		{id:'(UTC -9)Alaska/USA and regions of French Polynesia',value:'(UTC -9)	Alaska/USA and regions of French Polynesia'},
		{id:'(UTC -9:30)Marquesas Islands/French Polynesia',value:'(UTC -9:30)	Marquesas Islands/French Polynesia'},
		{id:'(UTC -10)small region of USA and 2 more',value:'(UTC -10)	small region of USA and 2 more'}
		,{id:'(UTC -11)American Samoa and 2 more',value:'(UTC -11)	American Samoa and 2 more'},
		{id:'(UTC -12)much of US Minor Outlying Islands',value:'(UTC -12)	much of US Minor Outlying Islands'}]
		return rolesData
	}

	   handleSubmit =() => {  
		   const {loggedinData} = this.props; 	
		   const { skillName,language,timeZone,channelType,serviceLevelThresold,shortcallThresold,
			shortAbandoneThresold,
			serviceLevelGoal,
			abandoneRateThresold,
			countAbandoneAgainestSLA,
	
			firstCallResalution,newItem, items,businessHRView } = this.state;
		   let obj={
			   "skillName" : skillName,
			   "shortCallThreshold" : shortcallThresold,
			   "shortAbandonedThreshold" : shortAbandoneThresold,
			   "countAbandonedSLA" : countAbandoneAgainestSLA,
			   "abandonedRateThreshold" : abandoneRateThresold,
			   "serviceLevelThreshold" : serviceLevelThresold,
			   "serviceLevelGoal": serviceLevelGoal,
			   "firstCallResolution" : firstCallResalution,
			   "channelType" : channelType,
			   "language" : language,
			   "timeZone": timeZone
			   
		   }   
		   //console.log("Ad Campaign",obj)     
		   this.props.action.addSkillSet(obj) 	 
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
	handleCountAbandonedAgainstSLAChange = (e) => {
		console.log(e)
		this.setState({ countAbandoneAgainestSLA: e[0].value})
		
	}
	handleChange = (event) => {
		if (parseInt(event.target.maxLength)>=event.target.value.length){
		this.setState({
		[event.target.id]: event.target.value
		});
	}
	}
	listdatas = () => {
		console.log(this.props)
		let rolesData = _.cloneDeep(this.props.userData)
		console.log(rolesData)
		// rolesData = _.reject(rolesData,['roleId',1])
		return rolesData
	}
	checkSkillExistence = () => {
		const { userData, skillName,skillStatus } = this.state;
		const dispositionExists = this.listdatas().find(item => item.skillName === skillName);
		if (dispositionExists){
			
			this.setState({skillStatus : false})
		} else{
			this.setState({skillStatus : true})
		}
		
	  }
	handleSecChange = (event) => {
		let { value } = event.target;
		value=toInteger(value)
		console.log(value)
		// Ensure the value is within the allowed range
		if (value < 0) {
			value = 0;
		} else if (value > 59) {
			value = 59;
		}
		// Update the state with the sanitized value
		console.log(event.target.id)
		this.setState({ [event.target.id]: value });
	}
	handleRetryValueChange = (e) => {
		// const {tempHrD} = this.state
		// let val = (toInteger(tempHrD)*60)+toInteger(e.target.value)
		this.setState({serviceLevelThresold:toInteger(e.target.value)})
		// this.setState({retryDelay:val})
		
	}
	handlePercentageChange = (e) => {
		const value = e.target.value;
		console.log(value)

		if (/^\d+$/.test(value) && !/\./.test(value) && parseInt(value) >= 0 && parseInt(value) <= 100) {
			this.setState({ [e.target.id]: value });
			// this.setState({ shortAbandoneThresold: value });
		}
		else if(value===''){
			this.setState({ [e.target.id]: value });
		}
	}

	render(){
		const {isOpen,isPending,showMessage,message} = this.props
		const { skillName,language,timeZone,channelType,serviceLevelThresold,shortcallThresold,
		shortAbandoneThresold,
		serviceLevelGoal,
		abandoneRateThresold,
		countAbandoneAgainestSLA,

		firstCallResalution,newItem, items,businessHRView,skillStatus } = this.state;
		
		// console.log("creat state", this.state)
		// console.log("creat props", this.props)
		
		// const {descriptions,
        // dispostionName} = this.state;	
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
					<span className='alignLeft'>ADD Skill Set</span>
					<span className='alignRight colorRed'> * Indicates Required Field</span>
				</div>
				<div><br/><br/></div>

				<div className='addCampaign'>
					<div className="form_container">

						<Row className='align-items-center'>             
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Skill Name  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="skillName"  
										 value={skillName}
										 onChange={this.handleChange}
										placeholder="Enter Skill Name"
										onBlur={this.checkSkillExistence}
										maxLength={50}
										/>
										{(skillStatus === false) ? <span className="colorRed">&nbsp;****Skillset name is already exits****</span>: null}
										
								</Col>
                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Language <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="language"  
										 value={language}
										placeholder="Enter Language"
										onChange={this.handleChange}
										maxLength={20}
										
										/>
										
										
								</Col>

								

									{/* <Col md={2}>Active<span className='colorRed'></span></Col>
									<Col md={4}>
										<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
									</Col> */}
                                    
						</Row>
						<Row className='align-items-center'>             
						<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; Time Zone <span className='colorRed'>*</span></Col>
                                <Col md={4} >
								<Select
                                        value={this.state.timeZone}
                                        options={this.timeZoneData()}
                                        labelField='value'
                                        dropdownPosition='auto'
                                        valueField='id'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select TimeZone"
                                        onChange={this.handleSelectTimeZone}
                                        closeOnSelect={true}
                                    />
									
                                </Col>

								<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; Channel Type <span className='colorRed'>*</span></Col>
                                <Col md={4} >
								<Select
                                        value={this.state.channelType}
                                        options={this.channelType()}
                                        labelField='value'
                                        dropdownPosition='auto'
                                        valueField='id'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select Channel Type"
                                        onChange={this.handleSelectChannelType}
                                        closeOnSelect={true}
                                    />
									
                                </Col>  
								
									{/* <FormControl  type='text' id='agentType'
                                    onChange={this.handleChange} value={agentType} 
                                    placeholder="Enter Agent Type"
                                    /> */}
                                    {/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
                                 
								</Row>

								<Row className='align-items-center'>             
										<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; Service Level Threshold <span className='colorRed'>*</span></Col>
                                	<Col md={1} >
									<FormControl  type='number' id="serviceLevelThresold"  style={{ display: 'inline', width: '70%',appearance: 'textfield' }}
											onChange={this.handlePercentageChange} 
											
											value={serviceLevelThresold}
											
											inputMode="numeric"
											placeholder="minute"/><span style={{ display: 'inline',fontWeight: 'normal',marginLeft:'2px' }}> %
											</span>
                                	</Col>

									<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; First Call Resolution <span className='colorRed'>*</span></Col>
                                	<Col md={1} >
									<FormControl style={{ display: 'inline', width: '70%',appearance: 'textfield' }}  type='number' id="firstCallResalution"
											onChange={this.handlePercentageChange} value={firstCallResalution}
											placeholder="minute"/>
									<span style={{ display: 'inline',fontWeight: 'normal',marginLeft:'2px' }}> %
											</span>
								
									
                                	</Col>  
								
									{/* <FormControl  type='text' id='agentType'
                                    onChange={this.handleChange} value={agentType} 
                                    placeholder="Enter Agent Type"
                                    /> */}
                                    {/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
                                 

									

								{/* </Row>
								<Row className='align-items-center'> */}
								<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; Short Call Threshold <span className='colorRed'>*</span></Col>
                                	<Col md={1} >
									<FormControl  type='number' id="shortcallThresold" style={{ display: 'inline', width: '70%',appearance: 'textfield' }} min="0" max="59"
											onChange={this.handleSecChange} value={shortcallThresold.toString().padStart(2, '0')}
											placeholder="minute"/>
											<span style={{ display: 'inline',fontWeight: 'normal',marginLeft:'2px' }}>Sec
											</span>
									
                                	</Col>

									<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; Short Abandone Threshold <span className='colorRed'>*</span></Col>
                                	<Col md={1} >
									<FormControl  type='number' id="shortAbandoneThresold" min="0" style={{ display: 'inline', width: '70%',appearance: 'textfield' }} max="59"
											onChange={this.handleSecChange} value={shortAbandoneThresold.toString().padStart(2, '0')}
											placeholder="minute"/> <span style={{ display: 'inline',fontWeight: 'normal',marginLeft:'2px' }}>Sec
											</span>
									
                                	</Col>  
								</Row>
								<Row className='align-items-center'>             
									<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; Service Level Goal  <span className='colorRed'>*</span></Col>
                                	<Col md={1} >
									<FormControl  type='number' id="serviceLevelGoal" style={{ display: 'inline', width: '70%',appearance: 'textfield' }}
											onChange={this.handlePercentageChange} value={serviceLevelGoal}
											placeholder="minute"/>
											<span style={{ display: 'inline',fontWeight: 'normal',marginLeft:'2px' }}> %
											</span>
									
                                	</Col>

								<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; Abandon Rate Threshold <span className='colorRed'>*</span></Col>
                                <Col md={1} >
								<FormControl  type='number' id="abandoneRateThresold"  style={{ display: 'inline', width: '70%',appearance: 'textfield' }}
											onChange={this.handlePercentageChange} value={abandoneRateThresold}
											placeholder="minute"/>
											<span style={{ display: 'inline',fontWeight: 'normal',marginLeft:'2px' }}> %
											</span>
									
                                </Col>
								
								

									  
								
								
									{/* <FormControl  type='text' id='agentType'
                                    onChange={this.handleChange} value={agentType} 
                                    placeholder="Enter Agent Type"
                                    /> */}
                                    {/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
									<Col md={2} style={{ padding:'0' }}>  &nbsp;&nbsp;&nbsp;&nbsp; Count Abandon Againest SLA</Col>
                                <Col md={1} >
								
											
										<Select
                                        value={countAbandoneAgainestSLA}
                                        options={this.typeSLA()}
                                        labelField='value'
                                        dropdownPosition='auto'
                                        valueField='id'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select"
                                        onChange={this.handleCountAbandonedAgainstSLAChange}
                                        closeOnSelect={true}
                                    />
									
                                </Col> 
								</Row>
                    

            <div>
        {/* Existing items */}
       
      </div>
                        
						
				    </div>
               

                    <Row> <br/> </Row>
						<Row className='align-items-center'>
							<Col md={4}></Col>	
							<Col md={2}> <Button  variant="danger alignRight" onClick={this.props.closeModal}>Close</Button>
							</Col>
							<Col md={2}> <Button  variant="primary alignRight" disabled={!this.validateForm()} onClick={this.handleSubmit}>Add SkillSet</Button></Col>
							<Col md={4}></Col>	
						</Row>
					</div>
			</div> 
        </div>
		)
	}
 }

 

  