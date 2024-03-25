import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';

export default class MessageShow extends Component {  
    handleCallBack = () =>{
      this.props.onCallBack()
      this.props.closeModal()
    }

    render(){
      return(
        <Dialog open={true} maxWidth='sm'  fullWidth={true} aria-labelledby="">
        <DialogTitle> </DialogTitle>
        <DialogContent>{this.props.message}
        <hr/>
        </DialogContent>
        <DialogActions> 
         <Button
        variant="contained"       
        className='mainContentBlue'
        size="medium"
        onClick={this.handleCallBack}
        >YES</Button>
        <Button
        variant="contained"
        className='closeContentBtn'
        size="medium"
        onClick={this.props.closeModal}
        >NO</Button>
       </DialogActions> 
      </Dialog>
      )
    }
    
 
}

  