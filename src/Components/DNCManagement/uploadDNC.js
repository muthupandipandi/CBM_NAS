import React, { Component } from 'react'
import _ from 'lodash';
import {Modal, Table, Pagination, Spinner, Button, Row, Col, FormControl, Form} from 'react-bootstrap';

export default class UploadContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
             
             dncid: props.edit.dncid ? props.edit.dncid : '',
             fileName:'Choose File',
             dncName:props.edit ? props.edit.dncName : ''
            
        }
      }
    
      componentDidMount(){
      }

      handleChangefile = (e) => {
        const file = e.target.files[0]
        this.setState({fileName : e.target.files[0].name})
        this.setState({docDataList : file})
    
      }
      uploadFile = () => {
            const {docDataList,dncid,fileName,dncName} = this.state
            console.log(docDataList)
            let formdata = new FormData();
            
            formdata.append("dncid",dncid)
            formdata.append("file", docDataList);
            formdata.append("dncName", dncName);
            // let obj = {
            //     'campaignName' : campaignName,
            //     'campaignId' : campaignId,
            //     'file' : docDataList
            // }
            console.log(formdata)
            this.props.action.uploadDNC(formdata)
            this.props.closeModal()
      }
    
    render() {

        const {fileName, dncName, campaignId} = this.state

        return (
            <Modal
            show={true}
            onHide={this.props.closeModal}
            dialogClassName="modal-120w"
            size="l"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Upload Contacts to {dncName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='addCampaign'>
                        <Row className='align-items-center'>
                            <Col> </Col>     
                            <Col md={5}>                        
                                <Form.Group className='fileposition'>
                                    <Form.File onChange={ (e) => this.handleChangefile(e) }
                                        className="custom-file-label-input"
                                        label={fileName}
                                        custom
                                        />
                                </Form.Group>
                            </Col>
                            <Col md={5}>  
                                <br/>                      
                                <Button  variant="primary alignRight" onClick={this.uploadFile}> <span><i className="fas fa-upload m-r-20" ></i>Upload</span></Button>
                            </Col>
                            <Col> </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <br/>
                        </Row>
                        <Row className='align-items-center'> 
                            <Col> </Col>
                            <Button  variant="danger alignRight" onClick={this.props.closeModal}> Close</Button> 
                            <Col> </Col>
                        </Row> 
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
