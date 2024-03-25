import React, { Component } from 'react';
import {Table, Pagination, Spinner, Button, Row, Col, FormControl} from 'react-bootstrap';
import { MDBTooltip} from 'mdbreact';
import ShowModalLogin from '../showModalLogin';
import ViewRetryDetail from './viewRetryDetail'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-dropdown-select';
import {Picky} from 'react-picky';
import 'react-picky/dist/picky.css'; 
import moment from "moment";
import _ from 'lodash';

export default class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:1,
            Per_Page:10,
            campaignName : [],
            campaignId : '',
            startDate : '',
            endDate : '',
            tempDate : '',
            tempEndDate : '',
            reportView : false,
            reportCardView : false,
            generateBtnView : true,
            reportName : [],
            reportId : '',
            patientName : '',
            doctorName : [],
            contactNo : '',
            detailIndexId : '',
            detailView : false,
            callerChoice : '',
            callerLabel : [],
            reportList : [{'id' : '1', 'name' : 'Summary Report'}, {'id' : '2', 'name' : 'Detail Report'}],
            tempCampaign : [{'campaignName' : 'Test'},{'campaignName' : 'Test02'}],
            doctorList : [{'name' : 'Rahul'},{'name' : 'Sharma'},{'name' : 'Rohit'},{'name' : 'Venkey'},{'name' : 'Shaw'}],
            callerChoiceList : [{'name' : 'No Response','id' : '0'},{'name' : 'Confirmed','id' : '1'},{'name' : 'Cancelled','id' : '2'},{'name' : 'ReScheduled','id' : '3'}]

        };
      }

      componentDidMount(){
          this.props.getCampaignName()
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

      opendetailView=(id)=> {
          const {reportId} = this.state
          if(reportId === '2'){
            this.setState({detailView: true , detailIndexId:id })
          }
      }

      closedetailView=(id)=> {
          this.setState({detailView: false , detailIndexId:'' })
        }

      mappingreturnData = (startOffset, startCount, Per_Page ) => {
        const {reportData}= this.props
        if(!_.isEmpty(reportData)){
          return _.map(reportData, (val, index) => {
            if(index >= startOffset & startCount < Per_Page){
              startCount++;
              return(
                  <tr key={index}>
                    <td>{val.campaignName}</td>
                    <td>{val.startDate}</td>
                    <td>{val.endDate}</td>
                    <td>{val.maxAdvNotice.split(":")[0]+" hr, "+val.maxAdvNotice.split(":")[1]+" min" }</td>
                    <td>{val.retryDelay+" min "}</td>
                    <td>{val.retryCount}</td>
                    <td>{val.ftpLocation}</td>
                    <td>{(val.campaignActive === "1")? "YES" : "NO"}</td>
                    <td>
                    <MDBTooltip
                    domElement
                    tag="span"
                    placement="top"
                    >
                    <span className='blue-text'><i className="fas fa-pencil-alt m-r-20"  onClick={()=>this.handleEdit(index)}></i></span>
                    <span>Edit Campaign</span></MDBTooltip>&nbsp;&nbsp;&nbsp;&nbsp;
                    <MDBTooltip
                    domElement
                    tag="span"
                    placement="top"
                    >
                    <span><i className="fas fa-eye m-r-20"  onClick={()=>this.handleviewCampaign(index)}></i></span>
                    <span>View Campaign</span></MDBTooltip>            
                      </td>
                </tr>
            )
            } 
          })
        } else {
          return (<tr><td colSpan="10"><center>No Record Found</center></td></tr>)
        }
      }

      mapDatabodyDataLower = (data, subHeaders, fields, startOffset, startCount, Per_Page) =>{
        let returnObj=[];
        _.map(data, (xx, index)=> {     
          if(index >= startOffset & startCount < Per_Page){
            startCount++;          
            returnObj.push(                     
          (!_.isEmpty(subHeaders))?                       
          <tr onDoubleClick ={()=>this.opendetailView(index)}>
            {_.map(subHeaders, (dd) => {     
              
                return <td>{xx[dd.value]}</td>;
              
            })}
          </tr>
    
          :
          <tr>
          {_.map(fields, (dd) => {
              return <td>{xx[dd.value]}</td>;
          })}
        </tr> 
            );
           }
          })
      return returnObj
      }


      isValidate() {
		const {campaignName,campaignId,startDate,endDate, generateBtnView, reportId, doctorName, contactNo} = this.state
            if(reportId === '1'){
                if(campaignName && !_.isEmpty(campaignName) > 0 && campaignId && campaignId.length > 0 && startDate && startDate.length > 0 && endDate && endDate.length > 0 
                    && generateBtnView === true)
                    {
                       return true
                    } 
            } else if (reportId === '2'){
                if(campaignName && !_.isEmpty(campaignName) > 0 && campaignId && campaignId.length > 0 && startDate && startDate.length > 0 && endDate && endDate.length > 0 
                    && generateBtnView === true)
                    {
                       return true
                    } 
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

      handleChangeStart=(e)=>{
        const {generateBtnView } = this.state
		const date = moment(e).format('YYYY-MM-DD'); 
		this.setState({startDate: date});
		this.setState({tempDate: e});
        if(generateBtnView === false) {
            this.setState({generateBtnView : true})
        }
	   }

       handleChangeEnd = (e) => {
        const {generateBtnView } = this.state
		const date = moment(e).format('YYYY-MM-DD'); 
		this.setState({endDate: date});
		this.setState({tempEndDate: e});
        if(generateBtnView === false) {
            this.setState({generateBtnView : true})
        }
       }

       handleGenerate = () => {
           const {campaignName,campaignId,startDate,endDate, reportId,doctorName,contactNo,callerChoice} = this.state
           let obj = {
               'campaignName'   : campaignName.campaignName ,
               'campaignId' : campaignId ,
               'startDate'  : startDate ,
               'endDate'    : endDate,
               'contactNo'  : contactNo,
               'doctorName' : doctorName.name,
               'callerChoice' : callerChoice
            }
            //console.log("OBJ",obj)
           if(reportId === '1') {
                this.props.generateReport(obj)
           } else if (reportId === '2') {
                this.props.generateDetailReport(obj)
           }
           this.setState({reportView : true})
           this.setState({generateBtnView : false})
       }

       handleCloseView = () => {
                this.setState({reportView : true})
       }

       handleDownload = () => {
            const {campaignName,campaignId,startDate,endDate, reportId,doctorName,contactNo, callerChoice} = this.state
            let obj = {
                'campaignName'   : campaignName.campaignName ,
                'campaignId' : campaignId ,
                'startDate'  : startDate ,
                'endDate'    : endDate,
                'contactNo'  : contactNo,
                'doctorName' : doctorName.name,
                'callerChoice' : callerChoice,
            }
            if(reportId === '1') {
                this.props.downloadReport(obj)
            } else if (reportId === '2') {
                this.props.downloadDetailReport(obj)
            }
            // this.setState({reportView : false})
            // this.setState({generateBtnView : true})
       }

       handleCampaignName = (e) => {
        const {generateBtnView } = this.state
        this.setState({campaignName: e, campaignId : e.campaignId});
        //console.log("EE",e)
        if(generateBtnView === false) {
            this.setState({generateBtnView : true})
        }
       }

       handleDoctorName = (e) => {
        const {generateBtnView } = this.state
        this.setState({doctorName: e});
        if(generateBtnView === false) {
            this.setState({generateBtnView : true})
        }
       }

       handleCallerChoice = (e) => {
           const {generateBtnView } = this.state
           this.setState({ callerChoice : e.id, callerLabel : e})
           if(generateBtnView === false) {
            this.setState({generateBtnView : true})
            }
       }

       handleReport = (e) => {
            this.setState({reportName : e, reportId : e.id})
            this.setState({campaignName : [], startDate : '', endDate : '',
            tempDate : '', tempEndDate : '', doctorName : [], contactNo : '',                
            patientName : '', callerChoice : '', callerLabel : []})
            this.setState({reportView : false, })
       }


    render() {
        const {isOpen,isPending,showMessage,message,campaignNameList,reportData,reportHeader } = this.props
        const {activePage, Per_Page, campaignName, startDate, tempDate, tempEndDate, reportView, generateBtnView, reportCardView, reportList, reportName, reportId,
            doctorName, contactNo, patientName, doctorList,  detailIndexId, detailView, callerChoice, callerLabel, callerChoiceList } = this.state
        let subHeaders=[];
        let fields=[];
        let length=1;
        let headerLength=1;
        let lowersubHeaders=[];
        let lowerfields=[];
        let lowerlength=1;

        let totalPages ;
        if(!_.isEmpty(reportData)){
        totalPages = Math.ceil(reportData.length/Per_Page)
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

        // console.log("Report state : ",this.state)
        // console.log("Report props : ",this.props)

    return (
        <div className={isOpen ? "app_Content container-fluid" : "app_ContentSmall container-fluid"}>        
			{isPending && reportView ? <span className='spinner alignRight'>
			Loading... <Spinner animation="grow" role="status" size='lg'/>
				</span> : null}
			{(showMessage === true) ?
			<ShowModalLogin message={message} falseShowModalPopUp={this.props.isErrorClose}/> : null}
			
            {detailView === true ? 
            <ViewRetryDetail view={reportData ? reportData[detailIndexId].callRetryDetail : []} action={this.props}  
             closeModal={this.closedetailView} />  : null }


			<div>
				<br/>
                <div>
                    <div className='addCampaign'>
                        <Row className='align-items-center'>
                            <Col>
                            <div className='alignLeft'>
                                {(reportId === '1') ? "Summary Report" : (reportId === '2') ? "Detail Report": null }
                            </div>
                           
                            </Col>
                        </Row>
                        <Row className='align-items-center'>     
                                
                        </Row>         
                        <Row className='align-items-center'> 
                            <Col md={5}>
                                <label>
                                    Select Report <span className='colorRed'>*</span>
                                </label><br/>
                                <Picky
                                value={reportName}
                                options={reportList}
                                onChange={this.handleReport}
                                open={false}
                                valueKey="name"
                                labelKey="name"
                                multiple={false}
                                keepOpen={false}
                                includeFilter={true}
                                clearFilterOnClose={true}
                                placeholder="Choose Report"
                                dropdownHeight={200}
                                />
                                    

                            </Col> 
                        </Row>  
                        {(reportId === '1') ? 
                            <Row className='align-items-center'> 
                                <Col>

                                    {/* <Select
                                        options={this.state.tempCampaign}
                                        values={[{'campaignName' : campaignName}]}
                                        required
                                        labelField={'campaignName'}
                                        dropdownPosition='auto'
                                        valueField={'campaignName'}
                                        clearable={true}
                                        className='text-left selectDropDown'
                                        placeholder="Select Campaign"
                                        onChange={this.handleCampaignName}
                                        closeOnSelect={true}
                                    /> */}
                                    <label>
                                        Campaign Name <span className='colorRed'>*</span>
                                    </label><br/>
                                    <Picky
                                    value={campaignName}
                                    options={campaignNameList}
                                    onChange={this.handleCampaignName}
                                    open={false}
                                    valueKey="campaignName"
                                    labelKey="campaignName"
                                    multiple={false}
                                    keepOpen={false}
                                    includeFilter={true}
                                    clearFilterOnClose={true}
                                    placeholder="Select Campaign"
                                    dropdownHeight={200}
                                    />
                                        

                                    </Col>
                                <Col>
                                <label>
                                    Start Date <span className='colorRed'>*</span>
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
                                    placeholderText="Choose Date"          
                                />
                                </Col>
                                <Col>
                                <label>
                                End Date <span className='colorRed'>*</span>
                                </label><br/>
                                <DatePicker
                                selected={tempEndDate}
                                selectsEnd
                                startDate={tempDate}
                                endDate={tempEndDate}
                                onChange={this.handleChangeEnd}
                                minDate={tempDate}
                                dateFormat="dd-MM-yyyy" 
                                placeholderText="Choose Date"
                                />
                                </Col>
                                <Col > 
                                <br/>
                                <Button  variant="primary alignRight" disabled={!this.isValidate()} onClick={this.handleGenerate}><i className="fas fa-cogs" aria-hidden="true"></i> Generate Report</Button> 

                                </Col>
                                <Col > 
                                <br/>
                                {reportView === true ?
                                <Button  variant="primary alignRight" onClick={this.handleDownload}><i class="fas fa-download" aria-hidden="true"></i> Download Report</Button>
                                : null}
                                </Col> 
                            </Row> 
                        : (reportId === '2') ? 
                            <Row className='align-items-center'> 
                                
                                    <Col md={2} >
                                    <label>
                                        Campaign Name <span className='colorRed'>*</span>
                                    </label><br/>
                                    <Picky
                                    value={campaignName}
                                    options={campaignNameList}
                                    onChange={this.handleCampaignName}
                                    open={false}
                                    valueKey="campaignName"
                                    labelKey="campaignName"
                                    multiple={false}
                                    keepOpen={false}
                                    includeFilter={true}
                                    clearFilterOnClose={true}
                                    placeholder="Select Campaign"
                                    dropdownHeight={200}
                                    />
                                        

                                    </Col>
                                    <Col md={2}>
                                    <label>
                                        Start Date <span className='colorRed'>*</span>
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
                                        placeholderText="Choose Date"          
                                    />
                                    </Col>
                                    <Col md={2}>
                                    <label>
                                        End Date <span className='colorRed'>*</span>
                                    </label><br/>
                                    <DatePicker
                                        selected={tempEndDate}
                                        selectsEnd
                                        startDate={tempDate}
                                        endDate={tempEndDate}
                                        onChange={this.handleChangeEnd}
                                        minDate={tempDate}
                                        dateFormat="dd-MM-yyyy" 
                                        placeholderText="Choose Date"
                                    />
                                    </Col>
                                    {/* <Col md={2}>
                                    <label>
                                        Doctor Name <span className='colorRed'></span>
                                    </label><br/>
                                    <Picky
                                        value={doctorName}
                                        options={doctorList}
                                        onChange={this.handleDoctorName}
                                        open={false}
                                        valueKey="name"
                                        labelKey="name"
                                        multiple={false}
                                        keepOpen={false}
                                        includeFilter={true}
                                        clearFilterOnClose={true}
                                        placeholder="Select Doctor"
                                        dropdownHeight={200}
                                    />
                                    </Col> */}
                                    <Col md={2}>
                                    <label>
                                        Contact No <span className='colorRed'></span>
                                    </label><br/>
                                    <FormControl type='text' id="contactNo"  
                                        onChange={this.handleChange} value={contactNo}
                                        placeholder="Enter Contact No"
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <label>
                                            Caller Choice<span className='colorRed'></span>
                                        </label><br/>
                                        <Picky
                                            value={callerLabel}
                                            options={callerChoiceList}
                                            onChange={this.handleCallerChoice}
                                            open={false}
                                            valueKey="id"
                                            labelKey="name"
                                            multiple={false}
                                            keepOpen={false}
                                            includeFilter={true}
                                            clearFilterOnClose={true}
                                            placeholder="Caller Choice"
                                            dropdownHeight={200}
                                        />
                                    </Col>
                                    {/* <Col>
                                    <label>
                                        Patient Name <span className='colorRed'></span>
                                    </label><br/>
                                    <FormControl  type='text' id="patientName"  
                                        onChange={this.handleChange} value={patientName}
                                        placeholder="Enter Patient Name"
                                        />
                                    </Col> */}
                                    <Col md={2}> 
                                        <br/>
                                        <Button  variant="primary alignRight" disabled={!this.isValidate()} onClick={this.handleGenerate}><i class="fas fa-cogs" aria-hidden="true"></i> Generate Report</Button> 

                                    </Col>
                                    <Col md={2}> 
                                        <br/>
                                        {reportView === true && !_.isEmpty(reportData) ?
                                        <Button  variant="primary alignRight" onClick={this.handleDownload}><i class="fas fa-download" aria-hidden="true"></i> Download Report</Button>
                                        : null}
                                    </Col> 
                                    <Col></Col>
                                   
                            </Row> 
                        : null }   
                        
                        <Row><br/></Row>
                        </div>
                        {reportView && !_.isEmpty(reportData) === true ? 
                            <div className="alignRight"> 
                            <Button variant="outline-primary" className="btnColormain"  onClick={this.handleGenerate}><i class="fas fa-sync-alt" aria-hidden="true"></i> Refresh</Button>
                            </div>
                        : null }
                    {reportView === true ?
                    <div>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                {
                                    _.map(reportHeader, (obj, index) => {
                                        if(_.has(obj, "subHeaders")){
                                        lowerlength = obj.subHeaders.length                  
                                        _.map(obj.subHeaders, (tt) => {
                                            tt['key'] = obj.value                
                                            lowersubHeaders.push(tt)
                                        })
                                    } else {
                                        lowerfields.push(obj)
                                    }
                                    return <th colSpan={lowerlength}><center>
                                    {obj.label.toUpperCase()}</center>&nbsp;              
                                    </th>;
                                    })}
                                </tr>
                                {(!_.isEmpty(lowersubHeaders))?
                                <tr className="dualheaders">
                                    {_.map(lowersubHeaders, obj => {
                                    return <th>{obj.label.toUpperCase()}
                                    </th>;
                                    })}
                                </tr> : null }
                            </thead>
                            <tbody>
                                {  (!_.isEmpty(reportData) ) ?
                                    this.mapDatabodyDataLower(reportData, lowersubHeaders, lowerfields, startOffset, startCount, Per_Page)         :
                                    <tr><td  colSpan="10">No Record Found</td></tr>
                                } 
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


                    {reportCardView === true ? 
                    <Col md={6}>
                        <div className='alignLeft'>
                            REPORT
                        </div>
                        <div><br/><br/><br/></div>
                        <div className='addCampaign_box'>
                            <Row className='align-items-center'>
                                <Col md={4}>Total Number of Contacts<span className='colorRed'></span></Col>
                                <Col md={1}>:<span className='colorRed'></span></Col>
                                <Col md={4}><span className='colorBlue_bold'>120</span></Col>
                                <Col></Col>
                            </Row>
                            <Row><br/></Row>
                            <Row className='align-items-center'>
                                <Col md={4}>No of Contacts Calls<span className='colorRed'></span></Col>
                                <Col md={1}>:<span className='colorRed'></span></Col>
                                <Col md={4}><span className='colorBlue_bold'>80</span></Col>
                                <Col></Col>
                            </Row>
                            <Row><br/></Row>
                            <Row className='align-items-center'>
                                <Col md={4}>No of Contacts Connected<span className='colorRed'></span></Col>
                                <Col md={1}>:<span className='colorRed'></span></Col>
                                <Col md={4}><span className='colorBlue_bold'>60</span></Col>
                                <Col></Col>
                            </Row>
                            <Row><br/></Row>
                            <Row className='align-items-center'>
                                <Col md={4}>Ring Answer<span className='colorRed'></span></Col>
                                <Col md={1}>:<span className='colorRed'></span></Col>
                                <Col md={4}><span className='colorBlue_bold'>25</span></Col>
                                <Col></Col>
                            </Row>
                            <Row><br/></Row>
                            <Row className='align-items-center'>
                                <Col md={4}>Busy<span className='colorRed'></span></Col>
                                <Col md={1}>:<span className='colorRed'></span></Col>
                                <Col md={4}><span className='colorBlue_bold'>15</span></Col>
                                <Col></Col>
                            </Row>
                            <Row><br/></Row>
                            <Row className='align-items-center'>
                                <Col md={2}><span className='colorblue'>Confirmed</span></Col>
                                <Col md={1}>:<span className='colorRed'></span></Col>
                                <Col md={2}><span className='colorBlue_bold'>42</span></Col>
                                <Col md={2}><span className='colorRed'>Cancelled</span></Col>
                                <Col md={1}><span className='colorRed'>:</span></Col>
                                <Col md={2}><span className='colorRed'>10</span></Col>
                                <Col ></Col>   
                            </Row>
                            <Row><br/></Row>
                            <Row className='align-items-center'>
                                <Col md={2}><span className='colorBlue'>Reshedule</span></Col>
                                <Col md={1}><span className='colorBlue'>:</span></Col>
                                <Col md={2}><span className='colorBlue'>3</span></Col>
                                <Col md={2}><span className='colorBlue'>Others</span></Col>
                                <Col md={1}><span className='colorBlue'>:</span></Col>
                                <Col md={2}><span className='colorBlue'>5</span></Col> 
                                <Col ></Col>  
                            </Row>
                            <Row><br/><br/><br/></Row>
                            <Row className='align-items-center'>
                                <Col md={2}> </Col>	
                                <Col md={4}> 
                               
                                 <Button  variant="primary alignRight" onClick={this.handleDownload}><i class="fas fa-download" aria-hidden="true"></i> Download Report</Button>  </Col>
                                <Col ></Col>	
                            </Row>
                        </div>
                    </Col>  
                    : null }

                </div>

			</div> 
        </div>
        )
    }
}
