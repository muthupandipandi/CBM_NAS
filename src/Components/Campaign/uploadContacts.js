import React, { Component } from 'react'
import _ from 'lodash';
import {Modal, Table, Pagination, Spinner, Button, Row, Col, FormControl, Form} from 'react-bootstrap';
import MessageShow from '../mesaageShow'
export default class UploadContacts extends Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
             campaignName: props.edit.campaignName ? props.edit.campaignName : '',
             campaignId: props.edit.campaignId ? props.edit.campaignId : '',
             fileName:'Choose File',
             clearMessage:false,
             saveMessage:false,
            
        }
      }
    
      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    handleClickOutside(event) {
        console.log(event)
        // if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            // Click occurred outside of the modal, prevent modal from closing
            event.stopPropagation();
        // }
    }
      validateForm() {
 
        const {fileName} = this.state
        if (fileName!='Choose File' && fileName.length>0 ){
            // if(!_.isEmpty(loggedinData)){
            // 	if(loggedinData.ldapEnabled){
                    return true
                // } else {
                // 	if(this.state.passwordIsValid && this.state.password && this.state.password?.length > 0){
                // 		return true
                // 	}
                }
        
       }
      handleChangefile = (e) => {
        const file = e.target.files[0]
        this.setState({fileName : e.target.files[0].name})
        this.setState({docDataList : file})
    
      }
      uploadFile = () => {
            const {docDataList,campaignName,campaignId} = this.state
            let formdata = new FormData();
            formdata.append("campaignName", campaignName);
            formdata.append("campaignId",campaignId)
            formdata.append("file", docDataList);
            // let obj = {
            //     'campaignName' : campaignName,
            //     'campaignId' : campaignId,
            //     'file' : docDataList
            // }
            this.props.action.uploadContacts(formdata)
            this.props.closeModal()
      }
      openClearMessage = () => {
		
        this.setState({clearMessage : true})
      }

      closeClearMessage = () => {
        this.setState({clearMessage : false})
      }
      openSaveClearMessage = () => {
		
		this.setState({saveMessage : true})
	  }

	  closeSaveClearMessage = () => {
		this.setState({saveMessage : false})
	  }
    render() {

        const {fileName, campaignName, campaignId,clearMessage,saveMessage} = this.state

        return (
            <Modal
            show={true}
            onHide={this.props.closeModal}
            dialogClassName="modal-120w"
            size="l"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
    keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Upload Contacts to {campaignName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='addCampaign'>
                        <Row className='align-items-center'>
                        <Col md={1}></Col>
                            <Col md={9}>                        
                                <Form.Group style={{width:'100%'}} className='fileposition'>
                                    <Form.File onChange={ (e) => this.handleChangefile(e) }
                                        className="custom-file-label-input"
                                        label={fileName}
                                        custom
                                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                        accept=".csv"   
                                        capture="environment"
                                        />
                                </Form.Group>
                            </Col>
                            
                            <Col> </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <br/>
                            <br></br>
                        </Row>
                        <Row className='align-items-center'> 

                            
                            <Col md={3}></Col>
                            <Col md={7}>  
                            <Row>
                                <Col md={5}>
                                <Button  variant="danger aligncenter" onClick={this.openClearMessage}> Close</Button> 
                                </Col>
                            
                                    <Col md={6}>
                                    <Button  variant="primary aligncenter" style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} disabled={!this.validateForm()} onClick={this.openSaveClearMessage}> <span><i className="fas fa-upload m-r-20" ></i>Upload</span></Button>
                                        </Col>             
                               
                                </Row>
                            </Col>
                            <Col md={2}></Col>
                        </Row> 
                        {clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
          {saveMessage ?
		  <MessageShow message='Are you sure you want to Upload the File?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.uploadFile} />
	  	  :null}
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
