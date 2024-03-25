import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col, InputGroup} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';
import AddContacts from './addContacts'
import {Picky} from 'react-picky';
import DatePicker from "react-datepicker";
import Select from 'react-dropdown-select';
import moment from "moment";
//import TimePicker from 'react-time-picker';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-picky/dist/picky.css'; 
import _, { toInteger } from 'lodash';
import { Link } from "react-router-dom";
 export default class EditCampaign extends Component {
	 constructor(props){
			super(props)
			this.state = {
				timesList: !_.isEmpty(props.action.timesList) ? props.action.timesList : [],
				campaignName: props.edit.campaignName ? props.edit.campaignName : '',
				campaignActive: props.edit.campaignActive ? true : false,
				startDate : props.edit.startDate ? props.edit.startDate : '',
				startTime : props.edit.startTime? props.edit.startTime : '00:00',
				endDate : props.edit.endDate? props.edit.endDate : '',
				endTime : props.edit.endTime? props.edit.endTime : '00:00',
				weekDaysTime : props.edit.weekDaysTime? props.edit.weekDaysTime : [{'day': 'Sunday', 'active': false , 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Monday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Tuesday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Wednesday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Thursday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Friday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Saturday', 'active': false, 'startTime':'00:00', 'endTime': '00:00'}],
				callBeforeList : [{'day' : '0 day'},{'day' : '1 day'},{'day' : '2 days'},{'day' : '3 days'},{'day' : '4 days'},{'day' : '5 days'},{'day' : '6 days'},{'day' : '7 days'}],
				callBefore : props.edit.callBefore? props.edit.callBefore+" day" : '',
				maxAdvNotice : props.edit.maxAdvNotice? props.edit.maxAdvNotice : '01:00:00',
				retryDelay : props.edit.retryDelay? props.edit.retryDelay : '',
				retryCount : props.edit.retryCount? props.edit.retryCount : '',
				concurrentCall : props.edit.concurrentCall? props.edit.concurrentCall : '',
				ftpLocation : props.edit.ftpLocation? props.edit.ftpLocation : '',
				ftpUsername : props.edit.ftpUsername? props.edit.ftpUsername : '',
				ftpPassword : props.edit.ftpPassword? props.edit.ftpPassword : '', //str.split(" ",2)
				ftpFileName : props.edit.fileName? props.edit.fileName : '',
				tempHr : props.edit.maxAdvNotice? props.edit.maxAdvNotice.split(":")[0] : '',	
				tempMin : props.edit.maxAdvNotice? props.edit.maxAdvNotice.split(":")[1] : '',
				tempHrD : props.edit.retryDelay? toInteger(props.edit.retryDelay/60) : '',
				tempMinD : props.edit.retryDelay? props.edit.retryDelay%60: '',  
				tempStartDate : '',
				tempEndDate : '',
				ftpView : false,
				selectCampaign : props.edit.dailingMode? props.edit.dailingMode: '',  
				CampaignDailingMode : [{'id' : 6, 'label' : 'Progressive'},
									//    {'id' : 7, 'label' : 'Predictive'},
									//    {'id' : 8, 'label' : 'Power'},
									//    {'id' : 9, 'label' : 'Preview'},
									//    {'id' : 10, 'label' : 'manual'}
									],
				 selectCampaignQueue : props.edit.queue? props.edit.queue: '' ,
				 campaignAssignQueue : [{'id' : 11, 'label' : 'Post Due' },
										{'id' : 12, 'label' : 'Pre Due' },
										{'id' : 13, 'label' : 'PTF' },
										{'id' : 14, 'label' : 'FUP' }], 
										concurrrentCalls : [{'id' : 1, 'label' : '1' },
				{'id' : 2, 'label' : '2' },
				{'id' : 3, 'label' : '3' },
				{'id' : 4, 'label' : '4' },
				{'id' : 5, 'label' : '5' },
				{'id' : 6, 'label' : '6' },
				{'id' : 7, 'label' : '7' },
				{'id' : 8, 'label' : '8' },
				{'id' : 9, 'label' : '9' },
				{'id' : 10, 'label' : '10' }],

				selectDispositionList : props.edit.dispositionID? props.edit.dispositionID: '',  
				selectDNCList:props.edit.dncId? props.edit.dncId: '', 
				disPositionList : props.dispostionData,
				dncList : props.dncData,

				selectedCampaign : {'id' : 2 , 'label' : 'IVR based CBM'},
				campaignType : [{'id' : 2 , 'label' : 'IVR based CBM'}],

				ewt : '5',
				cbmIVRIncomeNO : '4545',
				language : 'English',
				agentVDN : '5566',
				skillName : 'Banking',
				queueLimitLength : '5',
				customeTimeout : '20',
				cbIntervalTime : '30',
				selectDialorType : {'label' :  'Preview'},
				DialorTypeList : [{'label' :  'Preview'}],

				busyStatus : true,
				busyNoTries : '30',
				notReached : true,
				notReachedNoTries : '30',
				noResponse : true,
				noResponseNoTries : '30',
				defaultTries : true,
				maxRetries : '5',
				ignoreAA : false,

				businessHRView: false,
				reminderView: true,
				callBackConfqView : false,
				customerStatusConfqView : false,
				
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
	   handleChangeCampaignDailingMode = (e) => {
		this.setState({selectCampaign : e['label']})
	   }
	   
	   handleChangeCampaignAssignQueue = (e) => {
		this.setState({selectCampaignQueue : e['label']})
	   }
	   handleChangeconcurrent = (e) => {
		this.setState({concurrentCall : e['label']})
	   }

	   handleSelectDispositionList = (e) => {
		this.setState({selectDispositionList : e['dispId']})
	   }
	   handleSelectDNCList = (e) => {
		this.setState({selectDNCList : e['dncid']})
	   }
	   getSelectedDNCName() {
		
		const selectedDNC = this.dncDatas().find(dnc => dnc.dncid === this.state.selectDNCList);
		return selectedDNC ? selectedDNC.dncName : ""; // Return the name of the selected DNC list, or an empty string if not found
	}
	getSelectedDispositionList() {
		
		const selectDisposition = this.dispostionDatas().find(dnc => dnc.dispId === this.state.selectDispositionList);
		return selectDisposition ? selectDisposition.dispositionName : ""; // Return the name of the selected DNC list, or an empty string if not found
	}
	   isValidPassword = (password) =>{
		if(!_.isEmpty(password)){
		 if(password.length>6){
		   return true
		 } else {
		   return false
		 }
		 }
	   }
	   validateForm() {
		const {campaignName,campaignActive,startDate,startTime,endDate,endTime,weekDaysTime,maxAdvNotice,retryDelay,retryCount,concurrentCall,
			ftpLocation, ftpUsername, ftpPassword, ftpFileName, callBefore,selectDNCList,selectDispositionList,selectCampaign,selectCampaignQueue,selectedCampaign } = this.state
			const {campaignStatus} = this.props.action
	
			   if(campaignName && campaignName.length > 0 && startDate && startDate.length > 0 && startTime && startTime.length > 0 && 
				 endDate && endDate.length > 0 && endTime && endTime.length > 0 && !_.isEmpty(weekDaysTime)&& callBefore && callBefore.length > 0 && 
				 retryDelay && retryCount  &&  campaignStatus === true && selectDNCList && selectDispositionList && selectCampaign &&concurrentCall&& selectCampaignQueue && selectedCampaign )
				{
					if(callBefore.split(' ')[0] === '0')  {
						if(maxAdvNotice && maxAdvNotice.length > 0){
							return true
						} else {
							return false
						}
					} else {
						return true
					}
				  
				}
	   }

	   addValue = (obj) => {
		  if(!_.isEmpty(obj)){
			  this.setState({
				ftpLocation : obj.ftpLocation, 
				ftpUsername : obj.ftpUsername,
				ftpPassword : obj.ftpPassword,
				ftpFileName : obj.fileName
			  })
		  }
	   }

	   viewPassword = (prop) => {
		   this.setState({passwordtype:prop}) 
	   }
	   handleCheck=()=>{
		   this.setState({campaignActive : !this.state.campaignActive})
	   }

	   handleChangeStart=(e)=>{
		const date = moment(e).format('YYYY-MM-DD'); 
		this.setState({startDate: date});
		this.setState({tempStartDate: e});
	   }
	   handleChangeEnd=(e)=>{
		const date = moment(e).format('YYYY-MM-DD'); 
		this.setState({endDate: date});
		this.setState({tempEndDate: e});
	   }
	   handleChangeStartTime=(e)=>{
		const time = e.label+":00"  
		this.setState({startTime: time});
	   }
	   handleChangeEndTime=(e)=>{
		const time = e.label+":00"   
		this.setState({endTime: time});
	   }
	   handleChangeDayBefore=(e)=>{
		this.setState({callBefore: e.day});
	   }
	   handleMaxHrChange = (e) => {
		const {tempMin} = this.state
		let val = e.target.value+":"+tempMin+":00"
		this.setState({tempHr:e.target.value})
		this.setState({maxAdvNotice:val})
	   }
	   handleMaxValueChange = (e) => {
		   const {tempHr} = this.state
		   let val = tempHr+":"+e.target.value+":00"
		   this.setState({tempMin:e.target.value})
		   this.setState({maxAdvNotice:val})
		   
	   }
	   handleRetryHrChange = (e) => {
		const {tempMinD} = this.state
		let val = toInteger(e.target.value)*60 + toInteger(tempMinD)
		this.setState({tempHrD:e.target.value})
		this.setState({retryDelay:val})
	   }
	   handleRetryValueChange = (e) => {
		   const {tempHrD} = this.state
		   let val = (toInteger(tempHrD)*60)+ toInteger(e.target.value)
		   this.setState({tempMinD:e.target.value})
		   this.setState({retryDelay:val})
		   
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
	   handleSecChange = (event) => {
		let { value } = event.target;
		value=toInteger(value)
		console.log(value)
		// Ensure the value is within the allowed range
		if (value < 0) {
			value = 0;
		} else if (value > 5) {
			value = 5;
		}
		// Update the state with the sanitized value
		console.log(event.target.id)
		this.setState({ [event.target.id]: value });
	}

	   weekdayChecked=(obj)=>{
		const {weekDaysTime} = this.state
		const val = _.find(weekDaysTime, {'day':obj })
		let check = ''
		if(val.active === 'true'){
			check = true
		} else if (val.active === 'false') {
			check = false
		} else { check = val.active }
		
		return check
	   }

	   handleWeekdaysCheck = (obj)=> {
		const {weekDaysTime} = this.state
		let value = weekDaysTime
		_.map(value,(val,i)=>{
			if(val.day === obj){
				val.active = !val.active
			}
		})
		//console.log("EE",e.target.id)
		this.setState({weekDaysTime:value})
	   }

	   selectTimeOption=(obj)=>{
		   const {weekDaysTime} = this.state
		   const val = _.find(weekDaysTime, {'day':obj })
		   let ret = [{'label':'00:00:00'}]
		   if(val !== undefined){
		   	 ret = [{'label':val.startTime}];
		   } 
		   return ret
	   }
	   selectTimeOptionEnd=(obj)=>{
		const {weekDaysTime} = this.state
		const val = _.find(weekDaysTime, {'day':obj })
		let ret = [{'label':'00:00:00'}]
		   if(val !== undefined){
		   	 ret = [{'label':val.endTime}];
		   }  
		return ret
		}

	   handleWeeklyTimeStart=(e,obj)=>{
		   const {weekDaysTime} = this.state
		   let value = weekDaysTime
		   _.map(value,(val,i)=>{
			   if(val.day === obj){
				   val.startTime = e.label+':00'
			   }
		   })
		   //console.log("EE",e.target.id)
		   this.setState({weekDaysTime:value})
	   }

	   handleWeeklyTimeEnd=(e,obj)=>{
		const {weekDaysTime} = this.state
		let value = weekDaysTime
		_.map(value,(val,i)=>{
			if(val.day === obj){
				val.endTime = e.label+':00'
			}
		})
		this.setState({weekDaysTime:value})
		}

		openFtp=()=>{
			this.setState({ftpView : true})
		}
		closeFtp= () => {
			this.setState({ftpView : false})
		}

		checkCampaignStatus = () => {
			const {campaignName} = this.state
			const obj = {'campaignName': campaignName}
			this.props.action.checkCampaignStatus(obj)
		}

		handleBusinessHRView = () => {
			this.setState({businessHRView : !this.state.businessHRView})
		}
		handleReminderView = () => {
			this.setState({reminderView : !this.state.reminderView})
		}
		handleCallBackConfqView = () => {
			this.setState({callBackConfqView : !this.state.callBackConfqView})
		}
		handleCustomerStatusConfqView = () => {
			this.setState({customerStatusConfqView : !this.state.customerStatusConfqView})
		}


	   handleSubmit =() => {  
		   const {loggedinData} = this.props; 	
		   const{campaignName,campaignActive,startDate,startTime,endDate,endTime,weekDaysTime,maxAdvNotice,retryDelay,retryCount,concurrentCall,
				ftpLocation, ftpUsername, ftpPassword,ftpFileName,callBefore,selectDispositionList,selectDNCList,selectCampaignQueue,selectCampaign } = this.state;
		    let obj = _.cloneDeep(this.props.edit)
		    //obj = {
			   obj.campaignName = campaignName
			   obj.campaignActive = campaignActive	
			   obj.startDate = startDate
			   obj.startTime = startTime
			   obj.endDate = endDate
			   obj.endTime = endTime
			   obj.weekDaysTime = weekDaysTime
			   obj.callBefore = callBefore.split(' ')[0]
			   obj.maxAdvNotice = maxAdvNotice
			   obj.retryDelay = retryDelay
			   obj.retryCount = retryCount
			   obj.concurrentCall = concurrentCall
			   obj.ftpLocation =	ftpLocation
			   obj.ftpUsername =	ftpUsername
			   obj.ftpPassword =	ftpPassword
			   obj.fileName = ftpFileName
			   obj.dispositionID = selectDispositionList
			   obj.dncId = selectDNCList
			   obj.queue = selectCampaignQueue
			   obj.dailingMode = selectCampaign
			   //obj.createdBy = loggedinData.roles
			   //obj.updatedBy  = loggedinData.roles
		   //}   
		   //console.log("Edit Input:",obj)     
		   this.props.action.editCampaign(obj) 	 
		   this.props.closeModal()
	   } 
	   dispostionDatas = () => {
		
		let skillData = _.cloneDeep(this.props.dispostionData)
		
		
		return skillData
	}
	dncDatas = () => {
		
		let skillData = _.cloneDeep(this.props.dncData)
		
		
		return skillData
	}

	   handleChangeCampaignType = (e) => {
		this.setState({selectedCampaign : e})
	   }
	   handleDialorType = (e) => {
		this.setState({selectDialorType : e})
	   }
	   handleCheckBusy=()=>{
		this.setState({busyStatus : !this.state.busyStatus})
	   }
	   handleCheckNotReached=()=>{
		this.setState({notReached : !this.state.notReached})
	   }
	   handleCheckNotResponse=()=>{
		this.setState({noResponse : !this.state.noResponse})
	   }
	   handleCheckDefault=()=>{
		this.setState({defaultTries : !this.state.defaultTries})
	   }
	   handleCheckIgnoreAA=()=>{
		this.setState({ignoreAA : !this.state.ignoreAA})
	   }
	

	render(){
		const {isOpen,isPending,showMessage,message} = this.props
		const campaignStatus = _.cloneDeep(this.props.action.campaignStatus)  
		// console.log("this state", this.state)
		// console.log("this props", this.props)
		const {campaignName,campaignActive,startDate,startTime,endDate,endTime,weekDaysTime,maxAdvNotice,retryDelay,retryCount,concurrentCall,
			tempHr,tempMin,tempHrD,tempMinD,tempStartDate,tempEndDate,ftpView,ftpLocation,ftpUsername,ftpPassword,ftpFileName,callBefore,callBeforeList,
			businessHRView,reminderView,callBackConfqView,customerStatusConfqView,ewt,cbmIVRIncomeNO,language,agentVDN,skillName,queueLimitLength,customeTimeout,cbIntervalTime,selectDialorType,DialorTypeList,
			busyStatus,busyNoTries,notReached,notReachedNoTries,noResponse,noResponseNoTries,defaultTries,maxRetries, selectedCampaign,campaignType,ignoreAA,selectCampaign,CampaignDailingMode,selectCampaignQueue,campaignAssignQueue  } = this.state;
		const {timesList} = this.props.action	
		
	
		return(
			<div>
			{(ftpView === true) ?  
				<AddContacts action={this.props.action} ftpL={ftpLocation} ftpF={ftpFileName} ftpU={ftpUsername} ftpP={ftpPassword} handleBack={this.addValue}  closeModal={this.closeFtp} /> : 
				
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
                Update Campaign
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<div className='addCampaign'>
					<div className="form_container">

						<Row className='align-items-center'>             
								<Col md={2}>{reminderView ? <i class="fas fa-caret-down fa-lg" onClick={this.handleReminderView} /> : <i class="fas fa-caret-right fa-lg" onClick={this.handleReminderView}/> } &nbsp;&nbsp;&nbsp;&nbsp; Campaign Name  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' maxLength={100} id="campaignName"  
										onChange={this.handleAllowCharacters} value={campaignName}
										placeholder="Enter Campaign Name"
										onBlur={this.checkCampaignStatus}
										/>
										
										{(campaignStatus === false) ? <span className="colorRed">&nbsp;****Campaign name is already exits****</span>: null}
								</Col>

								<Col md={2}>Campaign Type<span className='colorRed'>*</span></Col>
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
								</Col>

									{/* <Col md={2}>Active<span className='colorRed'></span></Col>
									<Col md={4}>
										<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
									</Col> */}
						</Row>
						{reminderView ?
						<>
						{/* <Row>
							<br></br>
						</Row> */}
						<Row className='align-items-center'>
							<Col md={2}>Start Date-Time<span className='colorRed'>*</span></Col>
							<Col md={2}> 
								<DatePicker
									selected={tempStartDate}
									className='myDatePicker'
									selectsStart
									showMonthDropdown
									startDate={tempStartDate}
									endDate={tempEndDate}
									onChange={this.handleChangeStart}
									dateFormat="dd-MM-yyyy"  
									placeholderText={startDate.toString()}          
								/>
							</Col>
							<Col md={2}>
							{/* <TimePicker
								showTimezone 
								//focused 
								//colorPalette="dark"
								time={startTime}
								withoutIcon={true}
								minuteStep={1}
								theme="classic" //material
								//timeMode="12" 
								onTimeChange={this.handleChangeStartTime}
							/> */}
							<Picky
								value={startTime}
								options={timesList}
								onChange={this.handleChangeStartTime}
								open={false}
								valueKey="label"
								labelKey="label"
								multiple={false}
								keepOpen={false}
								includeFilter={false}
								clearFilterOnClose={true}
								placeholder="Start Time"
								dropdownHeight={200}
							/>
							</Col>
							<Col md={2}>End Date-Time<span className='colorRed'>*</span></Col>
							<Col md={2}>

								<DatePicker
									selected={tempEndDate}
									selectsEnd
									startDate={tempStartDate}
									endDate={tempEndDate}
									onChange={this.handleChangeEnd}
									minDate={tempStartDate}
									dateFormat="dd-MM-yyyy" 
									placeholderText={endDate.toString()}
								/>
							</Col>
							<Col md={2}>
							{/* <TimePicker
								minuteStep={1}
								onTimeChange={this.handleChangeEndTime}
								time={endTime}
								theme="classic"
								timeMode="12"
							/>	 */}
							<Picky
								value={endTime}
								options={timesList}
								onChange={this.handleChangeEndTime}
								open={false}
								valueKey="label"
								labelKey="label"
								multiple={false}
								keepOpen={false}
								includeFilter={false}
								clearFilterOnClose={true}
								placeholder={"Time"}
								dropdownHeight={200}
							/>
							</Col>     


						</Row>
						<Row className='align-items-center'>
						<Col md={2}>DailingMode<span className="colorRed">*</span></Col>
								<Col md={4}>
									<Picky
									     value={selectCampaign}
										 options={CampaignDailingMode}
										 onChange={this.handleChangeCampaignDailingMode}
										 open={false}
										 valueKey="label"
										 labelKey="label"
										 multiple={false}
										 keepOpen={false}
										 includeFilter={false}
										 clearFilterOnClose={true}
										 placeholder={"Select Campaign Dailing Mode"}
										 dropdownHeight={200} 
										 />			
								</Col>

								<br></br>
								 <br></br>
								 <br></br>

								<Col md={2}>Disposition<span className="colorRed">*</span></Col>
								<Col md={4}>
									<Picky
									     value={this.getSelectedDispositionList()}
										 options={this.dispostionDatas()}
										 onChange={this.handleSelectDispositionList}
										 open={false}
										 valueKey="dispId"
										 labelKey="dispositionName"
										 multiple={false}
										 keepOpen={false}
										 includeFilter={false}
										 clearFilterOnClose={true}
										 placeholder={"Select Disposition List"}
										 dropdownHeight={200} 
										 />

										 {/* <Select
                                        value={this.state.selectDispositionList}
                                        options={this.dispostionDatas()}
                                        labelField='dispositionName'
                                        dropdownPosition='auto'
                                        valueField='dispositionName'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select Disposition"
                                        onChange={this.handleSelectDispositionList}
                                        closeOnSelect={true}
                                    />	 */}
								</Col>

								<br></br>
								<br></br>
								<Col md={2}>Assign Queue<span className='colorRed'>*</span></Col>
								<Col md={4}>
									<Picky
										value={selectCampaignQueue}
										options={campaignAssignQueue}
										onChange={this.handleChangeCampaignAssignQueue}
										open={false}
										valueKey="label"
										labelKey="label"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Assign Queue"}
										dropdownHeight={200} 
									/>	
								</Col>   
								<Col md={2}>DNC<span className='colorRed'>*</span></Col>
								<Col md={4}>
									
									{/* <Select
                                        value={this.state.selectDNCList}
                                        options={this.dncDatas()}
                                        labelField='dncName'
                                        dropdownPosition='auto'
                                        valueField='dncName'
                                        clearable={false}
                                        className='text-left selectDropDown'
                                        placeholder="Select DNC"
                                        onChange={this.handleSelectDNCList}
                                        closeOnSelect={true}
                                    />	 */}
									<Picky
									     value={this.getSelectedDNCName()}
										 options={this.dncDatas()}
										 onChange={this.handleSelectDNCList}
										 open={false}
										 valueKey="dncid"
										 labelKey="dncName"
										 multiple={false}
										 keepOpen={false}
										 includeFilter={false}
										 clearFilterOnClose={true}
										 placeholder={"Select DNC List"}
										 dropdownHeight={200} 
										 />
								</Col>     
						</Row>
						{/* <Row> <br></br> </Row> */}
						<Row className='align-items-center'>
							{!_.isEmpty(selectedCampaign)?
								<>
								{(selectedCampaign.id === 1)?
								<>
								<Col md={2}>Language <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' maxLength={20} id="language"  
										onChange={this.handleChange} value={language}
										placeholder="Enter Language"
										/>
								</Col>

								</>
								:
								<>
									<Col md={2}>Call Before<span className='colorRed'>*</span></Col>
									<Col md={4}> 
										<Picky
											value={callBefore}
											options={callBeforeList}
											onChange={this.handleChangeDayBefore}
											open={false}
											valueKey="day"
											labelKey="day"
											multiple={false}
											keepOpen={false}
											includeFilter={false}
											clearFilterOnClose={true}
											placeholder={"Call Before Day"}
											dropdownHeight={200} 
										/>	               
									</Col>
								</>
								}
								</>
								:
								<>
								<Col md={2}>Call Before<span className='colorRed'>*</span></Col>
								<Col md={4}> 
									<Picky
										value={callBefore}
										options={callBeforeList}
										onChange={this.handleChangeDayBefore}
										open={false}
										valueKey="day"
										labelKey="day"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Call Before Day"}
										dropdownHeight={200} 
									/>	               
								</Col>
								</>
							}

								<Col md={2}>Concurrent Calls<span className='colorRed'>*</span></Col>
								<Col >                   
								{/* <FormControl  type='number' id="concurrentCall"  
											onChange={this.handleChange} maxLength={2} value={concurrentCall}
											placeholder="concurrent List"/> */}

<Picky
										value={concurrentCall}
										options={this.state.concurrrentCalls}
										onChange={this.handleChangeconcurrent}
										open={false}
										valueKey="id"
										labelKey="label"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Concurrent Call"}
										dropdownHeight={200} 
									/>	
								</Col>

						</Row> 
						{/* <Row>
							<br></br>
						</Row> */}
						{ _.toString(callBefore).split(' ')[0] === '0' ?
							<>
							<Row> 
								<Col md={2}>Max.Adv Notice<span className='colorRed'>*</span></Col>
								<Col> 
									<Row>
										<Col md={1}>
											hr<span className='colorblue'>*</span>
										</Col>
										<Col md={3}>
										<FormControl  type='number' id="maxAHr" min="0" max="12"  
											onChange={this.handleMaxHrChange} value={tempHr}
											placeholder="hr"/>
										</Col>
										<Col md={1}>
											min<span className='colorblue'>*</span>
										</Col>
										<Col md={4}>
										<FormControl  type='number' id="maxAdvMin" min="0" max="59"
											onChange={this.handleMaxValueChange} value={tempMin}
											placeholder="minute"/>
										</Col>
										<Col md={3}></Col>
									</Row>	               
								</Col>
								<Col md={2}></Col>
								<Col></Col>
							</Row>
							<Row>
								<br></br>
							</Row>
							</> : null }
						<Row className='align-items-center'>
								<Col md={2}>Retry Delay<span className='colorRed'>*</span></Col>
								<Col> 
									<Row>
										<Col md={1}>
											hr<span className='colorblue'>*</span>
										</Col>
										<Col md={3}>
										<FormControl  type='number' id="maxAHr" min="0" max="12"  
											onChange={this.handleRetryHrChange} value={tempHrD}
											placeholder="hr"/>
										</Col>
										<Col md={1}>
											min<span className='colorblue'>*</span>
										</Col>
										<Col md={4}>
										<FormControl  type='number' id="maxAdvMin" min="0" max="59"
											onChange={this.handleRetryValueChange} value={tempMinD}
											placeholder="minute"/>
										</Col>
										<Col md={3}></Col>
									</Row>	               
								</Col>
								<Col md={2}>Retry Count<span className='colorRed'>*</span></Col>
								<Col>
								<FormControl style={{width:'99%',height:'38px'}} type='number' maxLength={20} min="0" max="5" id="retryCount"  
											onChange={this.handleSecChange} value={retryCount}
											placeholder="Retry Count"

										/>
								</Col>
						</Row>
						{/* <Row> <br></br> </Row> */}
						</>
						:null}
				    </div>
					{!_.isEmpty(selectedCampaign)?
					<>
						{(selectedCampaign.id === 1)?
						<>
						<div className="form_container">
							<Row>
								<Col onClick={this.handleCallBackConfqView}>{callBackConfqView ? <i class="fas fa-caret-down fa-lg" /> : <i class="fas fa-caret-right fa-lg"/>}&nbsp;&nbsp;&nbsp;&nbsp;  Call Back Configuration <span className='colorRed'>*</span></Col>
							</Row>
							{callBackConfqView?
							<>
							<Row>
								<br />
							</Row>
							<Row className='align-items-center'>             
								<Col md={2}> Estimated Wait Time <span className='colorblue'>(min)</span> <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="ewt"  
										onChange={this.handleChange} value={ewt}
										placeholder="Enter EWT Time"
										/>
								</Col>
								<Col md={2}> CBM IVR VDN  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="cbmIVRIncomeNO"  
										onChange={this.handleChange} value={cbmIVRIncomeNO}
										placeholder="Enter CBM IVR VDN"
										/>
								</Col>
							</Row>
							<Row className='align-items-center'>             
								<Col md={2}>Dialer Type<span className='colorRed'></span></Col>
								<Col md={4}>
									<Picky
										value={selectDialorType}
										options={DialorTypeList}
										onChange={this.handleDialorType}
										open={false}
										valueKey="label"
										labelKey="label"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Dialer Type"}
										dropdownHeight={200} 
									/>	
								</Col>
								<Col md={2}> Agent VDN  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="agentVDN"  
										onChange={this.handleChange} value={agentVDN}
										placeholder="Enter Agent VDN "
										/>
								</Col>
							</Row>
							<Row className='align-items-center'>             
								<Col md={2}>SKill Name <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="skillName"  
										onChange={this.handleChange} value={skillName}
										placeholder="Enter Skill Name"
										/>
								</Col>
								<Col md={2}> Queue Limit Length  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="queueLimitLength"  
										onChange={this.handleChange} value={queueLimitLength}
										placeholder="Queue Limit Length"
										/>
								</Col>
							</Row>
							<Row className='align-items-center'>             
								<Col md={2}>Custom Timeout <span className='colorblue'>(Sec)</span> <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="customeTimeout"  
										onChange={this.handleChange} value={customeTimeout}
										placeholder="Enter Custome Timeout"
										/>
								</Col>
								<Col md={2}> CBM Interval Time <span className='colorblue'>(min)</span>  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="cbIntervalTime"  
										onChange={this.handleChange} value={cbIntervalTime}
										placeholder="CBM Interval Time"
										/>
								</Col>
							</Row>
							</>
							:null}

						</div>

						<div className="form_container">
							<Row>
								<Col onClick={this.handleCustomerStatusConfqView}>{customerStatusConfqView ? <i class="fas fa-caret-down fa-lg" /> : <i class="fas fa-caret-right fa-lg"/>}&nbsp;&nbsp;&nbsp;&nbsp;  Customer Status Configuration <span className='colorRed'>*</span></Col>
							</Row>
							{customerStatusConfqView?
							<>
							<Row>
								<br />
							</Row> 
							<Row className='align-items-center'>             
								{/* <Col md={2} >
									<span>Max Tries &nbsp;&nbsp;&nbsp;&nbsp;
									<input type="checkbox" value="" onClick={this.handleCheckDefault} checked={defaultTries}/>
									</span>
									{defaultTries?
									<FormControl  type='text' id="maxRetries"  
										onChange={this.handleChange} value={maxRetries}
										placeholder="Max Retries Count"
										/>
									:null}
								</Col>
								<Col md={1} /> */}
								<Col md={2} >
									<span>Busy &nbsp;&nbsp; <span className='colorblue'>(min)</span> &nbsp;&nbsp;&nbsp;&nbsp;
									<input type="checkbox" value="" onClick={this.handleCheckBusy} checked={busyStatus}/>
									</span>
									{busyStatus?
									<FormControl  type='text' id="busyNoTries"  
										onChange={this.handleChange} value={busyNoTries}
										placeholder="Interval Time (min)"
										/>
									:null}
								</Col>
								<Col md={1} />
								<Col md={2} >
									<span>Not Reached<span className='colorblue'>(min)</span> &nbsp;&nbsp;&nbsp;&nbsp;
									<input type="checkbox" value="" onClick={this.handleCheckNotReached} checked={notReached}/>
									</span>
									{notReached?
									<FormControl  type='text' id="notReachedNoTries"  
										onChange={this.handleChange} value={notReachedNoTries}
										placeholder="Interval Time (min)"
										/>
									:null}
								</Col>
								<Col md={1} />
								<Col md={2} >
									<span>No Response<span className='colorblue'>(min)</span> &nbsp;&nbsp;&nbsp;&nbsp;
									<input type="checkbox" value="" onClick={this.handleCheckNotResponse} checked={noResponse}/>
									</span>
									{noResponse?
									<FormControl  type='text' id="noResponseNoTries"  
										onChange={this.handleChange} value={noResponseNoTries}
										placeholder="Interval Time (min)"
										/>
									:null}
								</Col>
								<Col md={1} />
							</Row>
							<br/>
							<Row className='align-items-center'>
								<Col >
									<input type="checkbox" value="" onClick={this.handleCheckIgnoreAA} checked={ignoreAA} /> 
									&nbsp;&nbsp;Ignore Auto Answer
								</Col>
							</Row>
							</>
							:null}

						</div>
						</>
						:null}
					</>
					:null
					}
					
					
					
					<div className="form_container">
						<Row>
							<Col onClick={this.handleBusinessHRView}>{businessHRView ? <i class="fas fa-caret-down fa-lg" /> : <i class="fas fa-caret-right fa-lg"/>}&nbsp;&nbsp;&nbsp;&nbsp;  Weekdays Configuration (Business Hours)<span className='colorRed'>*</span></Col>
						</Row>
						{businessHRView?
						<>
							<Row>
								<br />
							</Row>
							<Row className='align-items-center'>
									<Col md={2}>Daily Start Time<span className='colorRed'>*</span></Col>
									<Col>
										<Row>
											<Col>
												<Row>
													<label>Sunday <span className='colorRed'><input type="checkbox" onClick={()=>this.handleWeekdaysCheck("Sunday")} checked={this.weekdayChecked("Sunday")}/></span></label> 	
												</Row>
												<Row>
													<Picky
														value={this.selectTimeOption('Sunday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeStart(e,'Sunday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Monday <span className='colorRed'><input type="checkbox" onClick={()=>this.handleWeekdaysCheck("Monday")} checked={this.weekdayChecked("Monday")}/></span></label>	
												</Row>
												<Row>
													<Picky
														value={this.selectTimeOption('Monday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeStart(e,'Monday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Tuesday <span className='colorRed'><input type="checkbox" onClick={()=>this.handleWeekdaysCheck("Tuesday")} checked={this.weekdayChecked("Tuesday")}/></span></label>	
												</Row>
												<Row>
												<Picky
													value={this.selectTimeOption('Tuesday')}
													options={timesList}
													onChange={(e)=>this.handleWeeklyTimeStart(e,'Tuesday')}
													open={false}
													valueKey="label"
													labelKey="label"
													multiple={false}
													keepOpen={false}
													includeFilter={false}
													clearFilterOnClose={true}
													dropdownHeight={200}
													/>
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Wednesday <span className='colorRed'><input type="checkbox" onClick={()=>this.handleWeekdaysCheck("Wednesday")} checked={this.weekdayChecked("Wednesday")}/></span></label>
												</Row>
												<Row>
													<Picky
														value={this.selectTimeOption('Wednesday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeStart(e,'Wednesday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Thursday <span className='colorRed'><input type="checkbox" onClick={()=>this.handleWeekdaysCheck("Thursday")} checked={this.weekdayChecked("Thursday")}/></span></label>
												</Row>
												<Row>
													<Picky
														value={this.selectTimeOption('Thursday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeStart(e,'Thursday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Friday <span className='colorRed'><input type="checkbox" onClick={()=>this.handleWeekdaysCheck("Friday")} checked={this.weekdayChecked("Friday")}/></span></label>	
												</Row>
												<Row>
												<Picky
														value={this.selectTimeOption('Friday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeStart(e,'Friday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Saturday <span className='colorRed'><input type="checkbox" onClick={()=>this.handleWeekdaysCheck("Saturday")} checked={this.weekdayChecked("Saturday")}/></span></label>
												</Row>
												<Row>
												<Picky
														value={this.selectTimeOption('Saturday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeStart(e,'Saturday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>	
												</Row>
											</Col>

										</Row>
									</Col>              
							</Row>

							<Row className='align-items-center'>
									<Col md={2}>Daily End Time<span className='colorRed'>*</span></Col>
									<Col>
										<Row>
											<Col>
												<Row>
													
														
												</Row>
												<Row>
													<Picky
														value={this.selectTimeOptionEnd('Sunday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeEnd(e,'Sunday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>
												</Row>
											</Col>
											<Col>
												<Row>	
												</Row>
												<Row>
													<Picky
														value={this.selectTimeOptionEnd('Monday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeEnd(e,'Monday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>	
												</Row>
												<Row>
												<Picky
													value={this.selectTimeOptionEnd('Tuesday')}
													options={timesList}
													onChange={(e)=>this.handleWeeklyTimeEnd(e,'Tuesday')}
													open={false}
													valueKey="label"
													labelKey="label"
													multiple={false}
													keepOpen={false}
													includeFilter={false}
													clearFilterOnClose={true}
													dropdownHeight={200}
													/>
												</Row>
											</Col>
											<Col>
												<Row>	
												</Row>
												<Row>
													<Picky
														value={this.selectTimeOptionEnd('Wednesday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeEnd(e,'Wednesday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>	
												</Row>
												<Row>
													<Picky
														value={this.selectTimeOptionEnd('Thursday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeEnd(e,'Thursday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>	
												</Row>
												<Row>
												<Picky
														value={this.selectTimeOptionEnd('Friday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeEnd(e,'Friday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>
												</Row>
											</Col>
											<Col>
												<Row>	
												</Row>
												<Row>
												<Picky
														value={this.selectTimeOptionEnd('Saturday')}
														options={timesList}
														onChange={(e)=>this.handleWeeklyTimeEnd(e,'Saturday')}
														open={false}
														valueKey="label"
														labelKey="label"
														multiple={false}
														keepOpen={false}
														includeFilter={false}
														clearFilterOnClose={true}
														dropdownHeight={200}
														/>	
												</Row>
											</Col>

										</Row>
									</Col>              
							</Row>
							
						</> : null }
					</div>
						<Row> <br/> </Row>
						<Row className='align-items-center'>
						<Col><input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>&nbsp;&nbsp;&nbsp;&nbsp;Active  <span className='colorRed'>*</span></Col>
						</Row>
						<Row> <br/> </Row>
						<Row className='align-items-center'>
								<Col>Click <Link to="#" onClick={this.openFtp}>here</Link> for integration detailes<span className='colorRed'>*</span></Col>
						</Row>
						<Row className='align-items-center'>
							<Col md={4}></Col>	
							<Col md={2}> <Button  variant="danger alignRight" onClick={this.props.closeModal}>Close</Button>
							</Col>
							<Col md={2}> <Button  variant="primary alignRight" disabled={!this.validateForm()} onClick={this.handleSubmit}>Update Campaign</Button></Col>
							<Col md={4}></Col>	
						</Row>
				</div>
            </Modal.Body>
            </Modal> } </div>
        )
	
	}
 }

 

 