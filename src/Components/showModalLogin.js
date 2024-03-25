import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ShowModalLogin extends Component {  
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
    render(){   
      console.log(this.props)  
      return(
      <Modal show={this.state.errorlog}
      onHide={this.showFalse}
      dialogClassName="modal-90w shadowClass"
      size='md'
      aria-labelledby="contained-modal-title-vcenter"
      centered>          
      <Modal.Body>
      {this.props.message ? this.props.message: 'Something Went Wrong!!!'}
      <br/>
      <Button className="alignRight" onClick={this.showFalse}> OK </Button> &nbsp;
      </Modal.Body>
      </Modal>) 
    }
}

  