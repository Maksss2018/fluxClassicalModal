import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
class Addfile extends Component {
  constructor(){
    super();
    this.state={
       files:null
    };
  }
   uploadPhoto(e){
   this.setState({files:e.target.files[0]});
 }
  addPhoto(e){    
    e.preventDefault();
    let  file = this.state.files;
    
    for(var key in file){
    console.log("uploading file  "+key+" : "+file[key]);    
    }
     this.props.addPhoto({ file, name: file.name })
      
  }
  
  render(){
      return (
       <Form onSubmit={this.addPhoto.bind(this)} encType="multipart/form-data" method="POST" >
        <FormGroup row >
          <Label for="Photo" sm={3}>Photo</Label>
         <Col sm={10}>
          <Input onChange={this.uploadPhoto.bind(this)} type="file" name="file" id="Photo" />
         </Col>
          <FormText color="muted">
            Put some photo here if you wish
          </FormText>
        </FormGroup>
            <Button  >Upload</Button>
        </Form>
           )
  }
}


export default Addfile;