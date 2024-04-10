import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col, InputGroup} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';
import _ from 'lodash';
import { JSEncrypt } from 'jsencrypt';
import {Picky} from 'react-picky';
import DatePicker from "react-datepicker";
import Select,{ components } from 'react-dropdown-select';
import moment from "moment";
import 'react-picky/dist/picky.css'; 
import MessageShow from '../mesaageShow'
 export default class AddUser extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inputValue:'',
			passwordtype:"password",
			employeeId: props.edit ? props.edit.employeeId : '',
			firstName: props.edit ? props.edit.firstName : '',
			lastName: props.edit ? props.edit.lastName : '',
			password: props.edit ? props.edit.password : '',
			email: props.edit ? props.edit.email : '',
			mobileNumber: props.edit ? props.edit.mobileNumber : '',
			domain: [{domainId: "1", domainName: "Banking"}],
			business : [{buId: "1", buName: "Retail"}],
			status: props.edit ? props.edit.status : 'NEW',
			selectedrole: '',
			selectedSkillGroup: '',
			selectedUserGroup:[],
			selectedAgent: [],
			// selectAgent: '',
			userstatus: props.edit.status === 'ACTIVE' ? true : false,
			emailIsValid: true,
			agent:[{agentType:[],wfh:'',timeZone:'',skillSet:'',level:''}],
			supervisor:[{supervisorType:'',wfh:'',timeZone:'',agenstList:[]}],
			roleBaseSet:'',
			userGroup:'',
			selctRoleOpenView: false,
			pbxExtn:'',
			showPassword: false,
			clearMessage:false,
			saveMessage:false,
			userActive:true
		}
	}
	componentDidMount() {
		// let roles = _.find(this.props.rolesData, { 'roleId': this.props.edit.roleId })
		// if (!_.isEmpty(roles)) {
		// 	this.setState({ selectedrole: [roles] })
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
		let skillData = _.cloneDeep(this.props.agentData)
		let data=skillData.map(item => ({
			label: `${item.firstName} ${item.lastName}`, // Concatenate firstName and lastName
			value: item.userId // Set valueField to userId
		  }));
		  console.log(data)
		
		return data
		
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
		console.log([event.target.maxLength])
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
		this.setState({ passwordtype: prop })
	}
	handleSelectRoles = (e) => {
		
	
		this.setState({ selectedrole: e })
		// this.setState({ roleBaseSet: e[0]['rolesName'] })
		// this.setState({selctRoleOpenView:false})
	}
	handleSelectGroup = (e) => {
		
		this.setState({ selectedSkillGroup: e })
		// this.setState({ roleBaseSet: e[0]['rolesName'] })
		// this.setState({selctRoleOpenView:false})
	}
	handleSelectUserGroup = (e) => {
		
		
		this.setState({ selectedUserGroup: e })
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
	handleInputChange = (inputValue) => {
        // Filter options based on user input
		console.log(inputValue)
       if(inputValue.length<30){
		return true
	   }
    }
	validateForm() {
		const {loggedinData} = this.props
		console.log()
		// console.log(this.state.employeeId , this.state.employeeId?.length > 0 ,
		// 	this.state.firstName , this.state.firstName?.length > 0 , this.state.emailIsValid ,
		// 	this.state.lastName , this.state.lastName?.length > 0 ,
		// 	this.state.email , this.state.email?.length > 0 , this.state.mobileNumber , this.state.mobileNumber?.length > 0 , this.state.passwordIsValid , this.state.password , this.state.password?.length > 0
		// 	, !_.isEmpty(this.state.selectedrole))
		
		if (this.state.employeeId && this.state.employeeId?.length > 0 &&
			this.state.firstName && this.state.firstName?.length > 0 && this.state.emailIsValid &&
			this.state.lastName && this.state.lastName?.length > 0 &&
			this.state.email && this.state.email?.length > 0 && this.state.mobileNumber && this.state.mobileNumber?.length > 0  && this.state.password && this.state.password?.length > 0
			&& !_.isEmpty(this.state.selectedrole)) {
		
				
				if(this.state.selectedrole && this.state.selectedrole[0]['role']=='Supervisor'){
					if (!_.isEmpty(this.state.selectedAgent) && !_.isEmpty(this.state.selectedSkillGroup) && this.state.pbxExtn && this.state.pbxExtn?.length > 0 ){
						return true
					}

				}

				else if( this.state.selectedrole && this.state.selectedrole[0]['role']=='Agent'){
					if (!_.isEmpty(this.state.selectedSkillGroup) && this.state.pbxExtn && this.state.pbxExtn?.length > 0){
						return true
					}

				}
				else{
					return true
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
	handleAllowCharacters=(event)=>{
		const onlyLetters = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces

		if (onlyLetters.test(event.target.value) || event.target.value === '') {
			if (parseInt(event.target.maxLength)>=event.target.value.length){
				this.setState({
					[event.target.id]: event.target.value})
				}

		}
	   }
	handleSubmit = () => {
		// const { firstName, email, password, mobileNumber, employeeId, lastName, selectedrole, business, domain } = this.state;
		const { employeeId, firstName, email,selectedUserGroup, mobileNumber,selectedAgent,showPassword,
			 password, lastName,agent,supervisor,userActive,pbxExtn,selectedSkillGroup, emailIsValid,roleBaseSet,selctRoleOpenView, passwordIsValid, userIdIsValid, entityCheck, domain, business,selectedrole } = this.state;
		const {loggedinData} = this.props
		

		// const publickey = process.env.REACT_APP_PUBLIC_KEY;
		// const encrypt = new JSEncrypt()
		// encrypt.setPublicKey(publickey);
		// const encyPassword = encrypt.encrypt(password);
		const selectedValues = selectedAgent.map(option => option.value).join(',');
console.log(selectedAgent)
		let new_user = {
			"emailId": email,
			"firstName": firstName,
			"lastName": lastName,
			"userId": employeeId,
			"mobNum": mobileNumber,
			"pbxExtn": pbxExtn,
			"role": selectedrole?selectedrole[0].role:'' ,
			"skillSet": selectedSkillGroup?selectedSkillGroup[0].skillName:'',
			"password": password,
			"agent": selectedValues,
			"userGroup": selectedUserGroup?selectedUserGroup[0].usergroupName:'',
			"status":userActive?'ACTIVE':'INACTIVE'
			
			// "createdBy": loggedinData.userName
		}
		// if(!_.isEmpty(loggedinData)){
		// 	if(loggedinData.ldapEnabled){
		// 		new_user['password'] = ''
		// 	}
		// }
		console.log(new_user)
		this.props.action.addnewUser(new_user)
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
	handleUserOnBlur = (employeeId) => {
		this.setState({ userIdIsValid: this.isValidUser(employeeId) })
		// this.handleOnEntity()
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
	   
	   
	toggleShowPassword = () => {
		this.setState(prevState => ({
		  showPassword: !prevState.showPassword
		}));
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
	  handleCheck=()=>{
		this.setState({userActive : !this.state.userActive})
	}
	  openSaveClearMessage = () => {
		
		this.setState({saveMessage : true})
	  }
	
	  closeSaveClearMessage = () => {
		this.setState({saveMessage : false})
	  }
	

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
	handlePaste = (e) => {
        e.preventDefault(); // Prevent pasting
    };
	
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
	customInput = ({ ...props }) => {
		return (
		  <input
			{...props}
			maxLength={30} // Example: setting maxLength
			// You can add other input props here
		  />
		);
	  };
	render(){
		const {userEntity,rolesData,loggedinData,groupsData} = this.props
		const {showMessage,message} = this.props.action
        const { employeeId, firstName,clearMessage,inputValue,
			saveMessage, email,selectedUserGroup,showPassword,userActive, mobileNumber,selectedAgent, password, lastName,agent,supervisor,pbxExtn,selectedSkillGroup, emailIsValid,roleBaseSet,selctRoleOpenView, passwordIsValid, userIdIsValid, entityCheck, domain, business,selectedrole } = this.state;
		
		
		
		
	return(
		<div>        
			{/* {isPending ? <span className='spinner alignRight'>
			Loading... <Spinner animation="grow" role="status" size='lg'/>
				</span> : null} */}
			{/* {(showMessage === true) ?
			<ShowModalLogin message={message} falseShowModalPopUp={this.props.action.CampaignEditErrorClose}/> : null} */}

			<div>
				<br/>
				<div >
					<span className='alignLeft'>ADD USERS </span>
					<span className='alignRight colorRed'> * Indicates Required Field</span>
				</div>
				<div><br/><br/></div>
				<div className='addCampaign'>
					<div className="form_container">
					<Row className='align-items-center'>             
                                 <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; First Name  <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='text' id='firstName' maxLength={30}
                                    onChange={this.handleAllowCharacters} onPaste={this.handleAllowCharacters} value={firstName} 
                                    placeholder="Enter First Name"
                                    />
                                </Col>  

                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Last Name  <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='text' maxLength={30} id='lastName'
                                    onChange={this.handleAllowCharacters} onPaste={this.handleAllowCharacters} value={lastName} 
                                    placeholder="Enter Last Name"
                                    />
                                </Col>  
						</Row>
						<Row className='align-items-center'>             
                                 <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Email ID <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl maxLength={30}  type='text' id='email'
								onBlur={() => this.setState({ emailIsValid: this.isValidEmailAddress(email) })}
                                    onChange={this.handleChange}  value={email} 
                                    placeholder="Enter Email ID"
                                    />
                                    {emailIsValid === false ? <span className="colorRed">&nbsp;&nbsp;Please provide Correct Email Address</span> : null}
                                </Col>  
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Mobile Number  <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='text' id='mobileNumber' maxLength={10}
                                    onChange={this.handleAllowNubers} onPaste={this.handleAllowNubers} value={mobileNumber} 
                                    placeholder="Enter mobile Number"
                                    />
                                </Col>  

                                
						</Row>
						<Row className='align-items-center'>             
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; User ID <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id='employeeId'
										onBlur={()=>this.handleUserOnBlur(employeeId)}
										onPaste={this.handleChangeOnlyallowCharacteNum}
                                        onChange={this.handleChangeOnlyallowCharacteNum} value={employeeId} maxLength={30}
										placeholder="Enter User ID"
										/>
                                        {userIdIsValid === false ? <span className="colorRed" > &nbsp;&nbsp; Please provide valid userId with minimum 4 characters. special characters and space not allowed</span> : null}
							            {(userEntity && employeeId?.length > 0 && entityCheck) ? <span className="colorRed" >&nbsp;&nbsp;  **User Id already exists**</span> : null }
								</Col>
                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Password  <span className='colorRed'>*</span></Col>
                                <Col md={4} >
								<InputGroup>
        <FormControl
          type={this.state.passwordtype}
          id='password'
          onChange={this.handleChange}
		  onPaste={this.handlePaste}
          value={password}
          placeholder="Enter Password"
		  maxLength={20}
        />
        <InputGroup.Append>
		<InputGroup.Text id="basic-addon2">{this.state.passwordtype === "password" ?     
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
                                    <Select
                                        values={this.state.selectedUserGroup}
                                        options={this.userGroup()}
										
                					onInputChange={this.handleInputChange}
										
										
										
                                        labelField='usergroupName'
                                        dropdownPosition='auto'
                                        valueField='usergroupName'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select User Group"
                                        onChange={this.handleSelectUserGroup}
                                        closeOnSelect={true}
										isSearchable
										maxLength={10}
										
                                    />

                                </Col>  

                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Role  <span className='colorRed'>*</span></Col>
                                <Col md={4} >
                                    <Select
                                        value={this.state.selectedrole}
                                        options={this.rolesName()}
                                        labelField='role'
                                        dropdownPosition='auto'
                                        valueField='role'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select Role"
                                        onChange={this.handleSelectRoles}
										
                                        closeOnSelect={true}
										maxLength={30} 
                                    />

                                </Col>  
								</Row>
								<Row className='align-items-center'>  
								{selectedrole && selectedrole[0] && selectedrole[0]['role'] !== 'Report' && selectedrole[0]['role'] !== 'QA' && (
									<>
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; PBX Extension   <span className='colorRed'>*</span></Col>
                                <Col md={4} ><FormControl  type='text' id='pbxExtn'
                                    onChange={this.handleAllowNubers} value={pbxExtn}  onPaste={this.handleAllowNubers}
                                    placeholder="Enter PBX Extension"
									maxLength={15}

                                    />
                                </Col>  
								</>)}
						
						{selectedrole && selectedrole[0] && selectedrole[0]['role'] !== 'Report' && selectedrole[0]['role'] !== 'QA' && (
							<>
						           
                                 

                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Skill Set <span className='colorRed'>*</span></Col>
                                <Col md={4} >
                                    <Select
                                        value={this.state.selectedSkillGroup}
                                        options={this.skillDatas()}
                                        labelField='skillName'
                                        dropdownPosition='auto'
                                        valueField='skillName'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select Skill Set"
                                        onChange={this.handleSelectGroup}
                                        closeOnSelect={true}
										maxLength={30} 
                                    />

                                </Col>  
								
						</>)}
						</Row>
						
						<Row className='align-items-center'>  
								{selectedrole && selectedrole[0] && selectedrole[0] && selectedrole[0]['role'] === 'Supervisor' && (
								<>
								<Col  md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Agent <span className='colorRed'>*</span></Col>
                                <Col md={4} >
                                    {/* <Select
                                        values={this.state.selectedAgent}
                                        options={this.agentDatas()}
                                        labelField='label'
                                        dropdownPosition='auto'
                                        valueField='value'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select Agent"
                                        onChange={this.handleSelectAgent}
                                        isMulti
                                    /> */}
									<Picky
									     value={this.state.selectedAgent}
										 options={this.agentDatas()}
										 onChange={this.handleSelectAgent}
										 open={false}
										 valueKey="label"
										 labelKey="label"
										 multiple={true}
										 keepOpen={false}
										 includeFilter={false}
										 clearFilterOnClose={true}
										 placeholder={"Select Agents"}
										 dropdownHeight={200} 
										 maxLength={30} 
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
                        <Col md={2}> <Button  variant="primary alignRight" disabled={!this.validateForm()} style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} onClick={this.openSaveClearMessage}>Add User</Button></Col>
                        <Col md={4}></Col>	
                    </Row>
				</div>
				{clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Create this Tenant Set?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.handleSubmit} />
	  	  :null}
			</div> 
        </div>
		)
	}
 }

 

  