import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTooltip, MDBInput, MDBNotification} from 'mdbreact';
import _ from 'lodash';
import {Table, Pagination, Spinner, Button} from 'react-bootstrap';
import EditUSerGroup from './editSkillSet';
import AddUserGroup from './addSkillSet';
import ViewSkillSet from './viewSkillSet'
import ShowModalLogin from '../showModalLogin';
import moment from "moment";
export default class skillSetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage:1,
      Per_Page:10,
      searchval:'',
      orderBy:'asc',
      userData:props.userData,
      editing:false,
      add:false,
      view:false
    }
  }
  handleviewSkillset = (index) => {
		this.setState({view:true, editIndex:index})
  }

  componentDidMount(){
    this.props.SkillSetLoad()
    // this.props.UserGroupsData()
  }
  componentDidUpdate(prevProps, prevState) {
    // this.setState({userData:this.props.userData})
    if(!_.isEqual(prevProps.userData,this.props.userData)){
      this.setState({userData:this.props.userData})
    }
  }
 

  mappingreturnData = (startOffset, startCount, Per_Page ) => {
    const {searchval,userData}= this.state
    // let userData=[{skillname:'Agent',language:"English",timeZone:'(UTC +5:30)India and Sri Lanka',channelType:'Voice',serviceLevelThresold:10,shortcallThresold:11,
    // shortAbandoneThresold:12,serviceLevelGoal:10,abandoneRateThresold:10,firstCallResalution:13,countAbandoneAgainestSLA:'yes'},
    // {skillname:'Supplier',language:"English",timeZone:'(UTC +5:30)India and Sri Lanka',channelType:'Voice',serviceLevelThresold:10,shortcallThresold:11,
    // shortAbandoneThresold:12,serviceLevelGoal:10,abandoneRateThresold:10,firstCallResalution:13,countAbandoneAgainestSLA:'No'},
    // ]
    console.log(userData)
    // let userData=[{dispostionName:'Sales',descriptions:"Sales Description"},
    // {dispostionName:'Sales',descriptions:"Sales Description"},
    // {dispostionName:'Sales',descriptions:"Sales Description"}]

    const {loggedinData} = this.props
    if(!_.isEmpty(userData)){
      return _.map(userData, (val, index) => {
        if(index >= startOffset & startCount < Per_Page){
          startCount++;
          return(
              <tr key={index}>
                
								<td className='text-left'><span className='colorblack '>{val.skillName}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.language}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.timeZone}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.channelType}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.serviceLevelThreshold}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.shortCallThreshold}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.shortAbandonedThreshold}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.serviceLevelGoal}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.abandonedRateThreshold}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.firstCallResolution}</span></td>
                                <td className='text-left'><span className='colorblack '>{val.countAbandonedSLA}</span></td>
                                
								
								<td>
                {_.isEqual(loggedinData.roles,"[Admin]") || _.isEqual(loggedinData.roles,"[Supervisor]")?  
                <>
                <MDBTooltip
                domElement
                tag="span"
                placement="top"
                >
                <span className='blue-text'><i className="fas fa-edit m-r-20" style={{color:'red'}}  onClick={()=>this.handleEdit(index)}></i></span>
                <span>Edit</span></MDBTooltip>&nbsp;&nbsp;&nbsp;&nbsp; 
                
                </>
                : null}
                <MDBTooltip
                domElement
                tag="span"
                placement="top"
                >
                <span><i className="fas fa-eye m-r-20" style={{color:'blue'}}  onClick={()=>this.handleviewSkillset(index)}></i></span>
                <span>View</span></MDBTooltip>            
                  </td>
            </tr>
        )
        } 
      })
    } else {
      return (<tr><td colSpan="12"><center>No Record Found</center></td></tr>)
    }
  }
  handleEdit = (index) => {
		this.setState({editing:true, editIndex:index})
  }
  handleEditingClose = () => {
    this.setState({editing:false, editIndex:''})
}
handleviewSkillsetClose = () => {
  this.setState({view:false, editIndex:''})
}
  autoHide = () => {
    setTimeout(() => {
      this.props.SkillSetEditErrorEditErrorClose()
      }, 5000);
  }
  handleAdd = () => {
    this.setState({add:true})
}
handleAddClose = () => {
    this.setState({add:false})
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
    const {loggedinData, showMessage, message, isPending,} = this.props;
    const {editIndex,userData,Per_Page,activePage,isOpen,add,editing,view} = this.state;
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
        <ShowModalLogin message={message} falseShowModalPopUp={this.props.SkillSetEditErrorEditErrorClose}/> : null}
					{editing === true ? 
						<EditUSerGroup  edit={add ? [] : userData[editIndex]} userData={this.state.userData} action={this.props} loggedinData={loggedinData} add={add} closeModal={this.handleEditingClose} />
                        : null}
          
          {view === true ?  
          <ViewSkillSet edit={add ? [] : userData[editIndex]} action={this.props} 
            add={add} closeModal={this.handleviewSkillsetClose} /> : null}
        	{add === true ? 
            <AddUserGroup edit={add ? [] : userData[editIndex]} userData={this.state.userData} action={this.props}  loggedinData={loggedinData} add={add} 
            closeModal={this.handleAddClose} 
              />  :
        <div>
            <br/>
            <div className='alignRight clearing marginBottom'>
              
                <Button className="inlineBlock" onClick={this.handleAdd}> <span><i className="fas fa-plus-square m-r-20" ></i> </span> Add Skill Set</Button>
              
            </div>
            <Table responsive striped bordered hover>
                <thead>
                  <tr>   
                    <th>Skill Name</th>         
                    <th className='text-left'>Language</th>
                    <th className='text-left'>TimeZone</th>
                    <th>Channel Type</th>         
                    <th className='text-left'>Service Level Thresold</th>
                    <th className='text-left'>First Call Resalution</th>
                    <th>Short Call Thresold</th>         
                    <th className='text-left'>Short Abandone Thresold </th>
                    <th className='text-left'>Service Level Goal</th>
                    <th>Abandone Rate Thresold</th>         
                    <th className='text-left'>Count Abandone Againest SLA</th>
                    {/* <th className='text-left'>TimeZone</th> */}
                   
                    {/* <th>SFTP Location</th> */}
                    
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
