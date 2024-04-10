import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col, InputGroup} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';
import _ from 'lodash';
import { JSEncrypt } from 'jsencrypt';
import {Picky} from 'react-picky';
import DatePicker from "react-datepicker";
import Select from 'react-dropdown-select';
import moment from "moment";
import 'react-picky/dist/picky.css'; 
import MessageShow from '../mesaageShow'
 export default class EditUser extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		
		this.modalRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
		this.state = {
			employeeId: props.edit ? props.edit.userId : '',
			firstName: props.edit.firstName ? props.edit.firstName : '',
			lastName: props.edit ? props.edit.lastName : '',
			password: props.edit ? props.edit.password : '',
			email: props.edit ? props.edit.emailId : '',
			mobileNumber: props.edit ? props.edit.mobNum : '',
			pbxExtn: props.edit ? props.edit.pbxExtn : '',
			domain: [{domainId: "1", domainName: "Banking"}],
			business : [{buId: "1", buName: "Retail"}],
			status: props.edit ? props.edit.status : 'NEW',
			selectedrole: props.edit ? props.edit.role : '' ,
			userActive:props.edit.status=='ACTIVE' ? true : false,
			selectedSkillGroup: props.edit ? props.edit.skillSet : '' ,
			selectedUserGroup:props.edit ? props.edit.userGroup : '',
			resetPsw:false,
			selectedAgent: props.edit ? props.edit.agent : '',
			// selectAgent: '',
			userstatus: props.edit.status === 'ACTIVE' ? true : false,
			emailIsValid: true,
			agent:[{agentType:[],wfh:'',timeZone:'',skillSet:'',level:''}],
			supervisor:[{supervisorType:'',wfh:'',timeZone:'',agenstList:[]}],
			roleBaseSet:'',
			userGroup:'',
			selctRoleOpenView: false,
			passwordIsValid:true,
			passwordtype:'password',
			clearMessage:false,
			saveMessage:false
			
		}
	}
	resetClick= () => {
		const {userEntity,rolesData,loggedinData,groupsData} = this.props


		if(_.isEqual(loggedinData.roles,"[Admin]")){
			this.setState({password:''})
			this.setState({resetPsw:true})
		}
		
	}
	componentDidMount() {
		// let roles = _.find(this.props.rolesData, { 'roleId': this.props.edit.roleId })
		// if (!_.isEmpty(roles)) {
		// 	this.setState({ selectedrole: [roles] })
		const {userEntity,rolesData,loggedinData,groupsData} = this.props
		// }
		console.log(this.props)
		console.log(!_.isEqual(loggedinData.roles,"[Admin]"))
		
		console.log(!this.state.resetPsw)
		const selectedValues = this.props.edit.agent.split(',');
		
		
// Find the corresponding options for each value in the array
// const selectedOptions = selectedValues.map(value => {
//     return this.agentDatas().find(option => option.label === value);
// });


	
		console.log(this.skillDatas())
		const selectskillName = this.skillDatas().find(dnc => dnc.skillName === this.props.edit.skillSet);
		console.log(selectskillName)
		
		this.setState({selectedSkillGroup:selectskillName})
		const selectTimezone = this.rolesName().find(dnc => dnc.role === this.props.edit.role);
		
		this.setState({selectedrole:selectTimezone})
		const selectuserGroup = this.userGroup().find(dnc => dnc.usergroupName === this.props.edit.userGroup);
		
		this.setState({selectedUserGroup:selectuserGroup})
		// const selectcountAbandonedSLA = this.typeSLA().find(dnc => dnc.value === this.props.edit.countAbandonedSLA);
		
		// this.setState({countAbandoneAgainestSLA:selectcountAbandonedSLA})
		
	
		
		
		if (selectedValues){
		
			const selectedOptions = selectedValues.map(value => {
				// Find option based on label
				console.log(this.agentDatas())
				const option = this.agentDatas().find(option => option.value === value);
				if (option) {
					return option;
				} else {
					console.error(`Option with label '${value}' not found.`);
					return null; // or handle it according to your requirements
				}
			});
			this.setState({ selectedAgent: selectedOptions.filter(option => option !== null) })
		}
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
	rolesName = () => {
		let rolesData = _.cloneDeep(this.props.rolesData)
		// rolesData = _.reject(rolesData,['roleId',1])
		return rolesData
	}
	skillDatas = () => {
		
		let skillData = _.cloneDeep(this.props.skillData)
		
		
		return skillData
	}
	
	agentDatas = () => {
		
		let agentDataClone = _.cloneDeep(this.props.agentData);
		let skillData=agentDataClone
		console.log(this.props.edit.agentDetails)
		if (this.props.edit.agentDetails!=null){
		skillData = agentDataClone.concat(this.props.edit.agentDetails);
		}
		console.log(skillData)
		// skillData.append(this.props.agentDetails)
		
		return skillData.map(item => ({
			label: `${item.firstName} ${item.lastName}`, // Concatenate firstName and lastName
			value: item.userId // Set valueField to userId
		  }));

		
	}
	
	userType = () => {
		
		let rolesData = [{'id':'inbound','user_type':'Inbound'},{'id':'outbount','user_type':'Outbound'},{'id':'blend','user_type':'Blend'}]
		return rolesData
	}
	userGroup = () => {
		
		const groupsData = _.cloneDeep(this.props.userGroupsData)
		
		return groupsData
	}
	wfhData = () => {
		
		let rolesData = [{'id':'yes','value':'Yes'},{'id':'no','value':'No'}]
		return rolesData
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

	
	handleCallBack = () => {
		/// this.props.onCallBack(this.state)
		this.props.closeModal()
	}
	handleChange = event => {
		if (parseInt(event.target.maxLength)>=event.target.value.length){
		this.setState({
			[event.target.id]: event.target.value
		});
		if(event.target.id === 'employeeId'){
			this.setState({entityCheck:false})
		}
	}
	}
	onhandleStatusChange = (e) => {
		this.setState({ userstatus: e.target.checked })
		if (e.target.checked === true) {
			this.setState({ userrecordStatus: 'ACTIVE' })
		} else {
			this.setState({ userrecordStatus: 'INACTIVE' })
		}
	}
	isValidEmailAddress = (address) => {
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
			return true
		} else {
			return false
		}
	}
	// onhandlePasswordChange = (e) => {
	//   this.setState({changePassword:e.target.checked})
	// }
	viewPassword = (prop) => {
		if(_.isEqual(this.props.loggedinData.roles,"[Admin]") && this.state.resetPsw){
			this.setState({ passwordtype: prop })
		}
		
	}
	// viewPassword_Old = (prop) => {
	// 	this.setState({ passwordtype: prop })
	// }
	
	handleAllowNubers = (event) => {
		const { value } = event.target;
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
	handleSelectRoles = (e) => {
		
		this.setState({ selectedrole: e })
		// this.setState({ roleBaseSet: e[0]['rolesName'] })
		// this.setState({selctRoleOpenView:false})
	}
	handleSelectSkillGroup = (e) => {
		console.log(e)
		this.setState({selectedSkillGroup: e})
		// this.setState({ roleBaseSet: e[0]['rolesName'] })
		// this.setState({selctRoleOpenView:false})
	}
	handleSelectUserGroup = (e) => {
		
		this.setState({selectedUserGroup: e })
		// this.setState({ roleBaseSet: e[0]['rolesName'] })
		// this.setState({selctRoleOpenView:false})
	}
	handleSelectAgent = (selectedOptions) => {
		// console.log(e[0])
		// const selectedValues = selectedOptions.map(option => option.value);
        this.setState({ selectedAgent: selectedOptions });
		
		// this.setState({ selectedAgent: e[0]['label'] })
		// this.setState({ roleBaseSet: e[0]['rolesName'] })
		// this.setState({selctRoleOpenView:false})
	}
	handleSelectUserType = (e) => {
		
		let updatedAgent = [...this.state.agent];

		// Update the agentType property of the first object in the updatedAgent array
		updatedAgent[0] = { ...updatedAgent[0], agentType: e};
		
		this.setState({ agent: updatedAgent})
		
	}
	handleSelectWfh = (e) => {
		
		let updatedAgent = [...this.state.agent];

		// Update the agentType property of the first object in the updatedAgent array
		updatedAgent[0] = { ...updatedAgent[0], wfh: e[0].value};
		
		this.setState({ agent: updatedAgent})
		
	}
	handleSelectTimeZone=(e) => {
		console.log(e)
		let updatedAgent = [...this.state.agent];

		// Update the agentType property of the first object in the updatedAgent array
		updatedAgent[0] = { ...updatedAgent[0], timeZone: e[0].value};
		
		
	}
	handleSelctRoleOpenView = () => {
			
		this.setState({selctRoleOpenView : !this.state.selctRoleOpenView})
	}
	isValidUser = (emId) => {
		const res = /^\S*$/;       				// [/^[A-Za-z0-9 ]+$/]-For Special chr               // [/^\S*$/] - For space     
		const re = /^[A-Za-z0-9_./\\]+$/; 
		if (!_.isEmpty(emId)) {
			if (emId?.length > 3 && re.test(emId)  && res.test(emId)) {
				return true
			} else {
				return false
			}
		}
	}
	isValidPassword = (password) => {
		if (!_.isEmpty(password)) {
			if (password?.length > 6) {
				return true
			} else {
				return false
			}
		}
	}
	validateForm() {
		const {loggedinData} = this.props
		
		if (this.state.employeeId && this.state.employeeId?.length > 0 &&
			this.state.firstName && this.state.firstName?.length > 0 && this.state.emailIsValid &&
			this.state.lastName && this.state.lastName?.length > 0 &&
			this.state.email && this.state.email?.length > 0 && this.state.mobileNumber && this.state.mobileNumber?.length > 0 && this.state.passwordIsValid && this.state.password && this.state.password?.length > 0
			&& !_.isEmpty(this.state.selectedrole)) {
		
				
				if(this.state.selectedrole=='Supervisor'){
					if (!_.isEmpty(this.state.selectedAgent) && !_.isEmpty(this.state.selectedSkillGroup) && this.state.pbxExtn && this.state.pbxExtn?.length > 0 ){
						return true
					}

				}

				else if(this.state.selectedrole=='Agent'){
					if (!_.isEmpty(this.state.selectedSkillGroup) && this.state.pbxExtn && this.state.pbxExtn?.length > 0){
						return true
					}

				}
				else{
					return true
				}
					
				
					
			
		}
	}
	handleSubmit = () => {
		// const { firstName, email, password, mobileNumber, employeeId, lastName, selectedrole, business, domain } = this.state;
		const { employeeId, firstName, email,selectedUserGroup, mobileNumber,selectedAgent,
			 password, lastName,agent,supervisor,pbxExtn,selectedSkillGroup,userActive, emailIsValid,roleBaseSet,selctRoleOpenView, passwordIsValid, userIdIsValid, entityCheck, domain, business,selectedrole } = this.state;
		const {loggedinData} = this.props
		

		const publickey = process.env.REACT_APP_PUBLIC_KEY;
		const encrypt = new JSEncrypt()
		encrypt.setPublicKey(publickey);
		const encyPassword = encrypt.encrypt(password);
		const selectedValues = selectedAgent.map(option => option.value).join(',');
		let new_user = {
			"emailId": email,
			"firstName": firstName,
			"lastName": lastName,
			"userId": employeeId,
			"mobNum": mobileNumber,
			"pbxExtn": pbxExtn,
			"role": selectedrole?selectedrole.role:'' ,
			"skillSet": selectedSkillGroup?selectedSkillGroup.skillName:'',
			// "password": password,
			"agent": selectedValues,
			"userGroup": selectedUserGroup?selectedUserGroup.usergroupName:'',
			"status":userActive?'ACTIVE':'INACTIVE'
			// "createdBy": loggedinData.userName
		}
		


		if(this.state.resetPsw){
			new_user['password'] = password
		}
		// if(!_.isEmpty(loggedinData)){
		// 	if(loggedinData.ldapEnabled){
		// 		new_user['password'] = ''
		// 	}
		// }
		this.props.action.editUser(new_user)
		this.props.closeModal()
	}
	handleOnEntity = () => {
		const  {employeeId} = this.state;
		this.setState({entityCheck:true})
		let formdata = new FormData();
		formdata.append("entity", 'user');  
		formdata.append("name", employeeId);
	
		this.props.action.IsEntityNameExists(formdata)
	}
	handleCheck=()=>{
		this.setState({userActive : !this.state.userActive})
	}
	handleUserOnBlur = (employeeId) => {
		this.setState({ userIdIsValid: this.isValidUser(employeeId) })
		// this.handleOnEntity()
	}
	handleAllowCharacters=(event)=>{
		const onlyLetters = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces

		if (onlyLetters.test(event.target.value) || event.target.value === '') {
			if (parseInt(event.target.maxLength)>=event.target.value.length){
				this.setState({
					[event.target.id]: event.target.value})
				}

		}
		else{
			return false
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
	// handleDomain = (e) => {
	// 	this.setState({ domain: e })
	// 	if (!_.isEmpty(e)) {
	// 		this.props.action.LoadBusinessUnits(e[0])
	// 		this.setState({ business: [] })
	// 	}
	// }
	// handleBusiness = (e) => {
	// 	this.setState({ business: e })
	// }
	   
	handleChangeOnlyallowCharacteNum = (e) => {
        const { value } = e.target;

        // Regular expression to allow only letters and numbers
        const regex = /^[a-zA-Z0-9]*$/;

        if (regex.test(value) || value === '') {
            this.setState({
				[e.target.id]: e.target.value
			});
        }
		else{
			this.setState({
				[e.target.id]: this.state[e.target.id]
			});
		}
    };
	

	render(){
		const {userEntity,rolesData,loggedinData,groupsData} = this.props
		const {showMessage,message} = this.props.action
        const { employeeId, firstName, email,selectedUserGroup,clearMessage,
			saveMessage, mobileNumber,selectedAgent, password,resetPsw,userActive, lastName,agent,supervisor,pbxExtn,selectedSkillGroup, emailIsValid,roleBaseSet,selctRoleOpenView, passwordIsValid, userIdIsValid, entityCheck, domain, business,selectedrole } = this.state;
		
			
		
		
	return(
		<div>        
			{/* {isPending ? <span className='spinner alignRight'>
			Loading... <Spinner animation="grow" role="status" size='lg'/>
				</span> : null} */}
			{/* {(showMessage === true) ?
			<ShowModalLogin message={message} falseShowModalPopUp={this.props.action.CampaignEditErrorClose}/> : null} */}
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
			Edit User 
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
			<div>
				<br/>
				<div >
					{/* <span className='alignLeft'>ADD USERS </span> */}
					<span className='alignRight colorRed'> * Indicates Required Field</span>
				</div>
				<div><br/><br/></div>
				<div className='addCampaign'>
					<div className="form_container">
					<Row className='align-items-center'>             
                                 <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; First Name  <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='text' id='firstName'
                                    onChange={this.handleAllowCharacters} value={firstName} maxLength={30}
									disabled={true}
                                    placeholder="Enter First Name"
                                    />
                                </Col>  

                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Last Name  <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='text' id='lastName'
                                    onChange={this.handleAllowCharacters} value={lastName} maxLength={30}
									disabled={true}
                                    placeholder="Enter Last Name"
                                    />
                                </Col>  
						</Row>
						<Row className='align-items-center'>             
                                 <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Email ID <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='text' id='email'
								onBlur={() => this.setState({ emailIsValid: this.isValidEmailAddress(email) })}
                                    onChange={this.handleChange} value={email} maxLength={30}
                                    placeholder="Enter Email ID"
                                    />
                                    {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null}
                                </Col>  
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Mobile Number  <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='text' id='mobileNumber'
                                    onChange={this.handleAllowNubers} onPaste={this.handleAllowNubers} value={mobileNumber} maxLength={10}
                                    placeholder="Enter Mobile Numbe"
                                    />
                                </Col>  

                                
						</Row>
						<Row className='align-items-center'>             
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; User ID  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id='employeeId'
										onBlur={()=>this.handleUserOnBlur(employeeId)}
										onPaste={this.handleChangeOnlyallowCharacteNum}
                                        onChange={this.handleChangeOnlyallowCharacteNum} value={employeeId} 
										maxLength={30}
										placeholder="Enter User ID"
										/>
                                        {userIdIsValid === false ? <span className="colorRed" > &nbsp;&nbsp; Please provide valid userId with minimum 4 characters. special characters and space not allowed</span> : null}
							            {(userEntity && employeeId?.length > 0 && entityCheck) ? <span className="colorRed" >&nbsp;&nbsp;  **User Id already exists**</span> : null }
								</Col>
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Password  <span className='colorRed'>*</span></Col>
                                <Col md={4} >
								<InputGroup>
        <FormControl disabled={ !resetPsw}
          type={this.state.passwordtype}
          id='password'
          onChange={this.handleChange}
		  onPaste={this.handlePaste}
		 
          value={password}
          placeholder="Enter Password"
		  maxLength={20}
        />
        <InputGroup.Append >
		<InputGroup.Text disabled={!resetPsw } id="basic-addon2">{this.state.passwordtype === "password" ?     
                        <i className='fas fa-eye-slash' onClick={()=>this.viewPassword('text')} /> :
                        <i className='fas fa-eye' onClick={()=>this.viewPassword('password')} /> }</InputGroup.Text>
          {/* <Button variant="outline-secondary" onClick={this.toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </Button> */}
        </InputGroup.Append>
        {passwordIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide valid Password with minimum 6 characters</span> : null}
      </InputGroup>
									{/* <FormControl  type='password' id='password'
                                    onBlur={() => this.setState({ passwordIsValid: this.isValidPassword(password) })}
                                    onChange={this.handleChange} value={password} 
                                    placeholder="Enter Password"
                                    />
                                    {passwordIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide valid Password with minimum 6 characters</span> : null} */}
                                </Col>  
                                

								{/* <Col md={2}>Campaign Type<span className='colorRed'></span></Col>
								<Col md={4}>
									<Picky
										value={selectedCampaign}
										options={campaignType}
										onChange={this.handleChangeCampaignType}
										open={false}
										valueKey="label"
										labelKey="label"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Campaign Type"}
										dropdownHeight={200} 
									/>	
								</Col> */}
						</Row>
                        {/* {!_.isEmpty(loggedinData)?
                        <>
                        {(!loggedinData.ldapEnabled)?
                            <Row className='align-items-center'>
                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Password  <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='password' id='password'
                                    onBlur={() => this.setState({ passwordIsValid: this.isValidPassword(password) })}
                                    onChange={this.handleChange} value={password} 
                                    placeholder="Enter Password"
                                    />
                                    {passwordIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide valid Password with minimum 6 characters</span> : null}
                                </Col>  
                            </Row> 
                        :null}
                        </>
                        :null} */}
                                     
                             
						
                        
                        <Row className='align-items-center'>             
						<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; User Group  <span className='colorRed'>*</span></Col>
                                <Col md={4} >
                                   
									<Picky
										value={this.state.selectedUserGroup}
										options={this.userGroup()}
										onChange={this.handleSelectUserGroup}
										open={false}
										valueKey="usergroupName"
										labelKey="usergroupName"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select"}
										dropdownHeight={200} 
									/>	

                                </Col>  

                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Role  <span className='colorRed'>*</span></Col>
                                <Col md={4} >
                                  
									<Picky
										value={this.state.selectedrole}
										options={this.rolesName()}
										onChange={this.handleSelectRoles}
										open={false}
										valueKey="role"
										labelKey="role"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select"}
										dropdownHeight={200} 
									/>	
                                </Col>  
								</Row>
								<Row className='align-items-center'>  
								{selectedrole['role'] && selectedrole['role'] !== 'Report' && selectedrole['role'] !== 'QA' && (
									<>
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; PBX Extension<span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='number' id='pbxExtn'
                                    onChange={this.handleAllowNubers} onPaste={this.handleAllowNubers} value={pbxExtn} 
                                    placeholder="Enter PBX Extension" maxLength={15}
                                    />
                                </Col>  
								</>)}
						
						{selectedrole && selectedrole['role'] !== 'Report' && selectedrole['role'] !== 'QA' && (
							<>
						           
                                 

                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Skill Set <span className='colorRed'>*</span></Col>
                                <Col md={4} >
                                   
								<Picky
										value={this.state.selectedSkillGroup}
										options={this.skillDatas()}
										onChange={this.handleSelectSkillGroup}
										open={false}
										valueKey="skillName"
										labelKey="skillName"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select"}
										dropdownHeight={200} 
									/>	

                                </Col>  
								
						</>)}
						</Row>
						<Row className='align-items-center'>  
								{selectedrole['role'] && selectedrole['role'] === 'Supervisor' && (
								<>
								<Col  md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Agent <span className='colorRed'>*</span></Col>
                                <Col md={4} >
                                   
									<Picky
										value={this.state.selectedAgent}
										options={this.agentDatas()}
										onChange={this.handleSelectAgent}
										open={false}
										valueKey="value"
										labelKey="label"
										multiple={true}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select"}
										dropdownHeight={200} 
									/>	

                                </Col>
								
								</>
                    )}
					</Row>
					<Row className='align-items-center'>
							
							<Col md={2}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" onClick={this.handleCheck} checked={userActive}/>&nbsp;&nbsp;&nbsp;&nbsp;Active </Col>
							
							</Row>
						<Row> <br/> </Row>
						{/* <Row className='align-items-center'>
						<Col><input type="checkbox" value="" checked={userstatus} onClick={this.onhandleStatusChange}/>&nbsp;&nbsp;&nbsp;&nbsp;Active  <span className='colorRed'>*</span></Col>
						</Row> */}

					</div>
					{roleBaseSet && roleBaseSet==='Agent'&& (
					<div className="form_container">
					
						<Row>
							<Col onClick={this.handleSelctRoleOpenView}>{roleBaseSet==='Agent' &&selctRoleOpenView ? <i class="fas fa-caret-down fa-lg" /> : <i class="fas fa-caret-right fa-lg"/>}&nbsp;&nbsp;&nbsp;&nbsp;  Agent Setting<span className='colorRed'>*</span></Col>
						</Row>
						
						{ selctRoleOpenView?
						<>	
						<Row className='align-items-center'>             
                                 <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Type <span className='colorRed'>*</span></Col>
                                <Col md={4} >
								<Select
                                        value={this.state.agent[0].agentType}
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
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Work From Home <span className='colorRed'>*</span></Col>
                                <Col md={4} >
								<Select
                                        value={this.state.agent[0].wfh}
                                        options={this.wfhData()}
                                        labelField='value'
                                        dropdownPosition='auto'
                                        valueField='id'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select"
                                        onChange={this.handleSelectWfh}
                                        closeOnSelect={true}
                                    />
									{/* <FormControl  type='text' id='agentType'
                                    onChange={this.handleChange} value={agentType} 
                                    placeholder="Enter Agent Type"
                                    /> */}
                                    {/* {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null} */}
                                </Col>  
								</Row>
								<Row className='align-items-center'> 
								{this.state.agent[0].wfh==='Yes'?   
								<>
								<Col md={2}>  &nbsp;&nbsp;&nbsp;&nbsp; Time Zone <span className='colorRed'>*</span></Col>
                                <Col md={4} >
								<Select
                                        value={this.state.agent[0].wfh}
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
								 
								</> :null }
								
								

                                
                                
						</Row>
							
							
						</> :null }
						</div>
						 )}
						 
					
					<br/> <br/>
                    <Row className='align-items-center'>
                        <Col md={4}></Col>	
                        <Col md={2}> <Button  variant="danger alignRight" onClick={this.openClearMessage}>Close</Button>
                        </Col>
                        <Col md={2}> <Button  variant="primary alignRight" style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} disabled={!this.validateForm()} onClick={this.openSaveClearMessage}>Update User</Button></Col>
						{_.isEqual(loggedinData.roles,"[Admin]")?
						
						<Col md={2}> <Button  variant="primary alignRight" onClick={this.resetClick} disabled={!_.isEqual(loggedinData.roles,"[Admin]")} >Reset Password</Button>
						
						</Col>
	:null}
                       	
						{/* <Col md={2}> <Button  variant="primary alignRight" style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} disabled={!this.validateForm()} onClick={this.handleSubmit}>Reset Password</Button></Col> */}
                        <Col md={4}></Col>	
                    </Row>
				</div>
				{clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Update this User Set?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.handleSubmit} />
	  	  :null}
			</div> 
			</Modal.Body>
            </Modal>
        </div>
		)
	}
 }

 

  