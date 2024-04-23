import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col, InputGroup} from 'react-bootstrap';
import {Picky} from 'react-picky';
import 'react-picky/dist/picky.css'; 
import ViewContacts from './viewContacts'
import DatePicker from "react-datepicker";
import { Link, Switch  } from "react-router-dom";
import Select from 'react-dropdown-select';
import MessageShow from '../mesaageShow'

import _, { toInteger } from 'lodash';
 export default class ViewCampaign extends Component {
     constructor(props){
			super(props)
			this.modalRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
			this.state = {
				timesList: !_.isEmpty(props.action.timesList) ? props.action.timesList : [],
				campaignName: props.edit.campaignName ? props.edit.campaignName : '',
				campaignActive: props.edit.campaignActive=='true' ? true : false,
				schedulerEnabled:props.edit.schedulerEnabled? props.edit.schedulerEnabled : '',
				startDate : props.edit.startDate ? props.edit.startDate : '',
				startTime : props.edit.startTime? props.edit.startTime : '00:00',
				endDate : props.edit.endDate? props.edit.endDate : '',
				endTime : props.edit.endTime? props.edit.endTime : '00:00',
				weekDaysTime : props.edit.weekDaysTime? props.edit.weekDaysTime : [{'day': 'Sunday', 'active': false , 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Monday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Tuesday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Wednesday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Thursday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Friday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Saturday', 'active': false, 'startTime':'00:00', 'endTime': '00:00'}],
								callBeforeList : [{'day' : '0 day'},{'day' : '1 day'},{'day' : '2 days'},{'day' : '3 days'},{'day' : '4 days'},{'day' : '5 days'},{'day' : '6 days'},{'day' : '7 days'}],
				maxAdvNotice : props.edit.maxAdvNotice? props.edit.maxAdvNotice : '',
				callBefore : props.edit.callBefore? props.edit.callBefore+" day" : '',
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
				clearMessage:false,
				selectCampaign : props.edit.dailingMode? props.edit.dailingMode: '',  
				CampaignDailingMode : [{'id' : 6, 'label' : 'Progressive'},
									//    {'id' : 7, 'label' : 'Predictive'},
									//    {'id' : 8, 'label' : 'Power'},
									//    {'id' : 9, 'label' : 'Preview'},
									//    {'id' : 10, 'label' : 'manual'}
									],
				 selectCampaignQueue : props.edit.queue? props.edit.queue: '' ,
				 campaignAssignQueue : [
					{'id' : 15, 'label' : 'nas-neuro' },
					{'id' : 11, 'label' : 'Post-Overdue' },
										],

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
				selectedGroup:[],
				
				
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

	   dispostionDatas = () => {
		
		let skillData = _.cloneDeep(this.props.dispostionData)
		
		
		return skillData
	}
	dncDatas = () => {
		
		let skillData = _.cloneDeep(this.props.dncData)
		
		
		return skillData
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

		openFtp=()=>{
			this.setState({ftpView : true})
		}
		closeFtp= () => {
			this.setState({ftpView : false})
		}
		userGroup = () => {
		
			let groupsData = _.cloneDeep(this.props.groupsData)
			
			return groupsData
		}
		handleBusinessHRView = () => {
			this.setState({businessHRView : !this.state.businessHRView})
		}
		handleSelectGroup = (e) => {
			console.log(e)
			this.setState({ selectedGroup: e[0]['groupName'] })
			// this.setState({ roleBaseSet: e[0]['rolesName'] })
			// this.setState({selctRoleOpenView:false})
		}
		getSelectedDNCName() {
		
			const selectedDNC = this.dncDatas().find(dnc => dnc.dncid === this.state.selectDNCList);
			return selectedDNC ? selectedDNC.dncName : ""; // Return the name of the selected DNC list, or an empty string if not found
		}
		getSelectedDispositionList() {
			
			const selectDisposition = this.dispostionDatas().find(dnc => dnc.dispId === this.state.selectDispositionList);
			return selectDisposition ? selectDisposition.dispositionName : ""; // Return the name of the selected DNC list, or an empty string if not found
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
		openClearMessage = () => {
		
			this.setState({clearMessage : true})
		  }
	
		  closeClearMessage = () => {
			this.setState({clearMessage : false})
		  }
	
	 render(){
		const {isOpen,isPending,showMessage,message} = this.props
		const empStatus = _.cloneDeep(this.props.action.employeeIdStatus) 
		// console.log("this state", this.state)
		// console.log("this props", this.props)
		const {campaignName,campaignActive,startDate,startTime,schedulerEnabled,endDate,endTime,weekDaysTime,maxAdvNotice,retryDelay,retryCount,concurrentCall,
			tempHr,tempMin,tempHrD,tempMinD,tempStartDate,tempEndDate,ftpView,ftpLocation,ftpUsername,ftpPassword, ftpFileName, callBefore,callBeforeList,
			businessHRView,reminderView,callBackConfqView,customerStatusConfqView,ewt,cbmIVRIncomeNO,language,agentVDN,skillName,queueLimitLength,customeTimeout,cbIntervalTime,selectDialorType,DialorTypeList,
			busyStatus,busyNoTries,notReached,notReachedNoTries,clearMessage,noResponse,noResponseNoTries,defaultTries,maxRetries, selectedCampaign,campaignType,ignoreAA,selectCampaign,CampaignDailingMode,selectCampaignQueue,campaignAssignQueue  } = this.state;	
		const {timesList} = this.props.action	
		
	
		return(
			<div>
			{(ftpView === true) ?  
				<ViewContacts action={this.props.action} ftpL={ftpLocation} ftpF={ftpFileName} ftpU={ftpUsername} ftpP={ftpPassword} handleBack={this.addValue}  closeModal={this.closeFtp} /> : 
				
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
                View Campaign
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
			<div className='addCampaign'>
					<div className="form_container">

						<Row className='align-items-center'>             
								<Col md={2}>{reminderView ? <i class="fas fa-caret-down fa-lg" onClick={this.handleReminderView} /> : <i class="fas fa-caret-right fa-lg" onClick={this.handleReminderView}/> } &nbsp;&nbsp;&nbsp;&nbsp; Campaign Name  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="campaignName"  
										value={campaignName}
										placeholder="Enter Campaign Name"
										onBlur={this.checkCampaignStatus} disabled={true}
										/>
								</Col>

								<Col md={2}>Campaign Type<span className='colorRed'></span></Col>
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
										disabled={true}
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
							<Col md={2}>Schedule Date-Time<span className='colorRed'>*</span></Col>
							<Col md={2}> 
								<DatePicker
									selected={tempStartDate}
									className='myDatePicker'
									selectsStart
									showMonthDropdown
									startDate={tempStartDate}
									endDate={tempEndDate}
									dateFormat="dd-MM-yyyy"  
									placeholderText={startDate.toString()}       
									disabled={true}   
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
								open={false}
								valueKey="label"
								labelKey="label"
								multiple={false}
								keepOpen={false}
								includeFilter={false}
								clearFilterOnClose={true}
								placeholder="Start Time"
								dropdownHeight={200}
								disabled={true}
							/>
							</Col>
							<Col md={2}>Schedule End Date-Time<span className='colorRed'>*</span></Col>
							<Col md={2}>

								<DatePicker
									selected={tempEndDate}
									selectsEnd
									startDate={tempStartDate}
									endDate={tempEndDate}
									minDate={tempStartDate}
									dateFormat="dd-MM-yyyy" 
									placeholderText={endDate.toString()}
									disabled={true}
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
								disabled={true}
							/>
							</Col>                
						</Row>
						<Row className='align-items-center'>
						<Col md={2}>DailingMode<span className="colorRed"></span></Col>
								<Col md={4}>
									<Picky
									     value={selectCampaign}
										 options={CampaignDailingMode}
										 
										 open={false}
										 valueKey="label"
										 labelKey="label"
										 multiple={false}
										 keepOpen={false}
										 includeFilter={false}
										 clearFilterOnClose={true}
										 placeholder={"Select Campaign Dailing Mode"}
										 dropdownHeight={200} 
										 disabled={true}
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
										 
										 open={false}
										 valueKey="dispositionName"
										 labelKey="dispositionName"
										 multiple={false}
										 keepOpen={false}
										 includeFilter={false}
										 clearFilterOnClose={true}
										 placeholder={"Select Disposition List"}
										 dropdownHeight={200} 
										 disabled={true}
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
								<Col md={2}>Assign Queue<span className='colorRed'></span></Col>
								<Col md={4}>
									<Picky
										value={selectCampaignQueue}
										options={campaignAssignQueue}
										
										open={false}
										valueKey="label"
										labelKey="label"
										multiple={false}
										keepOpen={false}
										includeFilter={false}
										clearFilterOnClose={true}
										placeholder={"Select Assign Queue"}
										dropdownHeight={200} 
										disabled={true}
									/>	
								</Col>   
								<Col md={2}>DNC<span className='colorRed'></span></Col>
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
										 
										 open={false}
										 valueKey="dncName"
										 labelKey="dncName"
										 multiple={false}
										 keepOpen={false}
										 includeFilter={false}
										 clearFilterOnClose={true}
										 placeholder={"Select DNC List"}
										 dropdownHeight={200} 
										 disabled={true}
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
								<Col md={4} ><FormControl  type='text' id="language"  
										 value={language}
										placeholder="Enter Language" disabled={true}
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
											disabled={true}
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
										disabled={true}
									/>	               
								</Col>
								</>
							}

								<Col md={2}>Concurrent Calls<span className='colorRed'></span></Col>
								<Col >                   
								<FormControl  type='number' id="concurrentCall"  disabled={true}
											value={concurrentCall} 
											placeholder="concurrent List"/>
								</Col>

						</Row> 
						{/* <Row>
							<br></br>
						</Row> */}
						{ _.toString(callBefore.day).split(' ')[0] === '0' ?
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
											 value={tempHr} disabled={true}
											placeholder="hr"/>
										</Col>
										<Col md={1}>
											min<span className='colorblue'>*</span>
										</Col>
										<Col md={4}>
										<FormControl  type='number' id="maxAdvMin" min="0" max="59"
											 value={tempMin} disabled={true}
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
											value={tempHrD} disabled={true}
											placeholder="hr"/>
										</Col>
										<Col md={1}>
											min<span className='colorblue'>*</span>
										</Col>
										<Col md={4}>
										<FormControl  type='number' id="maxAdvMin" min="0" max="59"
											 value={tempMinD} disabled={true}
											placeholder="minute"/>
										</Col>
										<Col md={3}></Col>
									</Row>	               
								</Col>
								<Col md={2}>Retry Count<span className='colorRed'>*</span></Col>
								<Col>
								<FormControl  type='text' id="retryCount"  
											 value={retryCount} disabled={true}
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
										 value={ewt}
										placeholder="Enter EWT Time"
										/>
								</Col>
								<Col md={2}> CBM IVR VDN  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="cbmIVRIncomeNO"  
										value={cbmIVRIncomeNO}
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
										disabled={true}
									/>	
								</Col>
								<Col md={2}> Agent VDN  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="agentVDN"  
										value={agentVDN}
										placeholder="Enter Agent VDN "
										/>
								</Col>
							</Row>
							<Row className='align-items-center'>             
								<Col md={2}>SKill Name <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="skillName"  
										 value={skillName}
										placeholder="Enter Skill Name"
										/>
								</Col>
								<Col md={2}> Queue Limit Length  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="queueLimitLength"  
										 value={queueLimitLength}
										placeholder="Queue Limit Length"
										/>
								</Col>
							</Row>
							<Row className='align-items-center'>             
								<Col md={2}>Custom Timeout <span className='colorblue'>(Sec)</span> <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="customeTimeout"  
										 value={customeTimeout}
										placeholder="Enter Custome Timeout"
										/>
								</Col>
								<Col md={2}> CBM Interval Time <span className='colorblue'>(min)</span>  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl  type='text' id="cbIntervalTime"  
										 value={cbIntervalTime}
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
									<input disabled={true} type="checkbox" value="" checked={defaultTries}/>
									</span>
									{defaultTries?
									<FormControl  type='text' id="maxRetries"  
										 value={maxRetries}
										placeholder="Max Retries Count"
										/>
									:null}
								</Col>
								<Col md={1} /> */}
								<Col md={2} >
									<span>Busy &nbsp;&nbsp; <span className='colorblue'>(min)</span> &nbsp;&nbsp;&nbsp;&nbsp;
									<input disabled={true} type="checkbox" value=""  checked={busyStatus}/>
									</span>
									{busyStatus?
									<FormControl  type='text' id="busyNoTries"  
										value={busyNoTries}
										placeholder="Interval Time (min)"
										/>
									:null}
								</Col>
								<Col md={1} />
								<Col md={2} >
									<span>Not Reached<span className='colorblue'>(min)</span> &nbsp;&nbsp;&nbsp;&nbsp;
									<input disabled={true} type="checkbox" value="" onClick={this.handleCheckNotReached} checked={notReached}/>
									</span>
									{notReached?
									<FormControl  type='text' id="notReachedNoTries"  
										value={notReachedNoTries}
										placeholder="Interval Time (min)"
										/>
									:null}
								</Col>
								<Col md={1} />
								<Col md={2} >
									<span>No Response<span className='colorblue'>(min)</span> &nbsp;&nbsp;&nbsp;&nbsp;
									<input disabled={true} type="checkbox" value="" onClick={this.handleCheckNotResponse} checked={noResponse}/>
									</span>
									{noResponse?
									<FormControl  type='text' id="noResponseNoTries"  
										value={noResponseNoTries}
										placeholder="Interval Time (min)"
										/>
									:null}
								</Col>
								<Col md={1} />
							</Row>
							<br/>
							<Row className='align-items-center'>
								<Col >
									<input disabled={true} type="checkbox" value="" checked={ignoreAA} /> 
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
													<label>Sunday <span className='colorRed'><input disabled={true} type="checkbox" onClick={()=>this.handleWeekdaysCheck("Sunday")} checked={this.weekdayChecked("Sunday")}/></span></label> 	
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
														disabled={true}
														/>
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Monday <span className='colorRed'><input disabled={true} type="checkbox" onClick={()=>this.handleWeekdaysCheck("Monday")} checked={this.weekdayChecked("Monday")}/></span></label>	
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
														disabled={true}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Tuesday <span className='colorRed'><input disabled={true} type="checkbox" onClick={()=>this.handleWeekdaysCheck("Tuesday")} checked={this.weekdayChecked("Tuesday")}/></span></label>	
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
													disabled={true}
													/>
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Wednesday <span className='colorRed'><input disabled={true} type="checkbox" onClick={()=>this.handleWeekdaysCheck("Wednesday")} checked={this.weekdayChecked("Wednesday")}/></span></label>
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
														disabled={true}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Thursday <span className='colorRed'><input disabled={true} type="checkbox" onClick={()=>this.handleWeekdaysCheck("Thursday")} checked={this.weekdayChecked("Thursday")}/></span></label>
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
														disabled={true}
														/>	
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Friday <span className='colorRed'><input disabled={true} type="checkbox" onClick={()=>this.handleWeekdaysCheck("Friday")} checked={this.weekdayChecked("Friday")}/></span></label>	
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
														disabled={true}
														/>
												</Row>
											</Col>
											<Col>
												<Row>
													<label>Saturday <span className='colorRed'><input disabled={true} type="checkbox" onClick={()=>this.handleWeekdaysCheck("Saturday")} checked={this.weekdayChecked("Saturday")}/></span></label>
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
														disabled={true}
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
														disabled={true}
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
														disabled={true}
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
													disabled={true}
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
														disabled={true}
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
														disabled={true}
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
														disabled={true}
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
														disabled={true}
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
							<Col><input disabled={true} type="checkbox" value="" checked={campaignActive}/>&nbsp;&nbsp;&nbsp;&nbsp;Active  <span className='colorRed'>*</span></Col>
							<Col><input type="checkbox" value="" onClick={this.handleScheduler} checked={schedulerEnabled}/>&nbsp;&nbsp;&nbsp;&nbsp;Enable Scheduler</Col>
							</Row>
							<Row> <br/> </Row>
							<Row className='align-items-center'>
									<Col>Click <Link to="#" onClick={this.openFtp}>here</Link> for integration detailes<span className='colorRed'>*</span></Col>
							</Row>
						<Row className='align-items-center'>
						<Col md={4}></Col>	
						<Col md={2}> <Button  variant="danger alignRight" onClick={this.props.closeModal}>Close</Button>
						</Col>
						<Col md={2}> </Col>
						<Col md={4}></Col>	
						</Row>
						{/* {clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null} */}
				</div>
            </Modal.Body>
            </Modal> } </div>
        )
	
	}
 }



 