import React, { Component } from 'react';
import storeState from '../stores/store';
import ItemsActions from '../actions/actions';
import {Container, Row, Col, ListGroup, Button} from 'reactstrap';
import './bootstrap.min.css';
import './style.css';
import Items from './Items';
import Addetor from './Addetor';
 function getStateFromStore () {
       return {
           isLoading :storeState.isLoading(),
           items : storeState.getItems()
       }
   };

class Max extends Component {
  constructor(){
    super();
     this.state = {
       items:[],
       hideForm:true
     };
     this._onChange=this._onChange.bind(this);
  }
   /*Flux implemntation Start */
   componentDidMount(){
     this._onChange();
  }
    _onChange(){
        let result =getStateFromStore();
        this.setState({items:result.items})
    }
   
    componentWillMount() {
        ItemsActions.loadItems();
    }

    componentDidMount() {
        storeState.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        storeState.removeChangeListener(this._onChange);
    }
   
    handleNoteDelete(id) {
        ItemsActions.deleteItem(id);
    }

    handleNoteAdd(Data) {
        ItemsActions.createItem(Data);
    }
   handlePhotoAdd(photo) {
        ItemsActions.upLaodFile(photo);
    }
  /*Flux implemntation END */
  makeAnAction(){
     this.setState( {hideForm:!this.state.hideForm});
  }
  textBetterOrNot (){
    const obj = this.state;
    let array = obj.array;
    let items = obj.items.map((item,index)=>{
           return <Items  index={index} thisId={item.id} name={item.name} img={item.img}
           price={item.price} description={item.description} deleteItem={this.handleNoteDelete.bind(null,item.id)}  />
        
    });
    const text = <Container fluid className="App">
     <Row align="center">
     <Col sm="12"  md={{ size: 8, offset: 2 }}>    
     <div className="App">
     <Addetor  action={this.state.hideForm} addPhoto={this.handlePhotoAdd}  handleNoteAdd={this.handleNoteAdd}/>
         <Button className="mt-1" onClick={this.makeAnAction.bind(this)} >{this.state.hideForm?"Add new":"Close"}</Button>
     </div>
     </Col>
     </Row>
      <Row className="mt-3">
     <Col sm="12"  md={{ size: 8, offset: 2 }}>    
     <div className="App">
      <ListGroup>
         {items}
      </ListGroup>
     </div>
     </Col>
     </Row>
      
      
      
      </Container>;
    
    return  text;
  //document.getElementByClass("container").innerHTML(text);
  };
  render() {
      let resulteOfMethodBelou = this.textBetterOrNot ( this.state.alex, this.state.containerMassage);
     
     for(var key in this.state.items){
     console.log(":::"+key+"::::::::::::::::::"+this.state.items[key]);    
     };
    return resulteOfMethodBelou;
   }

}

export default Max;