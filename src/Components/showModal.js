import React, { Component } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

export default class ShowModal extends Component {  
    constructor(props){
      super(props)
      this.state={
        errorlog:true
      }
    }      
    showFalse =() =>{
      this.setState({errorlog:false})
      this.props.falseShowModalPopUp()
    } 
    showtrue = () => {
        this.props.onCallback()
        this.setState({errorlog:false})
        this.props.falseShowModalPopUp()
    }

    render(){     
      return(
      <Modal show={this.state.errorlog}
      onHide={this.showFalse}
      dialogClassName="modal-90w shadowClass"
      size='md'
      aria-labelledby="contained-modal-title-vcenter"
      centered>          
      <Modal.Body>
      <Row>
        <Col md={12}> <span className='colorblack'>{this.props.message ? this.props.message: 'Something Went Wrong!!!'}</span></Col>
      
      </Row>
      <Row> <br/> </Row>
        <Row>
            <Col>
            </Col>
            <Col md={2}>
            <Button c variant="primary alignRight" onClick={this.showtrue}> YES </Button> &nbsp;
            </Col>
            <Col md={2}>
            <Button  variant="danger alignRight" onClick={this.showFalse}> NO </Button> &nbsp;
            </Col>
            <Col>
            </Col>
        </Row>
      
      </Modal.Body>
      </Modal>) 
    }
}

  