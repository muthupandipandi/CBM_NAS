import React, { Component } from 'react';
import {Table, Pagination, Spinner, Button, Row, Col, FormControl} from 'react-bootstrap';
import { MDBTooltip} from 'mdbreact';
import ShowModalLogin from '../showModalLogin';
// import ViewRetryDetail from './viewRetryDetail';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-dropdown-select';
import {Picky} from 'react-picky';
import 'react-picky/dist/picky.css'; 
import moment from "moment";
import _ from 'lodash';

export default class AgentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:1,
            Per_Page:10,
            startDate : '',
            endDate : '',
            tempDate : '',
            tempEndDate : '',
            employeeId : '',
            reportView : false,
            reportCardView : false,
            generateBtnView : true,
            reportName : [],
            reportId : '',
            detailIndexId : '',
            detailView : false,
            userData:props.userData,
            reportList : [{'id' : '1', 'name' : 'AUDIT - LOGIN'}, {'id' : '2', 'name' : 'AUDIT - USER'}],

        };
      }

      componentDidMount(){
        console.log(this.props)
        this.props.RealtimeDashboard_Load()
        // this.fetchData();

        // Set interval to call fetchData function every 10 seconds
        this.interval = setInterval(this.props.RealtimeDashboard_Load, 10000);
      }
      componentWillUnmount() {
        // Clear the interval when the component unmounts to prevent memory leaks
        clearInterval(this.interval);
    }
      componentDidUpdate(prevProps, prevState) {
        if(!_.isEqual(prevProps.userData,this.props.userData)){
          this.setState({userData:this.props.userData})
        }
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
		    const {startDate, endDate, generateBtnView} = this.state
            if(startDate && startDate.length > 0 && endDate && endDate.length > 0 
                && generateBtnView === true)
                {
                    return true
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
           const {startDate,endDate,employeeId,reportId} = this.state
           let obj = {
               'startDate'  : startDate ,
               'endDate'    : endDate,
               'employeeId'  : employeeId
            }
            //console.log("OBJ",obj)
           if(reportId === '1') {
                this.props.generateAuditReport(obj)
           } else if (reportId === '2') {
                this.props.generateAuditUserReport(obj)
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
      
       mappingreturnData = (startOffset, startCount, Per_Page ) => {
       
        const {searchval, userData}= this.state
        const {loggedinData} = this.props
        
        if(!_.isEmpty(userData)){
          return _.map(userData, (val, index) => {
            if(index >= startOffset & startCount < Per_Page){
              startCount++;
              let completedPercentage = Math.round((val.answered / val.listLength) * 100)
              console.log(completedPercentage)
              // completedPercentage=0
              if(isNaN(completedPercentage)){
                completedPercentage=0
              }
              let pendingPercentage = 100 - completedPercentage;
              return(
                  <tr key={index}>
                    <td><span className='colorblack'>{val.userId}</span></td>
                                    <td className='text-left'><span className='colorblack '>{val.device}</span></td>
                                    {/* <td>{moment(val.startDate).format('DD-MM-YYYY HH:mm:ss')}</td> */}
                                  
                                    <td className='text-center'><span className='colorblack '>{val.login==true?'Logded In ':'Logged Out'}</span></td>
                                    <td className='text-center'><span className='colorblack '>{val.currentStatus}</span></td>
                                    <td className='text-center'><span className='colorblack '>{val.currentDuration}</span></td>
                                    <td className='text-center'><span className='colorblack '>{val.activeloginDuration}</span></td>
                                    <td className='text-center'><span className='colorblack '>{val.lastLogoutTime}</span></td>
                                    <td className='text-center'><span className='colorblack '>{val.notready}</span></td>
                                    <td className='text-center'><span className='colorblack '>{val.shortBreak}</span></td>
                                    

                                    {/* <td>{moment(val.endDate).format('DD-MM-YYYY')}</td> */}
                    {/* <td>{val.maxAdvNotice.split(":")[0]}<span className='colorblue'> hr ,</span>{val.maxAdvNotice.split(":")[1]}<span className='colorblue'> min</span> </td> */}
                    
                </tr>
            )
            } 
          })
        } else {
          console.log('hii')
          return (<tr><td colSpan="9"><center>No Record Found</center></td></tr>)
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
            this.setState({startDate : '', endDate : '', employeeId: '', tempDate:'', tempEndDate:''})
            this.setState({reportView : false, })
       }


    render() {
        const {isOpen,isPending,showMessage,message,userData,reportHeader } = this.props
        const {activePage, Per_Page, tempDate, tempEndDate, reportView, employeeId, reportCardView, reportList, reportName, reportId } = this.state
        let subHeaders=[];
        let fields=[];
        let length=1;
        let headerLength=1;
        let lowersubHeaders=[];
        let lowerfields=[];
        let lowerlength=1;

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

        // console.log("Report state : ",this.state)
        // console.log("Report props : ",this.props)

    return (
        <div className={isOpen ? "app_Content container-fluid" : "app_ContentSmall container-fluid"}>        
			{isPending && reportView ? <span className='spinner alignRight'>
			Loading... <Spinner animation="grow" role="status" size='lg'/>
				</span> : null}
			{(showMessage === true) ?
			<ShowModalLogin message={message} falseShowModalPopUp={this.props.RealtimeDashboarErrorClose}/> : null}
			
            {/* {detailView === true ? 
            <ViewRetryDetail view={userData ? userData[detailIndexId].callRetryDetail : []} action={this.props}  
             closeModal={this.closedetailView} />  : null } */}


			<div>
				<br/>
                <div>
                   
                    
                    
                    <div style={{ overflowX: 'auto' }}>
                    <Table responsive striped bordered hover>
                <thead>
                  <tr>   
                    <th>User Id</th>  
                    <th>Device</th>       
                    <th className='text-left'>Login</th>
                    <th className='text-left'>Current Status</th>
                    <th>Current Duration</th>
                    <th>Active Login Duration</th>
                    <th>Last Logout Time</th>
                    <th>Notready</th>
                    <th>ShortBreak</th>
                    
                    
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
                    


                  

                </div>

			</div> 
        </div>
        )
    }
}


