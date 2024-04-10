import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTooltip, MDBInput, MDBNotification} from 'mdbreact';
import _ from 'lodash';
import {Table, Pagination, Spinner, Button} from 'react-bootstrap';
import EditDnc from './editDnc';
import AddDnc from './addDnc';
import ShowModalLogin from '../showModalLogin';
import UploadContacts from './uploadDNC'
import moment from "moment";
export default class listDnc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage:1,
      Per_Page:10,
      searchval:'',
      orderBy:'asc',
      userData:props.userData,
      editing:false,
      add:false
    }
  }

  
  componentDidMount(){
    this.props.DNCLoad()
    
    // this.props.UserGroupsData()
  }
  handleEdit = (index) => {
		this.setState({editing:true, editIndex:index})
  }
  handleEditingClose = () => {
    this.setState({editing:false, editIndex:''})
}
  componentDidUpdate(prevProps, prevState) {
    // this.setState({userData:this.props.userData})
    if(!_.isEqual(prevProps.userData,this.props.userData)){
      this.setState({userData:this.props.userData})
    }
  }
 

  mappingreturnData = (startOffset, startCount, Per_Page ) => {
    const {searchval,userData}= this.state
    
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
                
								<td className='text-center'><span className='colorblack '>{val.dncName}</span></td>
                <td className='text-center'><span className='colorblack '>{val.description}</span></td>
								
								<td>
                {/* {_.isEqual(loggedinData.role,"admin") || _.isEqual(loggedinData.role,"subadmin")?  */}
                {/* <> */}
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
                <span className='blue-text'><i className="fas fa-upload m-r-20" style={{color:'grey'}}  onClick={()=>this.handleUpload(index)}></i></span>
                <span>Upload</span></MDBTooltip>&nbsp;&nbsp;&nbsp;&nbsp;
                {/* </> */}
               
                {/* <MDBTooltip
                domElement
                tag="span"
                placement="top"
                >
                <span><i className="fas fa-eye m-r-20" style={{color:'blue'}}  onClick={()=>this.handleViewDnc(index)}></i></span>
                <span>View</span></MDBTooltip>             */}
                  </td>
            </tr>
        )
        } 
      })
    } else {
      return (<tr><td colSpan="3"><center>No Record Found</center></td></tr>)
    }
  }
  handleEditingClose = () => {
    this.setState({editing:false, editIndex:''})
}
  autoHide = () => {
    setTimeout(() => {
      this.props.DNCEditErrorClose()
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
  handleUpload = (index) => {
    this.setState({uploadContact:true, editIndex:index})
  }
  handleUploadClose = () => {
    this.setState({uploadContact:false, editIndex:''})
  }
  handleSelectPaginationNext = () => {
    const {activePage} = this.state;
    this.setState({
  activePage: activePage+1,
});
}
  render() {
    const {loggedinData, showMessage, message, isPending,} = this.props;
    const {editIndex,userData,Per_Page,activePage,isOpen,add,editing,uploadContact} = this.state;
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
        {/* {isPending ? <span className='spinner alignRight'>
          Loading... <Spinner animation="grow" role="status" size='lg'/>
            </span> : null} */}
        {(showMessage === true) ?
        <ShowModalLogin message={message} falseShowModalPopUp={this.props.DNCEditErrorClose}/> : null}
					{editing === true ? 
						<EditDnc  edit={add ? [] : userData[editIndex]} action={this.props} userData={this.state.userData} loggedinData={loggedinData} add={add} closeModal={this.handleEditingClose} />
                        : null}
          
          {uploadContact === true ?  
          <UploadContacts edit={add ? [] : userData[editIndex]} action={this.props} 
            closeModal={this.handleUploadClose} /> : null}
        	{add === true ? 
            <AddDnc edit={add ? [] : userData[editIndex]} action={this.props} userData={this.state.userData}  loggedinData={loggedinData} add={add} 
            closeModal={this.handleAddClose} 
              />  :
        <div>
            <br/>
            <div className='alignRight clearing marginBottom'>
              
                <Button className="inlineBlock" onClick={this.handleAdd}> <span><i className="fas fa-plus-square m-r-20" ></i> </span> Add DNC</Button>
              
            </div>
            <Table responsive striped bordered hover>
                <thead>
                  <tr>   
                    <th>DNC Name</th>         
                    <th className='text-center'>Descriptions</th>
                   
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
