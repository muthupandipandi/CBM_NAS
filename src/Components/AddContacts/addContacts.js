import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTooltip, MDBInput, MDBNotification} from 'mdbreact';
import _, { cloneDeep } from 'lodash';
import {Table, Pagination, Spinner, Button, Row, Col, FormControl} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';
import ShowModal from '../showModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-dropdown-select';
import {Picky} from 'react-picky';
import 'react-picky/dist/picky.css'; 
import moment from "moment";

export default class addContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage:1,
      Per_Page:10,
      startDate :  moment(new Date()).format('YYYY-MM-DD'),
      endDate : '',
      tempDate : new Date(),
      tempEndDate : '',
      historyData : [],
      historyView : false,
      generateBtnView : true,
      delView : false,
      delId : ''

    }
  }

  componentDidMount(){
   
  }
  componentDidUpdate(prevProps, prevState) {
    
  }

  autoHide = () => {
    setTimeout(() => {
      this.props.isErrorClose()
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

  isValidate() {
		const {campaignName,campaignId,startDate,endDate, generateBtnView, reportId, doctorName, contactNo} = this.state
        if( startDate  && endDate  )
        {
            return true
        } 
            
		   
	   }
    
     mappingreturnData = (startOffset, startCount, Per_Page ) => {
      const { historyData,loggedinData}= _.cloneDeep(this.props)
      if(!_.isEmpty(historyData)){
        return _.map(historyData, (val, index) => {
          if(index >= startOffset & startCount < Per_Page){
            startCount++;
            return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td><span className='colorblack'>{val.campaignName}</span></td>
                  <td><span>{val.filename}</span></td>
                  <td>{moment(val.uploadedOn).format('YYYY-MM-DD')}<span className='colorblue'> {moment(val.uploadedOn).format('hh:mm:ss A')}</span></td>
                  <td>{val.contactUploaded}</td>
                  {_.isEqual(loggedinData.role,'admin') ?
                  <td>
                  <MDBTooltip
                  domElement
                  tag="span"
                  placement="top"
                  >
                  <span className='blue-text'><i className="fas fa-trash-alt m-r-20" style={{color:'red'}}  onClick={()=>this.openDelView(val.uploadHistoryId)}></i></span>
                  <span>Delete</span></MDBTooltip>&nbsp;&nbsp;&nbsp;&nbsp;
                  {/* <MDBTooltip
                  domElement
                  tag="span"
                  placement="top"
                  >
                  <span><i className="fas fa-eye m-r-20" style={{color:'blue'}}  onClick={()=>this.handleviewCampaign(index)}></i></span>
                  <span>View Campaign</span></MDBTooltip>             */}
                    </td> : null}
              </tr>
          )
          } 
        })
      } else {
        return (<tr><td colSpan="10"><center>No Record Found</center></td></tr>)
      }
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

    handleChange = (event) => {
      const {generateBtnView } = this.state
      this.setState({
      [event.target.id]: event.target.value
      });  
      if(generateBtnView === false) {
          this.setState({generateBtnView : true})
      }
    }

//     handleChangeStart=(e)=>{
//       const {generateBtnView } = this.state
//   const date = moment(e).format('YYYY-MM-DD'); 
//   this.setState({startDate: date});
//   this.setState({tempDate: e});
//       if(generateBtnView === false) {
//           this.setState({generateBtnView : true})
//       }
//     }

//     handleChangeEnd = (e) => {
//     const {generateBtnView } = this.state
// const date = moment(e).format('YYYY-MM-DD'); 
// this.setState({endDate: date});
// this.setState({tempEndDate: e});
//     if(generateBtnView === false) {
//         this.setState({generateBtnView : true})
//     }
//     }

    handleGenerate = () => {
        const {startDate,endDate} = this.state
        let obj = {
          
            'startDate'  : startDate ,
            'endDate'    : endDate,
            
        }
      
        this.props.generateHistory(obj)
        
        this.setState({historyView : true})
        this.setState({generateBtnView : false})
    }

    handleCloseView = () => {
            this.setState({historyView : true})
    }

    handleDownload = () => {
        const {startDate,endDate} = this.state
        let obj = {
            
            'startDate'  : startDate ,
            'endDate'    : endDate,
        }
        
        //this.props.downloadReport(obj)
        this.setState({historyView : false})
        this.setState({generateBtnView : true})
    }

    handleDelete = () => {
      const {delId, startDate,endDate} = this.state
      let obj = ''
      if(!_.isEmpty(delId)) {
        obj = { 'historyId' : delId}
      }
      let initialData = {
          
        'startDate'  : startDate ,
        'endDate'    : endDate,
        
      }
      //console.log("V",obj)
      this.props.deleteHistory(obj, initialData)
      this.closeDelView()
    }

    openDelView = (val) => {
      this.setState({delView : true})
      this.setState({delId : val})
    }
    closeDelView = (val) => {
      this.setState({delView : false})
      this.setState({delId : ''})
    }

  render() {
      const {isOpen,isPending,showMessage,message,loggedinData} = this.props
      const {activePage, Per_Page, campaignName, startDate, tempDate, tempEndDate, historyView, generateBtnView, delView} = this.state
      const historyData =  _.cloneDeep(this.props.historyData)
      let totalPages ;
      if(!_.isEmpty(historyData)){
        totalPages = Math.ceil(historyData.length/Per_Page)
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

        // console.log("this state", this.state)
        // console.log("this props", this.props)
    return (
      <div className={isOpen ? "app_Content container-fluid" : "app_ContentSmall container-fluid"}>        
        {/* {isPending ? <span className='spinner alignRight'>
          Loading... <Spinner animation="grow" role="status" size='lg'/>
            </span> : null} */}
        {(showMessage === true) ?
        <ShowModalLogin message={message} falseShowModalPopUp={this.props.isErrorClose}/> : null}
        {(delView === true) ?
        <ShowModal message="Do you want to delete all the contacts uploaded during this time? " falseShowModalPopUp={this.closeDelView} onCallback={this.handleDelete} /> : null}
        <div>
            <br/>
          <div className='alignLeft'>
          List Upload History
          </div>
          <div><br/><br/><br/></div>
            <div className='addCampaign'>
              <Row className='align-items-center'> 
                <Col md={2}>
                <label>From <span className='colorRed'>*</span>
                                    </label><br/>
                  <DatePicker
                      selected={tempDate}
                      className='myDatePicker'
                      selectsStart
                      showMonthDropdown
                      startDate={tempDate}
                      endDate={tempEndDate}
                      onChange={this.handleChangeStart}
                      dateFormat="dd-MM-yyyy"          
                      //minDate={new Date()}
                      maxDate={tempEndDate}
                      placeholderText="Choose Date"          
                  />
                </Col>
                <Col md={2} >
                <label>To <span className='colorRed'>*</span> </label><br/>
                  <DatePicker
                  selected={tempEndDate}
                  selectsEnd
                  className='myDatePicker'
                  startDate={tempDate}
                  endDate={tempEndDate}
                  onChange={this.handleChangeEnd}
                  minDate={tempDate}
                  dateFormat="dd-MM-yyyy" 
                  placeholderText="Choose Date"
                  />
                </Col>
                <Col md={2}>
                  <br/> 
                  <Button  variant="primary alignRight" disabled={!this.isValidate()} onClick={this.handleGenerate}><i class="fas fa-cogs" aria-hidden="true"></i> View</Button> 

                </Col>
                <Col md={1}> 
                  <br/>
                  {historyView === true ? <></>
                  // <Button  variant="primary alignRight" onClick={this.handleDownload}><i class="fas fa-download" aria-hidden="true"></i> Download History</Button>
                  : null}
                </Col> 
                <Col md={5}></Col>
            </Row>  
			      </div>
            <div><br/></div>
            {historyView === true ?
              <div style={{ overflowX: 'auto' }}>
                  <Table responsive striped bordered hover>
                  <thead>
                  <tr>            
                    <th>S.NO</th>
                    <th>Campaign Name</th>
                    <th>File Name</th>
                    <th>Uploaded Time</th>
                    <th>No of Contacts Uploaded</th>
                    {_.isEqual(loggedinData.role,'admin') ?
                    <th>Delete</th>
                    :null}
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
              </div>
              : null}

          </div> 
        </div>
    );
  }
}
