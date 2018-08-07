import React, { Component } from 'react';
import { ListGroupItem, Badge, Tooltip, Button, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, } from 'reactstrap';
class Items extends Component {
  constructor(){
    super();
    this.state={
        tooltipOpen:false
        };
  }
  toggle() {
    this.setState({
        tooltipOpen: !this.state.tooltipOpen
        
    });
  }
  deleteThisItem(id){
      this.props.deleteItem(id);
  }
  render(){
      let parent =this.props;
      return (
          <ListGroupItem key={parent.index}  
           className="justify-content-between">Name : 
            <a href="#" id={"Tooltip"+parent.index}>{parent.name}</a> price: 
           <Badge color="red" className="text-color-red" >
           {parent.price} 
           </Badge>
        <Tooltip className=" tooltip-costumise m-0 " placement="right" isOpen={this.state.tooltipOpen} target={"Tooltip"+parent.index} toggle={this.toggle.bind(this)}>
        <Card  body inverse color="success" className="text-left m-0 ">
         <CardImg top width="100%" src={parent.img? window.location.origin+"/uploads/"+parent.img:"https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"} alt="Card image cap" />
            <CardBody>
          <CardTitle >{parent.name}</CardTitle>
          <CardSubtitle >{parent.price} $</CardSubtitle>
          <CardText>
          {parent.description}
          </CardText>
           </CardBody>
         </Card>
         </Tooltip>
           <Button onClick={this.deleteThisItem.bind(this)} outline color="danger">X</Button>
           </ListGroupItem>
           )
  }
}


export default Items;