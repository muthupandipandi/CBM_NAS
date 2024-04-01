import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTooltip, MDBInput, MDBNotification} from 'mdbreact';
import _ from 'lodash';
import {Modal, Table, Pagination, Spinner, Button, Row, Col, FormControl} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';
export default class ViewContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
     ftpUrl : !_.isEmpty(props.ftpL)?props.ftpL :'',
     ftpUserName : !_.isEmpty(props.ftpU)?props.ftpU :'',
     ftpPassword :!_.isEmpty(props.ftpP)?props.ftpP :'',
     ftpFileName : !_.isEmpty(props.ftpF)?props.ftpF :'',
     nativeIntegration : false

    }
  }

 

  handleChange = (event) => {
    this.setState({
    [event.target.id]: event.target.value
    });
    
  }

  handleSubmit = () => {
    const { ftpUrl,ftpUserName, ftpPassword } = this.state

    let obj = { 
        'ftpLocation' : ftpUrl,
        'ftpUsername' : ftpUserName,
        'ftpPassword' : ftpPassword }
    this.props.handleBack(obj)
    this.props.closeModal()

  }

  render() {
      const {isOpen,isPending,showMessage,message} = this.props
      const { ftpUrl,ftpUserName, ftpPassword,ftpFileName, nativeIntegration } = this.state
        // console.log("this state", this.state)
        // console.log("this props", this.props)
    return(
            <Modal
            show={true}
            onHide={this.props.closeModal}
            dialogClassName="modal-120w"
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                SFTP DETAILS
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='addCampaign'>
                    <Row className='align-items-center'>
						<Col><input disabled={true} type="checkbox" checked={nativeIntegration}/>&nbsp;&nbsp;&nbsp;&nbsp;Native Integration <span className='colorBlue'> [ DB / API Call ]</span>  <span className='colorRed'>*</span></Col>
					</Row>
                    <Row>
                        <br />
                    </Row>
                    {!nativeIntegration?
                    <>
                    <Row className='align-items-center'>             
                            <Col md={2}>SFTP Loaction<span className='colorRed'></span></Col>
                            <Col ><FormControl autoFocus type='text' id="ftpUrl"  
                                     value={ftpUrl} disabled={true}
                                    placeholder="Enter Location"

                                    />
                                    
                                    {/* {(empStatus === 'failure') ? <span className="colorRed">&nbsp;****FTP path is must****</span>: null} */}
                            </Col>
                

                                <Col md={2}><span className='colorRed'></span></Col>
                                <Col>
                                
                                </Col>
                    </Row>
                    <Row>
                    
                        <br></br>
                    </Row>
                    <Row className='align-items-center'>             
                            <Col md={2}>SFTP FileName<span className='colorRed'></span></Col>
                            <Col ><FormControl autoFocus type='text' id="ftpFileName"  
                            disabled={true}
                                     value={ftpFileName}
                                    placeholder="Enter FileName"

                                    />
                                    
                                    {/* {(empStatus === 'failure') ? <span className="colorRed">&nbsp;****FTP path is must****</span>: null} */}
                            </Col>
                

                                <Col md={2}><span className='colorRed'></span></Col>
                                <Col>
                                
                                </Col>
                    </Row>
                    <Row>
                    
                        <br></br>
                    </Row>
                    <Row className='align-items-center'>             
                            <Col md={2}>SFTP UserName<span className='colorRed'></span></Col>
                            <Col ><FormControl autoFocus type='text' id="ftpUserName"  
                                     value={ftpUserName} disabled={true}
                                    placeholder="Enter User"

                                    />
                                    
                                    {/* {(empStatus === 'failure') ? <span className="colorRed">&nbsp;****FTP path is must****</span>: null} */}
                            </Col>
                

                                <Col md={2}><span className='colorRed'></span></Col>
                                <Col>
                                
                                </Col>
                    </Row>
                    <Row>
                    
                        <br></br>
                    </Row>
                    <Row className='align-items-center'>             
                            <Col md={2}>SFTP Password<span className='colorRed'></span></Col>
                            <Col ><FormControl autoFocus type='password' id="ftpPassword"  
                                     value={ftpPassword} disabled={true}
                                    placeholder="Enter Password"

                                    />
                                    
                                    {/* {(empStatus === 'failure') ? <span className="colorRed">&nbsp;****FTP path is must****</span>: null} */}
                            </Col>
                

                                <Col md={2}><span className='colorRed'></span></Col>
                                <Col>
                                
                                </Col>
                    </Row>
                    </>
                    :null}
                    <Row>
                    
                        <br></br>
                    </Row>

                    <Row className='align-items-center'>
                        <Col md={4}> </Col>	
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
