import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTooltip, MDBInput, MDBNotification} from 'mdbreact';
import _ from 'lodash';
import {Table, Pagination, Spinner, Button,Tabs, Tab} from 'react-bootstrap';
import EditCampaign from './editCampaign';
import AddCampaign from './addCampaign';
import ViewCampaign from './viewCampaign';
import UploadContacts from './uploadContacts'
import ShowModalLogin from '../showModalLogin';
import moment from "moment";
export default class campaignManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage:1,
      Per_Page:10,
      searchval:'',
      orderBy:'asc',
      userData:props.userData,
      campignRuningStaus:'Start',
      loggedinData:this.props.loggedinData
    }
  }

  componentDidMount(){
    this.props.CampaignLoad()
    this.props.DNCLoad()
    this.props.DispostionLoad()
    let log_da=window.localStorage.getItem('userData')
    console.log(this.state.loggedinData)
    if (Object.entries(this.state.loggedinData).length === 0) {
      console.log(log_da)
    this.setState({loggedinData:log_da?JSON.parse(log_da):{}})
    }
  }
 startviewCampaign=(index,id)=>{
  
			// const obj = {'campaignId': id}
			this.props.startRunCampaignStatus(id)

 }
 stopviewCampaign=(index,id)=>{
  // const obj = {'campaignId': id}
			this.props.stopRunCampaignStatus(id)

 }
 resumetviewCampaign=(index,id)=>{
  // const obj = {'campaignId': id}
			this.props.resumeRunCampaignStatus(id)

 }
 pauseviewCampaign=(index,id)=>{
  const obj = {'campaignId': id}
			this.props.pauseRunCampaignStatus(id)

 }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.dispostionData)
    if(!_.isEqual(prevProps.userData,this.props.userData)){
      this.setState({userData:this.props.userData})
      this.setState({dispostionData:this.props.dispostionData})
      this.setState({dncData:this.props.dncData})
    }
  }
 

  mappingreturnData = (startOffset, startCount, Per_Page ) => {
    const {searchval, userData,campignRuningStaus,loggedinData}= this.state
    // const {loggedinData} = this.props
    if(!_.isEmpty(userData)){
      return _.map(userData, (val, index) => {
        if(index >= startOffset & startCount < Per_Page){
          startCount++;
          const endDate = new Date(val.endDate);

    // Set time part to midnight for both dates
    const currentDate = new Date();
    endDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    console.log(currentDate ,endDate)
    console.log(currentDate >=endDate)
          return(
              <tr key={index}>
                <td><span className='colorblack'>{val.campaignId}</span></td>
								<td className='text-left'><span className='colorblack '>{val.campaignName}</span></td>
								<td>{moment(val.startDate).format('DD-MM-YYYY')}</td>
								<td>{moment(val.endDate).format('DD-MM-YYYY')}</td>
                {/* <td>{val.maxAdvNotice.split(":")[0]}<span className='colorblue'> hr ,</span>{val.maxAdvNotice.split(":")[1]}<span className='colorblue'> min</span> </td> */}
                <td>{val.callBefore}<span className='colorblue'> day</span></td>
                <td>{val.retryDelay}<span className='colorblue'> min</span></td>
								<td>{val.retryCount}</td>
                {/* <td>{val.ftpLocation}</td> */}
                <td>{(val.campaignActive === "true")? "YES" : "NO"}
              
                </td>
                <td>{(val.frontstatus === "notready")? "Created" : "File Uploaded"}
              
              </td>
								<td className='actiontd text-left'>
                {_.isEqual(loggedinData.roles,"[Admin]") || _.isEqual(loggedinData.roles,"[Supervisor]")? 
                <>
                <MDBTooltip
                domElement
                tag="span"
                placement="top"
                >
                <span  className='blue-text action_move'><i className="fas fa-edit m-r-20" style={{color:'red'}}  onClick={()=>this.handleEdit(index)}></i></span>
                <span>Edit</span></MDBTooltip>&nbsp;&nbsp;&nbsp;&nbsp; 
                <MDBTooltip
                domElement
                tag="span"
                placement="top"
                disabled={val.campaignActive === "false"&& endDate>= currentDate}
                >
                <span className='blue-text'><i className="fas fa-upload m-r-20" style={{color:'grey'}}   onClick={()=>this.handleUpload(index,val.campaignActive)}></i></span>
                <span>Upload</span></MDBTooltip>&nbsp;&nbsp;&nbsp;&nbsp;
                </>
                : null}
                <MDBTooltip
                domElement
                tag="span"
                placement="top"
                >
                <span><i className="fas fa-eye m-r-20" style={{color:'blue'}}  onClick={()=>this.handleviewCampaign(index)}></i></span>
                <span>View</span></MDBTooltip> 
                
                {val.frontstatus==='Start' && val.campaignActive !== "false" && endDate>= currentDate? 
                <>  
        <span title='Start' className='blue-text'>
        &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fas fa-play m-r-20" onClick={()=>this.startviewCampaign(index,val.campaignId)} style={{color:'green'}} ></i> 
        </span>
        </>:null
        }
        {(val.frontstatus==='notready' || val.campaignActive === "false" || val.frontstatus==='Completed') || currentDate > endDate && val.frontstatus!=='Stop'? 
                <>  
        <span title='Start' className='blue-text'>
        &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fas fa-play m-r-20" onClick={()=>this.startviewCampaign(index,val.campaignId)} style={{color:'grey'}} ></i> 
        </span>
        </>:null
        }
        {(val.frontstatus==='Running' || val.frontstatus==='Stop') && val.campaignActive !== "false" && (endDate >= currentDate || val.frontstatus!=='Running')? 
                <>  
        <span title='Stop' >
        &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fas fa-stop-circle m-r-20" style={{color:'red'}} onClick={()=>this.stopviewCampaign(index,val.campaignId)}></i> 
        </span>
        </>:null}
        {val.frontstatus==='Pause' && val.campaignActive !== "false" && endDate>= currentDate? 
                <> 
        <span title='Resume'>
        &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fas fa-play-circle m-r-20" style={{color:'green'}} onClick={()=>this.resumetviewCampaign(index,val.campaignId)}></i> 
        </span>
        </>:null}
        {val.frontstatus==='Running' && val.campaignActive !== "false" && endDate>= currentDate? 
        <>
        <span title='Pause'>
        &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fas fa-pause m-r-20" style={{color:'orange'}} onClick={()=>this.pauseviewCampaign(index,val.campaignId)}></i> 
        </span>
        </>:null}
             
                  </td>
            </tr>
        )
        } 
      })
    } else {
      return (<tr><td colSpan="10"><center>No Record Found</center></td></tr>)
    }
  }
  handleSort = (column) => {
    const {orderBy, userData} = this.state
    var data = _.orderBy(userData, column, orderBy); 
    this.setState({userData:data})
    if(orderBy === "asc"){
     this.setState({orderBy:"desc"})
    } else {
     this.setState({orderBy:"asc"})
    }
  }
	handleEdit = (index) => {
		this.setState({editing:true, editIndex:index})
    window.localStorage.setItem('isaddOpen',true)
  } 
  handleUpload = (index,val) => {
    if(val!=='false'){
    this.setState({uploadContact:true, editIndex:index})
    }
  }
  handleUploadClose = () => {
    this.setState({uploadContact:false, editIndex:''})
  }
  handleEditingClose = () => {
		this.setState({editing:false, editIndex:''})
    window.localStorage.setItem('isaddOpen',false)
  }
	handleAdd = () => {
    this.props.setNavOpen(false)
		this.setState({add:true})
    window.localStorage.setItem('isaddOpen',true)
  }
  handleAddClose = () => {
		this.setState({add:false})
    window.localStorage.setItem('isaddOpen',false)
  }	
  handleviewCampaign = (index) => {
		this.setState({view:true, editIndex:index})
  }
  handleviewCampaignClose = () => {
		this.setState({view:false, editIndex:''})
  }
  filterData = (searchval) => {
    return function(row){    
      let res = false
      let eventKey = ['employeeId','firstName','role','email'];
      for(let i = 0; i <eventKey.length; i += 1) {
        const val = row[eventKey[i]]   
        if(_.includes((val).toLowerCase(), searchval.toLowerCase())){
          // if((val).toLowerCase().includes(searchval.toLowerCase())) {
            res = true
            break
          }
      }
      return res
    }
  }
  handleChangeID = (e) => {
    this.setState({searchval:e.target.value})
  }
  autoHide = () => {
    setTimeout(() => {
      this.props.CampaignEditErrorClose()
      }, 5000);
  }

  handleSelectPagination = (eventKey) => {
    this.setState({
      activePage: eventKey,
    });
	}
	handleSelectPaginationPrev = () => {
		const {activePage} = this.state;
		this.setState({
      activePage: activePage-1,
    });
	}
	handleSelectPaginationNext = () => {
		const {activePage} = this.state;
		this.setState({
      activePage: activePage+1,
    });
  }

  render() {
    const {rolesData, fullScreen, showMessage, message,businessType, domainType, isPending, isOpen,dncData,dispostionData} = this.props;
    const {editIndex,loggedinData, editing, add, campignRuningStaus,activePage, Per_Page, view,searchval, userData, disableUser, uploadContact} = this.state;
    let totalPages ;
    if(!_.isEmpty(userData)){
      totalPages = Math.ceil(userData.length/Per_Page)
    }    
    const startOffset = (activePage-1) * Per_Page;
     let startCount = 0;
     let items = [];
     for (let number = 1; number <= totalPages; number++) {
       items.push(
         <Pagination.Item key={number} active={number === activePage} onClick={()=>this.handleSelectPagination(number)}>
           {number}
         </Pagination.Item>				
       );
     }
     if(showMessage === true){
      this.autoHide()
     }

     //console.log("this state", this.state)
     //console.log("this props", this.props)
    return (
      <div className={isOpen ? "app_Content container-fluid" : "app_ContentSmall container-fluid"}>        
        {isPending ? <span className='spinner alignRight'>
          Loading... <Spinner animation="grow" role="status" size='lg'/>
            </span> : null}
        {(showMessage === true) ?
        <ShowModalLogin message={message} falseShowModalPopUp={this.props.CampaignEditErrorClose}/> : null}
					{editing === true ? 
						<EditCampaign edit={add ? [] : userData[editIndex]} action={this.props} loggedinData={loggedinData} add={add} dispostionData={dispostionData} dncData={dncData} closeModal={this.handleEditingClose} />
					: null}
          {uploadContact === true ?  
          <UploadContacts edit={add ? [] : userData[editIndex]} action={this.props} 
            closeModal={this.handleUploadClose} /> : null}
          {view === true ?  
          <ViewCampaign edit={add ? [] : userData[editIndex]} action={this.props} dispostionData={dispostionData} dncData={dncData}
            add={add} closeModal={this.handleviewCampaignClose} /> : null}
        	{add === true ? 
            <AddCampaign edit={add ? [] : userData[editIndex]} action={this.props} dispostionData={dispostionData} dncData={dncData}  loggedinData={loggedinData} add={add} 
             closeModal={this.handleAddClose} />  :
        <div>
            <br/>
            <div className='alignRight clearing marginBottom'>
              {_.isEqual(loggedinData.roles,"[Admin]") || _.isEqual(loggedinData.roles,"[Supervisor]")  ?
                <Button className="inlineBlock" onClick={this.handleAdd}> <span><i className="fas fa-plus-square m-r-20" ></i> </span> Add Campaign</Button>
               : null }
            </div>
            <Table responsive striped bordered hover>
                <thead>
                  <tr>   
                    <th>Campaign Id</th>         
                    <th className='text-left'>Campaign Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Call Before</th>
                    <th>Retry Delay</th>
                    <th>Retry Count</th>
                    {/* <th>SFTP Location</th> */}
                    <th>Active</th> 
                    <th>Status</th> 
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {this.mappingreturnData(startOffset, startCount, Per_Page)}
                </tbody>
              </Table>
              <Pagination>
              <Pagination.First  disabled={activePage === 1} onClick={()=>this.handleSelectPagination(1)} />
              <Pagination.Prev   disabled={activePage === 1} onClick={this.handleSelectPaginationPrev} />
                      {items[activePage-1]}
                      {items[activePage] ? items[activePage] : (activePage !== 1) ? items[0] : null}
                      {items[activePage+1]}  
              <Pagination.Next disabled={activePage === totalPages} onClick={this.handleSelectPaginationNext}/>
              <Pagination.Last disabled={activePage === totalPages} onClick={()=>this.handleSelectPagination(totalPages)}/>			
              </Pagination>

        </div> }
      </div>
    );
  }
}
