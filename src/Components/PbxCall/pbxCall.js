import React, { Component } from 'react'
import {Table, Pagination, Spinner, Button, Row, Col, FormControl} from 'react-bootstrap';
import { MDBTooltip} from 'mdbreact';
import ShowModalLogin from '../showModalLogin';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-dropdown-select';
import {Picky} from 'react-picky';
import 'react-picky/dist/picky.css'; 
import moment from "moment";
import _ from 'lodash';

export default class pbxCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:1,
            Per_Page:10

        };
      }

    componentDidMount(){
        this.props.getContactDetails()
    }
    handleRefresh = () => {
        this.props.getContactDetails()
    }
    onhandleCall = (id) => {
        let formdata = new FormData();
        formdata.append("contactId", id);
        this.props.connectCall(formdata)
    }
    mappingreturnData = (startOffset, startCount, Per_Page ) => {
        const { contactList,loggedinData}= _.cloneDeep(this.props)
        if(!_.isEmpty(contactList)){
          return _.map(contactList, (val, index) => {
            if(index >= startOffset & startCount < Per_Page){
              startCount++;
              return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td><span className='colorblack'>{val.patientName}</span> <span >{val.contactNo}</span></td>
                    <td><span>{_.isEqual(val.callStatus,'FAILED')?(_.isEqual(val.busyStatus,'yes')?'BUSY':'NO ANSWER'):val.callStatus}</span></td>
                    <td>
                    <MDBTooltip
                    domElement
                    tag="span"
                    placement="top"
                    >
                    <span className='blue-text'><i className="fa fa-phone-volume fa-lg m-r-20" style={{color:'green'}}  onClick={()=>this.onhandleCall(val.contactId)}></i></span>
                    <span>Call</span></MDBTooltip>&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <MDBTooltip
                    domElement
                    tag="span"
                    placement="top"
                    >
                    <span><i className="fas fa-eye m-r-20" style={{color:'blue'}}  onClick={()=>this.handleviewCampaign(index)}></i></span>
                    <span>View Campaign</span></MDBTooltip>             */}
                      </td>
                </tr>
            )
            } 
          })
        } else {
          return (<tr><td colSpan="10"><center>No Record Found</center></td></tr>)
        }
    }

  render() {
        const {isOpen,isPending,showMessage,message,contactList,customerData } = _.cloneDeep(this.props)
        const {activePage, Per_Page } = this.state

        let totalPages ;
        if(!_.isEmpty(contactList)){
        totalPages = Math.ceil(contactList.length/Per_Page)
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
    return (
        <div className={isOpen ? "app_Content container-fluid" : "app_ContentSmall container-fluid"}>        
			{isPending? <span className='spinner alignRight'>
			Loading... <Spinner animation="grow" role="status" size='lg'/>
				</span> : null}
			{(showMessage === true) ?
			<ShowModalLogin message={message} falseShowModalPopUp={this.props.isErrorClose}/> : null}
            <p/>
            <div className="alignRight"> 
                <Button variant="outline-primary" className="btnColormain"  onClick={this.handleRefresh}><i class="fas fa-sync-alt" aria-hidden="true"></i> Refresh</Button>
            </div>
            <p/><br/>
            <Row className='align-items-center'> 
                
                <Col md={8}>
                    {!_.isEmpty(contactList)?
                    <div>
                        <Table responsive striped bordered hover>
                        {/* <thead>
                        <tr>            
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead> */}
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
                </Col>
            </Row>
        </div>
    )
  }
}
