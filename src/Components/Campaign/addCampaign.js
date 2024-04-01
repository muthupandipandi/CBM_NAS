import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col, InputGroup} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';
import AddContacts from './addContacts'
import MessageShow from '../mesaageShow'
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
import { withWidth } from "@material-ui/core";
 export default class AddCampaign extends Component {
	 constructor(props){
			super(props)
			// console.log(props.dispostionData)
			this.state = {
				timesList: !_.isEmpty(props.action.timesList) ? props.action.timesList : [],
				campaignName: '',
				campaignActive: false,
				schedulerEnabled:false,
				startDate : moment(new Date()).format('YYYY-MM-DD'),
				startTime : {'label':'00:00'},
				endDate : '',
				endTime :  {'label':'00:00'},
				weekDaysTime : [{'day': 'Sunday', 'active': false , 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Monday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Tuesday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Wednesday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Thursday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},{'day': 'Friday', 'active': true, 'startTime':'00:00', 'endTime': '00:00'},
								{'day': 'Saturday', 'active': false, 'startTime':'00:00', 'endTime': '00:00'}],
				callBeforeList : [{'day' : '0 day'},{'day' : '1 day'},{'day' : '2 days'},{'day' : '3 days'},{'day' : '4 days'},{'day' : '5 days'},{'day' : '6 days'},{'day' : '7 days'}],
				callBefore : [],
				maxAdvNotice : '01:00',
				retryDelay : '',
				retryCount : '',
				concurrentCall : [],
				ftpLocation : '',
				ftpUsername : '',
				ftpPassword : '',
				ftpFileName : '',
				tempHr : '',
				tempMin : '',
				tempHrD : '',
				tempMinD : '',
				tempStartDate : new Date(),
				tempEndDate : '',
				ftpView : false,
				saveMessage:false,

				selectedCampaign : [],
				campaignType : [{'id' : 2 , 'label' : 'IVR based CBM'}],


				selectCampaign : [],
				CampaignDailingMode : [{'id' : 6, 'label' : 'Progressive'},
									//    {'id' : 7, 'label' : 'Predictive'},
									//    {'id' : 8, 'label' : 'Power'},
									//    {'id' : 9, 'label' : 'Preview'},
									//    {'id' : 10, 'label' : 'manual'}
									],
				 selectCampaignQueue : [],
				 campaignAssignQueue : [
					{'id' : 15, 'label' : 'nas-neuro' },
					{'id' : 11, 'label' : 'Post Due' },
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

				selectDispositionList : [],
				selectDNCList:[],
				disPositionList : props.dispostionData,
				dncList : props.dncData,
				ewt : '',
				cbmIVRIncomeNO : '',
				clearMessage:false,
				language : '',
				agentVDN : '',
				skillName : '',
				queueLimitLength : '',
				customeTimeout : '',
				cbIntervalTime : '',
				selectDialorType : [],
				DialorTypeList : [{'label' :  'Preview'}],

				busyStatus : false,
				busyNoTries : '',
				notReached : false,
				notReachedNoTries : '',
				noResponse : false,
				noResponseNoTries : '',
				defaultTries : true,
				maxRetries : '',
				ignoreAA : false,

				businessHRView: false,
				reminderView: true,
				callBackConfqView : false,
				customerStatusConfqView : false,

				};
	 }

	 handleCallBack = () =>{
		// this.props.onCallBack(this.state)
		 this.props.closeModal()
	   }

	   handleChange = (event) => {
		if (parseInt(event.target.maxLength)>=event.target.value.length){
		   this.setState({
		   [event.target.id]: event.target.value
		   });
		}
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

	   isValidPassword = (password) =>{
		if(!_.isEmpty(password)){
		 if(password.length>6){
		   return true
		 } else {
		   return false
		 }
		 }
	   }
	   dispostionDatas = () => {

		let skillData = _.cloneDeep(this.props.dispostionData)


		return skillData
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
				[event.target.id]: ''
			});
		}
	}
	}
	dncDatas = () => {

		let skillData = _.cloneDeep(this.props.dncData)


		return skillData
	}
	   validateForm() {
		const {campaignName,campaignActive,schedulerEnabled,startDate,startTime,endDate,endTime,weekDaysTime,maxAdvNotice,retryDelay,retryCount,concurrentCall,
		ftpLocation, ftpUsername, ftpPassword, ftpFileName, callBefore,selectDispositionList,selectDNCList,selectCampaign,selectCampaignQueue ,selectedCampaign } = this.state
		const {campaignStatus} = this.props.action
// console.log(campaignName , campaignName.length > 0 , startDate , startDate.length > 0 , startTime ,  !_.isEmpty(startTime),
// endDate , endDate.length > 0 , endTime , !_.isEmpty(endTime) , !_.isEmpty(weekDaysTime), callBefore , !_.isEmpty(callBefore)
// ,
// retryDelay , retryCount , campaignStatus === true , campaignActive , schedulerEnabled , selectDNCList , selectDispositionList , selectCampaign , selectCampaignQueue ,concurrentCall , selectedCampaign)

		   if(campaignName && campaignName.length > 0 && startDate && startDate.length > 0 && startTime &&  !_.isEmpty(startTime)&&
			 endDate && endDate.length > 0 && endTime && !_.isEmpty(endTime) && !_.isEmpty(weekDaysTime)&& callBefore && !_.isEmpty(callBefore)
			 &&
			 retryDelay && retryCount && campaignStatus === true  && selectDNCList && selectDispositionList && selectCampaign && selectCampaignQueue &&concurrentCall && selectedCampaign)
			{
				// console.log('inn')
				if(callBefore.day.split(' ')[0] === '0')  {
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

	   handleScheduler=()=>{
		this.setState({schedulerEnabled : !this.state.schedulerEnabled})
	}

	   handleChangeStart=(e)=>{
		const date = moment(e, 'YYYY-MM-DD', true);
		// console.log(date.isValid())
		if (date.isValid()) {
			const dates = moment(e).format('YYYY-MM-DD');
		this.setState({startDate: dates});
		this.setState({tempStartDate: e});}
	   }
	   handleChangeEnd=(e)=>{
		const dates = moment(e, 'YYYY-MM-DD', true);
		if (dates.isValid()) {
		const date = moment(e).format('YYYY-MM-DD');
		this.setState({endDate: date});
		this.setState({tempEndDate: new Date(date)});
		this.setState({endTime:this.state.startTime})
		}
	   }
	   handleChangeStartTime=(e)=>{
		// console.log(e)
		// console.log(this.state.endTime)
		let time = e.hour+":"+e.minute+" "+e.meridiem
		// if (this.state.startDate==this.state.endDate){
		if(e['label']>this.state.endTime['label']){
			this.setState({endTime:e})
		}
	
		this.setState({startTime: e});
	   }
	   handleChangeEndTime=(e)=>{
		let time = e.hour+":"+e.minute+" "+e.meridiem
		if (this.state.startDate==this.state.endDate){
		if(e['label']>=this.state.startTime['label']){
		this.setState({endTime: e});
	}}
	else{
		this.setState({endTime: e});
	}
	   }
	   handleChangeDayBefore=(e)=>{
		this.setState({callBefore: e});
	   }
	   handleMaxHrChange = (e) => {
		const { value } = e.target;
		const onlyNumbers = /^[0-9]*$/; // Regular expression to allow only numbers
		if (parseInt(e.target.maxLength)>=e.target.value.length){
		if (onlyNumbers.test(value) || value === '') {
		const {tempMin} = this.state
		let val = e.target.value+":"+tempMin
		this.setState({tempHr:e.target.value})
		this.setState({maxAdvNotice:val})

		}
	}
	   }
	   handleMaxValueChange = (e) => {
		const { value } = e.target;
		const onlyNumbers = /^[0-9]*$/; // Regular expression to allow only numbers
		if(59>=e.target.value){
		if (parseInt(e.target.maxLength)>=e.target.value.length){
		if (onlyNumbers.test(value) || value === '') {
		   const {tempHr} = this.state
		   let val = tempHr+":"+e.target.value
		   this.setState({tempMin:e.target.value})
		   this.setState({maxAdvNotice:val})

	   }
	}
}}

	   handleRetryHrChange = (e) => {
		const { value } = e.target;
		const onlyNumbers = /^[0-9]*$/; // Regular expression to allow only numbers
		if (parseInt(e.target.maxLength)>=e.target.value.length){
		if (onlyNumbers.test(value) || value === '') {
		const {tempMinD} = this.state
		let val = toInteger(e.target.value)*60 + toInteger(tempMinD)
		this.setState({tempHrD:e.target.value})
		this.setState({retryDelay:val})
		}}
	   }
	   handleRetryValueChange = (e) => {
		const { value } = e.target;
		const onlyNumbers = /^[0-9]*$/; // Regular expression to allow only numbers
		if(59>=e.target.value){
		if (parseInt(e.target.maxLength)>=e.target.value.length){
		if (onlyNumbers.test(value) || value === '') {
		   const {tempHrD} = this.state
		   let val = (toInteger(tempHrD)*60)+toInteger(e.target.value)
		   this.setState({tempMinD:e.target.value})
		   this.setState({retryDelay:val})
		}}
	}

	   }

	   weekdayChecked=(obj)=>{
		const {weekDaysTime} = this.state
		const val = _.find(weekDaysTime, {'day':obj })
		const check = val.active;
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
		   const ret = [{'label':val.startTime}];
		   return ret
	   }
	   selectTimeOptionEnd=(obj)=>{
		const {weekDaysTime} = this.state
		const val = _.find(weekDaysTime, {'day':obj })
		const ret = [{'label':val.endTime}];
		return ret
		}

	   handleWeeklyTimeStart=(e,obj)=>{

		   const {weekDaysTime} = this.state
		   let value = weekDaysTime
		   _.map(value,(val,i)=>{
			   if(val.day === obj){
				if (val.endTime>e.label){
				   val.startTime = e.label}
				   else{
					val.startTime = e.label
				   val.endTime = e.label
			   }
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
				console.log(typeof(e.label),typeof(val.startTime))
				if (e.label>val.startTime){
				val.endTime = e.label}
			}
		})
		this.setState({weekDaysTime:value})
		}

		openFtp=()=>{
			//alert("OpenFTP")
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
		   const{campaignName,campaignActive,schedulerEnabled,startDate,startTime,endDate,endTime,weekDaysTime,maxAdvNotice,retryDelay,retryCount,concurrentCall,
				ftpLocation, ftpUsername, ftpPassword, ftpFileName, callBefore, callBeforeList,selectDispositionList,selectDNCList,selectCampaignQueue,selectCampaign } = this.state;
		   let obj={
			   "campaignName" : campaignName,
			   "campaignActive" : campaignActive,
			   "schedulerEnabled": schedulerEnabled,
			   "startDate" : startDate,
			   "startTime" : startTime.label+":00",
			   "endDate" : endDate,
			   "endTime" : endTime.label+":00",
			   "weekDaysTime": weekDaysTime,
			   "callBefore" : callBefore.day.split(' ')[0],
			   "maxAdvNotice" : maxAdvNotice+":00",
			   "retryDelay" : retryDelay,
			   "retryCount": retryCount,
			   "concurrentCall" : concurrentCall?concurrentCall['id']:'',
			   "ftpLocation" :	ftpLocation,
			   "ftpUsername" :	ftpUsername,
			   "ftpPassword" :	ftpPassword,
			   "fileName" : ftpFileName,
			   "createdBy" : loggedinData.userName,
			   "updatedBy " : loggedinData.userName,
			   "userGroup":window.localStorage.getItem('userGroup'),
			   "dispositionID":selectDispositionList?selectDispositionList['dispId']:'',
			   "dncId":selectDNCList?selectDNCList['dncid']:'',
			   'queue':selectCampaignQueue?selectCampaignQueue['label']:'',
			   "dailingMode":selectCampaign?selectCampaign['label']:''


		   }
		   //console.log("Ad Campaign",obj)
		   this.props.action.addnewCampaign(obj)
		   this.props.closeModal()
	   }

	   handleChangeCampaignType = (e) => {
		this.setState({selectedCampaign : e})
	   }
	   handleChangeconcurrent = (e) => {
		this.setState({concurrentCall : e})
	   }

	   handleChangeCampaignDailingMode = (e) => {
		this.setState({selectCampaign : e})
	   }

	   handleChangeCampaignAssignQueue = (e) => {
		this.setState({selectCampaignQueue : e})
	   }

	   handleSelectDispositionList = (e) => {
		this.setState({selectDispositionList : e})
	   }
	   handleSelectDNCList = (e) => {
		this.setState({selectDNCList : e})
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
	   handleSecChange = (event) => {
		const { value } = event.target;
		const onlyNumbers = /^[0-9]*$/; // Regular expression to allow only numbers

		if (parseInt(event.target.maxLength)>=event.target.value.length){
		if (onlyNumbers.test(value) || value === '') {
		let { value } = event.target;

		// Ensure the value is within the allowed range
		 if (value > 5) {
			value = 5;
		}
		// Update the state with the sanitized value
		console.log(event.target.id)
		this.setState({ [event.target.id]: value });
	}
}
	}

	openClearMessage = () => {
		console.log('thiiii')
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

	render(){
		const {isOpen,isPending,showMessage,message} = this.props
		const campaignStatus = _.cloneDeep(this.props.action.campaignStatus)

		// console.log("creat state", this.state)
		// console.log("creat props", this.props)

		const {campaignName,campaignActive,schedulerEnabled,startDate,startTime,endDate,endTime,weekDaysTime,maxAdvNotice,retryDelay,retryCount,concurrentCall,
			tempHr,tempMin,tempHrD,tempMinD,tempStartDate,tempEndDate,ftpView,ftpLocation,ftpUsername,ftpPassword,ftpFileName,callBefore, callBeforeList,
			businessHRView,reminderView,callBackConfqView,customerStatusConfqView,ewt,cbmIVRIncomeNO,language,agentVDN,skillName,queueLimitLength,customeTimeout,cbIntervalTime,selectDialorType,DialorTypeList,selectCampaign,
			CampaignDailingMode,selectCampaignQueue,campaignAssignQueue,selectDispositionList,disPositionList,saveMessage,busyStatus,busyNoTries,notReached,notReachedNoTries,noResponse,noResponseNoTries,defaultTries,maxRetries, selectedCampaign,campaignType,ignoreAA,clearMessage  } = this.state;
		const {timesList} = this.props.action


	return(
		<div>
			{/* {isPending ? <span className='spinner alignRight'>
			Loading... <Spinner animation="grow" role="status" size='lg'/>
				</span> : null} */}
			{(showMessage === true) ?
			<ShowModalLogin message={message} falseShowModalPopUp={this.props.CampaignEditErrorClose}/> : null}
			{(ftpView === true) ?
				<AddContacts action={this.props.action} ftpL={ftpLocation}  ftpU={ftpUsername} ftpP={ftpPassword} handleBack={this.addValue}  closeModal={this.closeFtp} /> : null}
			<div>
				<br/>
				<div >
					<span className='alignLeft'>ADD CAMPAIGN </span>
					<span className='alignRight colorRed'> * Indicates Required Field</span>
				</div>
				<div><br/><br/></div>
				<div className='addCampaign'>
					<div className="form_container">

						<Row className='align-items-center'>
								<Col md={2}>{reminderView ? <i class="fas fa-caret-down fa-lg" onClick={this.handleReminderView} /> : <i class="fas fa-caret-right fa-lg" onClick={this.handleReminderView}/> } &nbsp;&nbsp;&nbsp;&nbsp; Campaign Name  <span className='colorRed'>*</span></Col>
								<Col md={4} ><FormControl style={{width:'99%',height:'38px'}} maxLength={30} type='text' id="campaignName"
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
										// showMonthDropdown
										startDate={tempStartDate}
										endDate={tempEndDate}
										onChange={this.handleChangeStart}
										dateFormat="dd-MM-yyyy"
										minDate={new Date()}
										placeholderText="Start Date"
										maxDate={tempEndDate}

									/>
								</Col>
								<Col md={1}>
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
								<Col md={1}></Col>
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
										placeholderText="End Date"
										className='myDatePicker'
									/>
								</Col>
								<Col md={1}>
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
								<Col md={1}></Col>
</Row>
<Row className='align-items-center'>


								<Col md={2}>Dailing Mode<span className="colorRed">*</span></Col>
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



								<Col md={2}>Disposition<span className="colorRed">*</span></Col>
								<Col md={4}>
									<Picky
									     value={this.state.selectDispositionList}
										 options={this.dispostionDatas()}
										 onChange={this.handleSelectDispositionList}
										 open={false}
										 valueKey="dispositionName"
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
</Row>
<Row className='align-items-center'>

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
									     value={this.state.selectDNCList}
										 options={this.dncDatas()}
										 onChange={this.handleSelectDNCList}
										 open={false}
										 valueKey="dncName"
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
								<Col md={4} ><FormControl  type='text' id="language"  maxLength={20}
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
								<Col md={4}>
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
								{/* <FormControl  type='number' id="concurrentCall"
											onChange={this.handleChange} value={concurrentCall}
											placeholder="concurrent List"/> */}
								</Col>

						</Row>
						{/* <Row>
							<br></br>
						</Row> */}

							<Row className='align-items-center'>
							{ _.toString(callBefore.day).split(' ')[0] === '0' ?
							<>
								<Col md={2}>Max.Adv Notice<span className='colorRed'>*</span></Col>
								<Col md={4}>
									<Row>
										<Col md={1}>
											hr<span className='colorblue'>*</span>
										</Col>
										<Col md={3}>
										<FormControl  type='text' id="maxAHr" maxLength={5}
											onChange={this.handleMaxHrChange} value={tempHr}
											placeholder="hr"/>
										</Col>
										<Col md={1}>
											min<span className='colorblue'>*</span>
										</Col>
										<Col md={3}>
										<FormControl  type='text' id="maxAdvMin" maxLength={2}
											onChange={this.handleMaxValueChange} value={tempMin}
											placeholder="minute"/>
										</Col>
										<Col md={3}></Col>
									</Row>
								</Col>
								</> : null }



								<Col md={2}>Retry Delay<span className='colorRed'>*</span></Col>
								<Col md={4}>
									<Row>
										<Col md={1}>
											hr<span className='colorblue'>*</span>
										</Col>
										<Col md={3}>
										<FormControl  type='text' id="maxAHr" maxLength={5}
											onChange={this.handleRetryHrChange} value={tempHrD}
											placeholder="hr"/>
										</Col>
										<Col md={1}>
											min<span className='colorblue'>*</span>
										</Col>
										<Col md={3}>
										<FormControl  type='text' id="maxAdvMin" maxLength={2}
											onChange={this.handleRetryValueChange} value={tempMinD}
											placeholder="minute"/>
										</Col>
										<Col md={3}></Col>
									</Row>
								</Col>
								<Col md={2}>Retry Count<span className='colorRed'>*</span></Col>
								<Col md={4}>
								<FormControl style={{width:'99%',height:'38px'}} type='text' maxLength={1} id="retryCount"
											onChange={this.handleSecChange} value={retryCount}
											placeholder="Enter Retry Count"

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
									<span>Not Reached &nbsp;&nbsp; <span className='colorblue'>(min)</span> &nbsp;&nbsp;&nbsp;&nbsp;
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
									<span>No Response &nbsp;&nbsp; <span className='colorblue'>(min)</span> &nbsp;&nbsp;&nbsp;&nbsp;
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
									<Col md={10}>
										<Row>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[0]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[1]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
													disabled={weekDaysTime[2]['active']==false}
													/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[3]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[4]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[5]['active']==false}
														/>
												</Row>
											</Col>
											<Col  md={1}>
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
														disabled={weekDaysTime[6]['active']==false}
														/>
												</Row>
											</Col>

										</Row>
									</Col>
							</Row>

							<Row className='align-items-center'>
									<Col md={2}>Daily End Time<span className='colorRed'>*</span></Col>
									<Col md={10}>
										<Row>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[0]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[1]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
													disabled={weekDaysTime[2]['active']==false}
													/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[3]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[4]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[5]['active']==false}
														/>
												</Row>
											</Col>
											<Col style={{marginRight:'30px'}} md={1}>
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
														disabled={weekDaysTime[6]['active']==false}
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
							<Col><input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>&nbsp;&nbsp;&nbsp;&nbsp;Active </Col>
							<Col><input type="checkbox" value="" onClick={this.handleScheduler} checked={schedulerEnabled}/>&nbsp;&nbsp;&nbsp;&nbsp;Enable Scheduler</Col>
							</Row>
							<Row> <br/> </Row>
							<Row className='align-items-center'>
									<Col>Click <Link to="#" onClick={this.openFtp}>here</Link> for integration detailes<span className='colorRed'>*</span></Col>
							</Row>
						<Row className='align-items-center'>
							<Col md={4}></Col>
							<Col md={2}> <Button  variant="danger alignRight" onClick={this.openClearMessage}>Close</Button>
							</Col>
							<Col md={2}> <Button  variant="primary alignRight" style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} disabled={!this.validateForm()} onClick={this.openSaveClearMessage}>Add Campaign</Button></Col>
							<Col md={4}></Col>
						</Row>
					</div>
					{clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Create this Campaign?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.handleSubmit} />
	  	  :null}
			</div>
        </div>
		)
	}
 }



