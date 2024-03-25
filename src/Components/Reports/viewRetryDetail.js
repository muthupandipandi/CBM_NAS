import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTooltip, MDBInput, MDBNotification} from 'mdbreact';
import _ from 'lodash';
import {Modal, Table, Pagination, Spinner, Button, Row, Col, FormControl} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';
import moment from "moment";

export default class ViewRetryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
     lastRetryStatus : props.view.lastRetryStatus ? props.view.lastRetryStatus :'',
     retryCount : props.view.retryCount,
     retryHistory :!_.isEmpty(props.view.retryHistory)? props.view.retryHistory : [],
     detailView: true,
     historyView: false

    }
  }

  handleExpendDetail=()=>{
    this.setState({detailView : !this.state.detailView})
  }

  handleExpendHistory=()=>{
    this.setState({historyView : !this.state.historyView})
  }
 

  render() {
      const {isOpen,isPending,showMessage,message} = this.props
      const { lastRetryStatus,retryCount, retryHistory } = this.state
        // console.log("this state", this.state)
        // console.log("this props", this.props)
    return(
            <Modal
            show={true}
            onHide={this.props.closeModal}
            dialogClassName="modal-120w"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                RETRY DETAILS
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='addCampaign'>
                    <Row  className='title_color'>
                        <Col md={2}>
                        <span className='colorblack'> Retry Detail <i className={this.state.detailView === true ?"fas fa-caret-down fa-lg" : "fas fa-caret-right fa-lg" } style={{color:'gray'}} style={{color:'gray'}}  onClick={()=>this.handleExpendDetail()}></i></span>
                            
                        </Col>
                        <Col>
                        </Col>
                        <br/>
                    </Row>
                    <Row><br/></Row>
                    {this.state.detailView === true ?
                    <>
                    <Row className='align-items-center'>
                        
                        <Col md={3}>Last Retry Status<span className='colorRed'></span></Col>
                        <Col md={1}>:<span className='colorRed'></span></Col>
                        <Col md={2}><span className='colorBlue_bold'>{lastRetryStatus}</span></Col>
                        <Col md={3}>Retry Count<span className='colorRed'></span></Col>
                        <Col md={1}>:<span className='colorRed'></span></Col>
                        <Col md={2}><span className='colorBlue_bold'>{retryCount}</span></Col>
                        
                    </Row> <Row><br/></Row> </>: null }
                    
                    <Row className='title_color'>
                        <Col md={2}>
                         <span className='colorblack'> Retry History <i className={this.state.historyView === true ?"fas fa-caret-down fa-lg" : "fas fa-caret-right fa-lg" } style={{color:'gray'}}  onClick={()=>this.handleExpendHistory()}></i> </span>
                        </Col>
                        <Col>
                        </Col>
                        <br/>
                    </Row>
                    
                    {this.state.historyView === true && !_.isEmpty(retryHistory) ?
                    <>
                    <Row><br/></Row>
                    <Row className='align-items-center'>
                        <Col></Col>
                        <Col md={10}>
                        <Table responsive striped bordered hover>
                            <thead>
                            <tr>            
                                <th>Call Status</th>
                                <th>Date</th>
                                <th>Count</th>
                            </tr>
                            </thead>
                            <tbody>
                                {_.map(retryHistory, (val,i)=> {
                                    return(
                                        <tr>
                                            <td><span className={val.callStatus === 'ANSWERED' ? 'colorGreen' : 'colorRed'}>{val.callStatus}</span></td>
                                            {/* <td>{moment(val.date).format('YYYY-MM-DD')}<span className='colorblue'> {moment(val.date).format('HH:MM')} </span></td> */}
                                            <td>{val.date}</td>
                                            <td>{i+1}<span className='colorRed'></span></td>
                                        </tr>
                                );
                                })
                                
                                }
                            </tbody>
                        </Table>
                        </Col>
                        <Col></Col>
                    </Row>
                    </>
                    :null}
                    <Row><br/></Row>
                    <Row className='align-items-center'>
                        <Col md={4}></Col>	
                        <Col md={2}> <Button  variant="danger alignRight" onClick={this.props.closeModal}>Close</Button> 
                        </Col>
                        <Col md={2}></Col>
                        <Col md={4}></Col>	
                    </Row>
                </div>
            </Modal.Body>
            </Modal>
        )
  }
}
