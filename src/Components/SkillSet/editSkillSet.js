import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col} from 'react-bootstrap';
import _, { toInteger } from 'lodash';
//import TimePicker from 'react-time-picker';

import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-picky/dist/picky.css'; 
import ShowModalLogin from '../showModalLogin';
import MessageShow from '../mesaageShow'
import Select from 'react-dropdown-select';
import {Picky} from 'react-picky';

 export default class EditSkillSet extends Component {
	constructor(props){
		super(props)
		this.modalRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
		this.state = {
			
			skillName:props.edit ? props.edit.skillName : '',
			language:props.edit ? props.edit.language : '',
			timeZone: props.edit ? props.edit.timeZone : '',
			channelType:props.edit ? props.edit.channelType : '',
			serviceLevelThresold:props.edit ? props.edit.serviceLevelThreshold : 0,
			shortcallThresold:props.edit ? props.edit.shortCallThreshold : 0,
			shortAbandoneThresold:props.edit ? props.edit.shortAbandonedThreshold : 0,
			serviceLevelGoal:props.edit ? props.edit.serviceLevelThreshold : 0,
			abandoneRateThresold:props.edit ? props.edit.abandonedRateThreshold : 0,
			countAbandoneAgainestSLA:props.edit ? props.edit.countAbandonedSLA : '',

			firstCallResalution:props.edit ? props.edit.firstCallResolution : 0,
			skillID:props.edit ? props.edit.skillsetId : 0,
			skillStatus:true,
			clearMessage:false,
				saveMessage:false
			}; 
			
 }

 componentDidMount() {
	
    const selectlanguage = this.languageLoad().find(dnc => dnc.value === this.props.edit.language);
	
	this.setState({language:selectlanguage})
	const selectTimezone = this.timeZoneData().find(dnc => dnc.value === this.props.edit.timeZone);
	
	this.setState({timeZone:selectTimezone})
	const selectChannel = this.channelType().find(dnc => dnc.value === this.props.edit.channelType);
	
	this.setState({channelType:selectChannel})
	const selectcountAbandonedSLA = this.typeSLA().find(dnc => dnc.value === this.props.edit.countAbandonedSLA);
	
	this.setState({countAbandoneAgainestSLA:selectcountAbandonedSLA})
	

	
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
	if(skillName && skillName.length > 0 && language  && !_.isEmpty(language) &&skillStatus && shortAbandoneThresold &&
	serviceLevelGoal && abandoneRateThresold && countAbandoneAgainestSLA && firstCallResalution
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
  handleAddItem = () => {
	this.setState(prevState => ({
	  items: [...prevState.items, { ...prevState.newItem }],
	  newItem: { itemName: '' } // Reset newItem after adding
	}));
  }
  handleSelectTimeZone=(e) => {
	console.log(e)
	this.setState({timeZone : e})
	// Update the agentType property of the first object in the updatedAgent array
	// updatedAgent[0] = { ...updatedAgent[0], timeZone: e[0].value};
	
	
}
handleSelectChannelType=(e)=>{
	this.setState({channelType : e})
}
channelType = () => {
	
	// let rolesData = [{id:'voice',value:'Voice'},{id:'sms',value:'SMS'},{id:'socialmedia',value:'SocialMedia'},
	// {id:'message',value:'Message'},{id:'email',value:'Email'},{id:'whatsapp',value:'WhatsApp'}]
	let rolesData = [{'id':'Inbound','value':'Inbound'},{'id':'Outbound','value':'Outbound'},{'id':'Blend','value':'Blend'}]
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
languageLoad = () => {
		
	// let rolesData = [{id:'voice',value:'Voice'},{id:'sms',value:'SMS'},{id:'socialmedia',value:'SocialMedia'},
	// {id:'message',value:'Message'},{id:'email',value:'Email'},{id:'whatsapp',value:'WhatsApp'}] Arabic
	let rolesData = [{'id':'English','value':'English'},{'id':'Arabic','value':'Arabic'}]
	return rolesData
	// return rolesData
}
handleSelectLangage=(e) => {
	console.log(e)
	this.setState({language : e})
	// Update the agentType property of the first object in the updatedAgent array
	// updatedAgent[0] = { ...updatedAgent[0], timeZone: e[0].value};
	
	
}
   handleSubmit =() => {  
	   const {loggedinData} = this.props; 	
	   const { skillName,language,timeZone,channelType,serviceLevelThresold,shortcallThresold,
		shortAbandoneThresold,
		serviceLevelGoal,
		abandoneRateThresold,
		countAbandoneAgainestSLA,skillID,

		firstCallResalution,newItem, items,businessHRView } = this.state;
	   let obj={
		   "skillName" : skillName,
		   "shortCallThreshold" : shortcallThresold,
		   "shortAbandonedThreshold" : shortAbandoneThresold,
		   "countAbandonedSLA" : countAbandoneAgainestSLA?countAbandoneAgainestSLA.value:'',
		   "abandonedRateThreshold" : abandoneRateThresold,
		   "serviceLevelThreshold" : serviceLevelThresold,
		   "serviceLevelGoal": serviceLevelGoal,
		   "firstCallResolution" : firstCallResalution,
		   "channelType" : channelType?channelType.value:'',
			"language" : language?language.value:'',
			"timeZone": timeZone?timeZone.value:'',
		   "skillsetId":skillID
		   
	   }   
	   //console.log("Ad Campaign",obj)     
	   this.props.action.editSkillSet(obj) 	 
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
	this.setState({ countAbandoneAgainestSLA: e})
	
}
handleChange = (event) => {
	if (parseInt(event.target.maxLength)>=event.target.value.length){
	this.setState({
	[event.target.id]: event.target.value
	});
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
handlePercentageChange = (e) => {
	const value = e.target.value;
	console.log(value)

	// const percentageRegex = /^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/;
	const percentageRegex = /^(100|\d{0,2}(\.\d{0,2})?)$/;

if (percentageRegex.test(value) || value === '') {
		this.setState({ [e.target.id]: value });
		// this.setState({ shortAbandoneThresold: value });
	}
	else if(value===''){
		this.setState({ [e.target.id]: value });
	}
}
 handleSecChange = (e) => {
		console.log(e.target.id)
		const { value } = e.target;
		const onlyNumbers = /^[0-9]*$/; // Regular expression to allow only numbers
		if(59>=e.target.value){
		if (parseInt(e.target.maxLength)>=e.target.value.length){
		if (onlyNumbers.test(value) || value === '') {
		   
		   
		   this.setState({[e.target.id]:e.target.value})
		   
		}
	
	}
	}
}
handleRetryValueChange = (e) => {
	// const {tempHrD} = this.state
	// let val = (toInteger(tempHrD)*60)+toInteger(e.target.value)
	this.setState({serviceLevelThresold:toInteger(e.target.value)})
	// this.setState({retryDelay:val})
	
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

render(){
	const {isOpen,isPending,showMessage,message} = this.props
	const { skillName,language,timeZone,channelType,serviceLevelThresold,shortcallThresold,
	shortAbandoneThresold,
	serviceLevelGoal,
	abandoneRateThresold,
	countAbandoneAgainestSLA,skillID,

	firstCallResalution,newItem, items,businessHRView,skillStatus,clearMessage,saveMessage } = this.state;
	
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
			Edit Skill Set 
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
		<div>
			<br/>
			<div >
				
				<span className='alignRight colorRed'> * Indicates Required Field</span>
			</div>
			<div><br/><br/></div>

			<div className='addCampaign'>
				<div className="form_container">

					<Row className='align-items-center'>             
							<Col md={3}> &nbsp;&nbsp;&nbsp;&nbsp; Skill Name  <span className='colorRed'>*</span></Col>
							<Col md={3} ><FormControl  type='text' id="skillName"  
									 value={skillName}
									 onChange={this.handleAllowCharacters}
									 onPaste={this.handleAllowCharacters}
									placeholder="Enter Skill Set Name"
									maxLength={30}
									onBlur={this.checkSkillExistence}
										/>
										{(skillStatus === false) ? <span className="colorRed">&nbsp;****Skill Set name is already exits****</span>: null}
										
									
									
							</Col>
							<Col md={3}> &nbsp;&nbsp;&nbsp;&nbsp; Language <span className='colorRed'>*</span></Col>
							<Col md={3} >
								
							{/* <Picky
                                        value={this.state.language}
                                        options={this.languageLoad()}
                                        labelField='value'
                                        dropdownPosition='auto'
                                        valueField='id'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select Language"
                                        onChange={this.handleSelectLangage}
                                        closeOnSelect={true}
                                    /> */}
									
									<Picky
										value={this.state.language}
										options={this.languageLoad()}
										onChange={this.handleSelectLangage}
										open={false}
										valueKey="value"
										labelKey="id"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Language"}
										dropdownHeight={200}
									/>
							</Col>

							

								{/* <Col md={2}>Active<span className='colorRed'></span></Col>
								<Col md={4}>
									<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
								</Col> */}
								
					</Row>
					<Row className='align-items-center'>             
					<Col md={3}>  &nbsp;&nbsp;&nbsp;&nbsp; Time Zone <span className='colorRed'>*</span></Col>
							<Col md={3} >
							{/* <Select
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
								/> */}
								<Picky
										value={this.state.timeZone}
										options={this.timeZoneData()}
										onChange={this.handleSelectTimeZone}
										open={false}
										valueKey="id"
										labelKey="value"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Time Zone"}
										dropdownHeight={200} 
									/>	
								
							</Col>

							<Col md={3}>  &nbsp;&nbsp;&nbsp;&nbsp; Channel Type <span className='colorRed'>*</span></Col>
							<Col md={3} >
							
								<Picky
										value={this.state.channelType}
										options={this.channelType()}
										onChange={this.handleSelectChannelType}
										open={false}
										valueKey="id"
										labelKey="value"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Channel Type"}
										dropdownHeight={200} 
									/>	
								
							</Col>  
							
								{/* <FormControl  type='text' id='agentType'
								onChange={this.handleChange} value={agentType} 
								placeholder="Enter Agent Type"
								/> */}
								{/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
							 
							</Row>

							<Row className='align-items-center'>             
									<Col md={3}>  &nbsp;&nbsp;&nbsp;&nbsp; Service Level Threshold <span className='colorRed'>*</span></Col>
								<Col md={3} >
								<FormControl  type='text' id="serviceLevelThresold"  style={{ display: 'inline', width: '70%',appearance: 'textfield' }}
										onChange={this.handlePercentageChange} 
										
										value={serviceLevelThresold}
										
										inputMode="numeric"
										/><span style={{ display: 'inline',fontWeight: 'normal' }}>Sec
										</span>
								</Col>

								<Col md={3}>  &nbsp;&nbsp;&nbsp;&nbsp; First Call Resolution <span className='colorRed'>*</span></Col>
								<Col md={3} >
								<FormControl style={{ display: 'inline', width: '70%',appearance: 'textfield' }}  type='text' id="firstCallResalution" min="0" max="59"
										onChange={this.handlePercentageChange} value={firstCallResalution}
										/>
								<span style={{ display: 'inline',fontWeight: 'normal' }}>Sec
										</span>
							
								
								</Col>  
							
								{/* <FormControl  type='text' id='agentType'
								onChange={this.handleChange} value={agentType} 
								placeholder="Enter Agent Type"
								/> */}
								{/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
							 

								

							</Row>
							<Row className='align-items-center'>
							<Col md={3}>  &nbsp;&nbsp;&nbsp;&nbsp; Short Call Threshold <span className='colorRed'>*</span></Col>
								<Col md={3} >
								<FormControl  type='text' id="shortcallThresold" style={{ display: 'inline', width: '70%',appearance: 'textfield' }} min="0" max="59"
										onChange={this.handleSecChange} value={shortcallThresold} maxLength={2}
										/>
										<span style={{ display: 'inline',fontWeight: 'normal' }}>Sec
										</span>
								
								</Col>

								<Col md={3}>  &nbsp;&nbsp;&nbsp;&nbsp; Short Abandon Threshold <span className='colorRed'>*</span></Col>
								<Col md={3} >
								<FormControl  type='text' id="shortAbandoneThresold" min="0" style={{ display: 'inline', width: '70%',appearance: 'textfield' }} max="59"
										onChange={this.handleSecChange} value={shortAbandoneThresold} maxLength={2}
										/> <span style={{ display: 'inline',fontWeight: 'normal' }}>Sec
										</span>
								
								</Col>  
							</Row>
							<Row className='align-items-center'>             
								<Col md={3}>  &nbsp;&nbsp;&nbsp;&nbsp; Service Level Goal  <span className='colorRed'>*</span></Col>
								<Col md={3} >
								<FormControl  type='text' id="serviceLevelGoal" min="0" max="59" style={{ display: 'inline', width: '70%',appearance: 'textfield' }}
										onChange={this.handleSecChange} value={serviceLevelGoal} maxLength={2}
										/>
										<span style={{ display: 'inline',fontWeight: 'normal' }}>Sec
										</span>
								
								</Col>

							<Col md={3}>  &nbsp;&nbsp;&nbsp;&nbsp; Abandon Rate Threshold <span className='colorRed'>*</span></Col>
							<Col md={3} >
							<FormControl  type='text' id="abandoneRateThresold" min="0" max="59" style={{ display: 'inline', width: '70%',appearance: 'textfield' }}
										onChange={this.handleSecChange} value={abandoneRateThresold} maxLength={2}
										/>
										<span style={{ display: 'inline',fontWeight: 'normal' }}>Sec
										</span>
								
							</Col>
							
							

								  
							
							
								{/* <FormControl  type='text' id='agentType'
								onChange={this.handleChange} value={agentType} 
								placeholder="Enter Agent Type"
								/> */}
								{/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
								</Row>
							<Row className='align-items-center'>  
								<Col md={3} style={{ padding:'0' }}>  &nbsp;&nbsp;&nbsp;&nbsp; Count Abandoned Againest SLA<span className='colorRed'>*</span></Col>
							<Col md={3} >
							
										
									
								<Picky
										value={countAbandoneAgainestSLA}
										options={this.typeSLA()}
										onChange={this.handleCountAbandonedAgainstSLAChange}
										open={false}
										valueKey="id"
										labelKey="value"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select"}
										dropdownHeight={200} 
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
						<Col md={2}> <Button  variant="danger alignRight" onClick={this.openClearMessage}>Close</Button>
						</Col>
						<Col md={2}> <Button  variant="primary alignRight" disabled={!this.validateForm()} style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} onClick={this.openSaveClearMessage}>Update Skill Set</Button></Col>
						<Col md={4}></Col>	
					</Row>
				</div>
				{clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Update this Skill Set?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.handleSubmit} />
	  	  :null}
		</div> 
		</Modal.Body>
            </Modal>
	</div>
	)
}
}
 

 