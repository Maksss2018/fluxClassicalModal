import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
class Addetor extends Component {
  constructor(){
    super();
    this.state={
       name:"",
       price: 0,
       description:"",
       inStoreg:false,
       orders: [],
       files:null,
       fileName:"",
       action:true
    };
    this.makeAnAction=this.makeAnAction.bind(this);
  }
  nameInput(e) {
      console.log("name : "+this.state.name);
    this.setState({
        name       : e.target.value
    });
  }
    priceInput(e) {
        
      console.log("name : "+this.state.price);
    this.setState({
        price      : e.target.value
    });
  }
      descriptionInput(e) {
    this.setState({
        description: e.target.value
    });
  }
        inStoregInput(e) {
    this.setState({
        inStoreg   : !this.state.inStoreg
    });
  }
  
  makeAnAction(){
     this.props.Action();
  }
  
  
  addItem(e){
      e.preventDefault();
   const newItem={
       name:this.state.name,
       price:this.state.price,
       description:this.state.description,
       inStoreg:this.state.inStoreg,
       orders:this.state.orders,
       imgArray:[],
       img:this.state.fileName
   };
/* Do`nt forget to update dataBase */
    let  file = this.state.files;
    this.props.addPhoto({ file, name: file.name });
    this.props.handleNoteAdd(newItem);
    newItem.imgArray.push(file.name);
    this.setState({name:"",price:0,description:"",inStoreg:false,orders:[],imgArray:[],img:""});    
  
  }
  
     uploadPhoto(e){
   this.setState({files:e.target.files[0],fileName:e.target.files[0].name});
 }
 
  render(){
      return (
          
         <Form className="mt-3" style={{display:(this.props.action?"none":" block")}} onSubmit={this.addItem.bind(this)} encType="multipart/form-data" method="POST" >
          <FormGroup row >
          <Label for="Photo" sm={3}>Photo</Label>
         <Col sm={10}>
          <Input onChange={this.uploadPhoto.bind(this)} type="file" name="file" id="Photo" />
         </Col>
          <FormText color="muted">
            Put some photo here if you wish
          </FormText>
        </FormGroup>
         <FormGroup row>
          <Label for="Name" sm={2}>Name</Label>
          <Col sm={10}>
            <Input onChange={this.nameInput.bind(this)} value={this.state.name} type="text" name="Name" id="Name" placeholder="enter dev. name " />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Price" sm={2}>Price</Label>
          <Col sm={10}>
            <Input onChange={this.priceInput.bind(this)} value={this.state.price} type="text" name="Price" id="Price" placeholder="enter dev. price" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input onChange={this.descriptionInput.bind(this)} value={this.state.description} type="textarea" name="Description" id="Description" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="inStore" sm={2}>Is availibal</Label>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input onChange={this.inStoregInput.bind(this)} check={this.state.inStoreg} type="checkbox" id="inStore" />{' '}
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button style={{display:(this.props.action?"none":" block")}}  >Submit</Button>
                  </Col>
        </FormGroup>
      </Form>
           )
  }
}


export default Addetor;