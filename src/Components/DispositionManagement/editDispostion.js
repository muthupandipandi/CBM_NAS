import React, { Component } from "react";
import {Modal, Button, Row,FormControl, Col, InputGroup} from 'react-bootstrap';
import ShowModalLogin from '../showModalLogin';

import {Picky} from 'react-picky';
import DatePicker from "react-datepicker";
import Select from 'react-dropdown-select';
import moment from "moment";
//import TimePicker from 'react-time-picker';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-picky/dist/picky.css'; 
import MessageShow from '../mesaageShow'
import _, { toInteger } from 'lodash';
import { Link } from "react-router-dom";
 export default class EditDisposition extends Component {
	 constructor(props){
			super(props)
			this.modalRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
			this.state = {

				clearMessage:false,
		saveMessage:false,
                items: props.edit ? props.edit.dispCodeDetailsList : '', // State to hold list of items
      newItem: {
        code:'001',itemName: '',
        
      },	
				descriptions:props.edit ? props.edit.description : '',
                dispostionName:props.edit ? props.edit.dispositionName : '',
                businessHRView: false,
				dispostionId:props.edit ? props.edit.dispId : '',
				dispostionsStatus:true
				}; 
                
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
	 handleCallBack = () =>{
		/// this.props.onCallBack(this.state)
		 this.props.closeModal()
	   }
	   handleChange = (event) => {
		if (parseInt(event.target.maxLength)>=event.target.value.length){
		this.setState({
		[event.target.id]: event.target.value
		});
	}
		
	}
	listdatas = () => {
		console.log(this.props)
		let rolesData = _.cloneDeep(this.props.userData)
		console.log(rolesData)
		// rolesData = _.reject(rolesData,['roleId',1])
		return rolesData
	}

	  checkDispositionExistence = () => {
		const { userData, dispostionName } = this.state;
		const dispositionExists = this.listdatas().find(item => item.dispositionName === dispostionName);
		if (dispositionExists){
			
			this.setState({dispostionsStatus : false})
		} else{
			this.setState({dispostionsStatus : true})
		}
		
	  }
	   validateForm() {
		const {descriptions,
        dispostionName,dispostionsStatus} = this.state;	
		//name and desc **
		if(dispostionName && dispostionName.length > 0 && descriptions && descriptions.length > 0 && dispostionsStatus
		)
		 {
					 return true
				 
			}
		   
	   }
       handleInputChange = (index, event) => {
		const onlyLetters = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces

		if (onlyLetters.test(event.target.value) || event.target.value === '') {
			if (parseInt(event.target.maxLength)>=event.target.value.length){
        const { name, value } = event.target;
    const updatedItems = [...this.state.items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    this.setState({ items: updatedItems });
			}
		}
      }
      handleAddItem = () => {
		console.log(this.state.items[this.state.items.length - 1].itemName)
		if (this.state.items[this.state.items.length - 1].itemName!=''){
		const lastIndex = this.state.items.length > 0 ? parseInt(this.state.items[this.state.items.length - 1].code) : 0;
		const nextId = (lastIndex + 1).toString().padStart(3, '0'); // Format the ID with leading zeros
		const newItem = {
			code: nextId,
			itemName: ''
		};
    
		this.setState(prevState => ({
			items: [...prevState.items, newItem],
			newItem: { itemName: '' } // Reset newItem after adding
		}));
	}
      }
	  handleAllowCharacters=(event)=>{
		const onlyLetters = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces

		if (onlyLetters.test(event.target.value) || event.target.value === '') {
			if (parseInt(event.target.maxLength)>=event.target.value.length){
				this.setState({
					[event.target.id]: event.target.value})
				}

		}
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
	   handleSubmit =() => {  
		   const {loggedinData} = this.props; 	
		   const {descriptions,
			dispostionName,items,dispostionId} = this.state;	
		   let obj={
			'dispId':dispostionId,
			   "dispositionName" : dispostionName,
			   "description" : descriptions,
			   "dispCodeDetailsList" : items,
			   
		   }   
		   //console.log("Ad Campaign",obj)     
		   this.props.action.editDisposition(obj) 	 
		   this.props.closeModal()
	   } 

	   handleDeleteItem = (index) => {
        console.log(index)
        this.setState(prevState => ({
          items: prevState.items.filter((_, i) => i !== index)
        }));
      }
      handleBusinessHRView = () => {
        this.setState({businessHRView : !this.state.businessHRView})
    }


	render(){
		const {isOpen,isPending,showMessage,message} = this.props
		const { newItem, items,businessHRView,dispostionsStatus,clearMessage,saveMessage } = this.state;
		
		// console.log("creat state", this.state)
		// console.log("creat props", this.props)
		
		const {descriptions,
        dispostionName} = this.state;	
		const {timesList} = this.props.action	
		
		
	return(
		<div>        
			{/* {isPending ? <span className='spinner alignRight'>
			Loading... <Spinner animation="grow" role="status" size='lg'/>
				</span> : null} */}
			{(showMessage === true) ?
			<ShowModalLogin message={message} falseShowModalPopUp={this.props.CampaignEditErrorClose}/> : null}
			<Modal
            show={true}
            onHide={this.props.closeModal}
            dialogClassName="modal-120w"
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
			backdrop="static"
    keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
			Edit Disposition 
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
			<div>
				<br/>
				<div >
					
					<span className='alignRight colorRed'> * Indicates Required Field</span>
				</div>
				<div><br/><br/></div>

				<div className='addCampaign'>
					<div className="form_container">

						<Row className='align-items-center'>             
								<Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Disposition Name  <span className='colorRed'>*</span></Col>
								<Col md={3} ><FormControl  type='text' id="dispostionName"  
										 value={dispostionName}
										 onChange={this.handleAllowCharacters}
										placeholder="Enter Disposition Name"
										onBlur={this.checkDispositionExistence} maxLength={30}
										
										/>
										{(dispostionsStatus === false) ? <span className="colorRed">&nbsp;****Disposition name is already exits****</span>: null}
										
										
										
								</Col>
                                <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Description <span className='colorRed'>*</span></Col>
								<Col md={3} ><FormControl  type='text' id="descriptions"  
										 value={descriptions}
										 onChange={this.handleChange}
										placeholder="Enter Disposition Name"
										maxLength={100}
										
										/>
										
										
								</Col>

								

									{/* <Col md={2}>Active<span className='colorRed'></span></Col>
									<Col md={4}>
										<input type="checkbox" value="" onClick={this.handleCheck} checked={campaignActive}/>
									</Col> */}
                                    
						</Row>
                    

            <div>
        {/* Existing items */}
       
      </div>
                        
						
				    </div>
                    <div className="form_container">
						<Row>
							<Col onClick={this.handleBusinessHRView}>{businessHRView ? <i class="fas fa-caret-down fa-lg" /> : <i class="fas fa-caret-right fa-lg"/>}&nbsp;&nbsp;&nbsp;&nbsp;  Agent Dispostion</Col>
						</Row>
						{businessHRView?
						<>
							<Row>
								<br />
							</Row>
							{items.map((item, index) => (
          <Row key={index} className='align-items-center'>
             <Col md={2}>&nbsp;&nbsp;&nbsp;&nbsp; Code </Col>
          <Col md={2}>&nbsp;&nbsp;&nbsp;&nbsp; {item.code} </Col>
            <Col md={2}> &nbsp;&nbsp;&nbsp;&nbsp; Item Name </Col>

			{index !== items.length - 1 && (
				 <Col md={3}>
              <FormControl
                type='text'
                name='itemName'
                value={item.itemName}
                placeholder="Enter Disposition Name"
				maxLength={30}
				
                
              />
			   </Col>
			  )}
           {index === items.length - 1 && (
				 <Col md={3}>
              <FormControl
                type='text'
                name='itemName'
                value={item.itemName}
                placeholder="Enter Disposition Name"
				maxLength={30}
				onChange={(e) => this.handleInputChange(index, e)}
              />
			   </Col>
			  )}

            
            
            <Col md={2}>
            {/* {index !== items.length - 1 && (
            <span onClick={() => this.handleDeleteItem(index)}><i className="fas fa-times-circle m-r-20" ></i> </span>
    )} */}
    {index === items.length - 1 && (

              <span onClick={this.handleAddItem}><i className="fas fa-plus-square m-r-20" ></i> </span>
    )}
            </Col>
          </Row>
        ))}

        {/* New item */}
        {/* <Row className='align-items-center'>
          <Col md={2}>&nbsp;&nbsp;&nbsp;&nbsp; Code <span className='colorRed'>*</span></Col>
          <Col md={2}>&nbsp;&nbsp;&nbsp;&nbsp; 0001 <span className='colorRed'></span></Col>
          <Col md={2}>&nbsp;&nbsp;&nbsp;&nbsp; Item Description <span className='colorRed'>*</span></Col>
          <Col md={3}>
            <FormControl
              type='text'
              name='descriptions'
              value={newItem.descriptions}
              placeholder="Enter Item Description"
              onChange={this.handleInputChange}
            />
          </Col>
          <Col md={2}>
            {0 !== items.length - 1 && (
            <span onClick={this.handleDeleteItem}><i className="fas fa-times-circle m-r-20" ></i> </span>
    )}
    {0 === items.length - 1 && (

              <span onClick={this.handleAddItem}><i className="fas fa-plus-square m-r-20" ></i> </span>
    )}
            </Col>
        </Row> */}

        {/* Add button */}
       
							
						</> : null }
					</div>

                    <Row> <br/> </Row>
						<Row className='align-items-center'>
							<Col md={4}></Col>	
							<Col md={2}> <Button  variant="danger alignRight" onClick={this.openClearMessage}>Close</Button>
							</Col>
							<Col md={3}> <Button  variant="primary" style={{ cursor: this.validateForm() ? 'auto' : 'not-allowed' }} disabled={!this.validateForm()} onClick={this.openSaveClearMessage}>Update Dispostion</Button></Col>
							<Col md={3}></Col>	
						</Row>
					</div>
					{clearMessage ?
		      <MessageShow message='Are you sure you want to Close this page?' closeModal={this.closeClearMessage}
      		onCallBack={this.props.closeModal} />
	  	  :null}
{saveMessage ?
		  <MessageShow message='Are you sure you want to Update this Disposition?' closeModal={this.closeSaveClearMessage}
      		onCallBack={this.handleSubmit} />
	  	  :null}
			</div> 
			</Modal.Body>
            </Modal>
        </div>
		)
	}
 }

 

  