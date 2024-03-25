import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTooltip, MDBInput, MDBNotification} from 'mdbreact';
import _ from 'lodash';
import {Table, Pagination, Spinner, Button} from 'react-bootstrap';
import EditUser from './editUser';
import AddUser from './addUser';
import ViewUser from './viewUser';
import ShowModalLogin from '../showModalLogin';
import moment from "moment";
export default class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage:1,
      Per_Page:10,
      searchval:'',
      orderBy:'asc',
      userData:props.userData,
      skillData:props.skillData,
      agentData:props.agentData,
      
    }
  }

  componentDidMount(){
    this.props.UserDataLoad()
    this.props.SkillSetLoad()
    this.props.AgentLoad()
    this.props.UserRoleData()
    this.props.UserGroupsData()
    
    
  }
  componentDidUpdate(prevProps, prevState) {
    if(!_.isEqual(prevProps.userData,this.props.userData)){
      this.setState({userData:this.props.userData})
    }
    console.log(this.props.userGroupsData)
  }

  componentWillUnmount(){
    this.props.UserErrorClose()
  }
 

  mappingreturnData = (startOffset, startCount, Per_Page ) => {
    const {searchval, userData}= this.state
    console.log(userData)
    const {loggedinData} = this.props
    if(!_.isEmpty(userData)){
      return _.map(userData, (val, index) => {
        if(index >= startOffset & startCount < Per_Page){
          startCount++;
          return(
              <tr key={index}>
                <td className='text-left'><span className='colorblack'>{val.userId}</span></td>
								<td className='text-left'><span className='colorblack '>{val.firstName + val.lastName}</span></td>
								<td className='text-left'><span className='colorblack '>{val.emailId}</span></td>
                <td className='text-left'><span className='colorblack '>{val.mobNum}</span></td>
                <td className='text-left'><span className='colorblack '>{val.role}</span></td>
								<td className='text-left'><span className='colorblack '>{val.pbxExtn}</span></td>
                <td className='text-left'><span className='colorblack '>{val.skillSet}</span> </td>
								<td>
                
             
                <MDBTooltip
                domElement
                tag="span"
                placement="top"
                >
                <span className='blue-text'><i className="fas fa-edit m-r-20" style={{color:'red'}}  onClick={()=>this.handleEdit(index)}></i></span>
                <span>Edit</span></MDBTooltip>&nbsp;&nbsp;&nbsp;&nbsp; 
                
              
                <MDBTooltip
                domElement
                tag="span"
                placement="top"
                >
                <span><i className="fas fa-eye m-r-20" style={{color:'blue'}}  onClick={()=>this.handleviewCampaign(index)}></i></span>
                <span>View</span></MDBTooltip>            
                  </td>
            </tr>
          )
        } 
      })
    } else {
      return (<tr><td colSpan="8"><center>No Record Found</center></td></tr>)
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
  } 
  handleUpload = (index) => {
    this.setState({uploadContact:true, editIndex:index})
  }
  handleUploadClose = () => {
    this.setState({uploadContact:false, editIndex:''})
  }
  handleEditingClose = () => {
		this.setState({editing:false, editIndex:''})
  }
	handleAdd = () => {
		this.setState({add:true})
  }
  handleAddClose = () => {
		this.setState({add:false})
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
      this.props.UserErrorClose()
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
    const {rolesData,skillData,agentData,userGroupsData, loggedinData, userEntity, showMessage, message,isPending, isOpen} = this.props;
    const {editIndex, editing, add, activePage, Per_Page, view,searchval, userData, disableUser, uploadContact} = this.state;
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
     if(typeof showMessage !== 'undefined' && showMessage === true){
      this.autoHide()
     }

    //  console.log("this state", this.state)
    //  console.log("this props", this.props)
    return (
      <div className={isOpen ? "app_Content container-fluid" : "app_ContentSmall container-fluid"}>        
        {isPending ? <span className='spinner alignRight'>
          Loading... <Spinner animation="grow" role="status" size='lg'/>
            </span> : null}
        {(typeof showMessage !== 'undefined' && showMessage === true) ?
        <ShowModalLogin message={message} falseShowModalPopUp={this.props.UserErrorClose}/> : null}
					{editing === true ? 
						<EditUser edit={add ? [] : _.reject(userData,['id',1])[editIndex]} action={this.props} loggedinData={loggedinData} userEntity={userEntity} rolesData={rolesData}  skillData={skillData} agentData={agentData} userGroupsData={userGroupsData} add={add} closeModal={this.handleEditingClose} />
					: null}
          
          {view === true ?  
          <ViewUser edit={add ? [] : _.reject(userData,['id',1])[editIndex]} action={this.props} rolesData={rolesData}  skillData={skillData} agentData={agentData} userGroupsData={userGroupsData}
            add={add} closeModal={this.handleviewCampaignClose} /> : null}
        	{add === true ? 
            <AddUser edit={add ? [] : _.reject(userData,['id',1])[editIndex]} action={this.props}  loggedinData={loggedinData} userEntity={userEntity} rolesData={rolesData} skillData={skillData} agentData={agentData} userGroupsData={userGroupsData} add={add} 
             closeModal={this.handleAddClose} />  :
        <div>
            <br/>
            <div className='alignRight clearing marginBottom'>
              {!_.isEqual(loggedinData.roles,'[user]') ?
                <Button className="inlineBlock" onClick={this.handleAdd}> <span><i className="fas fa-plus-square m-r-20" ></i> </span> Add User</Button>
              : null }
              {/* <Button className="inlineBlock" onClick={this.handleAdd}> <span><i className="fas fa-plus-square m-r-20" ></i> </span> Add User</Button> */}
            </div>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>   
                    <th className='text-left'>User Id</th>         
                    <th className='text-left'>User Name</th>
                    <th className='text-left'>Email Id</th>
                    <th className='text-left'>Mobile</th>
                    <th className='text-left'>Role</th>
                    <th className='text-left'>PbxExtn</th>
                    <th className='text-left'>SkillSet</th>
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
