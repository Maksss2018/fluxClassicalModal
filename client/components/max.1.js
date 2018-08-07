import React, { Component } from 'react';
import storeState from '../stores/store';
import ItemsActions from '../actions/actions';
import {Container, Row, Col} from 'reactstrap';
//import './App.css';

 function getStateFromStore () {
     console.log("storeState.isLoading()"+storeState.isLoading());
     console.log("storeState.isLoading()"+storeState.getItems()[0].name);
       return {
           isLoading :storeState.isLoading(),
           items : storeState.getItems()
       }
   };

class Max extends Component {
  constructor(){
    super();
     this.state = {
       alex:{
         name : "Alex",
       doYouGetIt : false
       },
       leoned:{name : "Leoned",
       doYouGetIt : true},
       igor:{name : "Igor",
       doYouGetIt : false},
       array:[{
         name : "Alex",
       doYouGetIt : false
       },{name : "Leoned",
       doYouGetIt : true},
       {name : "Igor",
       doYouGetIt : false}
       ],
       arrayForSelect:[],
       userStatus:false,
       userStatusRadio:false,
       containerMassage : true,
       formInput:"Max",
       a:1,
       formInputForSubmit:"",
       formInputPushArray:"",
       listOfEnviousPerson:["Jora", "Ura", "Dima", "etc"],
       nameSelect:"Alex",
       items:[]
     };
     this.alertMassage=this.alertMassage.bind(this);
     this.makeAnAction =this.makeAnAction.bind(this);
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
   
    handleNoteDelete(note) {
        ItemsActions.deleteItme(note.id);
    }

    handleNoteAdd(Data) {
        ItemsActions.createItm(Data);
    }
  /*Flux implemntation END */
  changeUser(e){
      let formInput = e.target.value,
      toChange =this.state.formInput.length-1>=0?this.state.formInput[0].toUpperCase()+this.state.formInput.slice(1):this.state.formInput,
      alex={name:toChange,doYouGetIt: true};
          
          this.setState({formInput, alex});
        
      console.log("input == "+e.target+"@!@!@!@!@@!@!@!@");  
      console.log("!@!"+e.target.value+"@!@!@!@!@@!@!@!@");
  }
  chakeUserStatus(e){
      let userStatus = !this.state.userStatus;
          this.setState({userStatus});
  } 
  radioUserStatus(e){
      this.setState({userStatusRadio:e.target.value});
  }
  changeUserSubmit(e){
      let formInputForSubmit = e.target.value;
          this.setState({formInputForSubmit});
  }
  changeUserPushArray(e){
      let formInputPushArray = e.target.value;
          this.setState({formInputPushArray});
  }
  changeName(name){
    this.setState({formInput:name});
  }
  changeSelectName(e){
    let  nameSelect = e.target.value;
    this.setState({nameSelect});
  }
  makeAnAction(){
   this.setState( {containerMassage:!this.state.containerMassage});
  }
  /**/
  formAction(e){
      
   this.setState({ alex:{ name:this.state.formInputForSubmit[0].toUpperCase()+this.state.formInputForSubmit.slice(1), doYouGetIt: true}});
   e.preventDefault();
  }/**/
  
  /**/
  formActionPushArray(e){
   let listOfEnviousPerson = this.state.listOfEnviousPerson;
   listOfEnviousPerson.push(this.state.formInputPushArray);
   this.setState({ listOfEnviousPerson:listOfEnviousPerson});
   e.preventDefault();
  }/**/
  textBetterOrNot ({name = "Max", doYouGetIt = true}, action){
    const obj = this.state;
    let array = obj.array;
    let items = obj.items.map((item,index)=>{
           return <li key={index} value={item.name} >User {item.name} id:{item._id}</li>
    });
    let unswear =doYouGetIt?"Yes":"NO";
    const fe = "They are far away from me";
    let cCs =action?"inline-block":"none";
    let list =obj.listOfEnviousPerson.map(function(item, index){
      return index!=0 ?<i key={index} >{item}, </i>: <i key={index}>I`m better then : {item}, </i> 
    });
    let more = unswear!="NO"? list :"not yet best! but I`m traying!";
    let newArray = obj.array.map((item,index)=>{
           return <option key={index} value={item.name} >{item.name}</option>
    });
    const text = <Container className="App">
        <span style={{display:cCs}}>
        <p className="App-intro">
          I think I`ve get it. So ,hello, busterds!! My name is {name}  <br/>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
           {name}, Are you shuer ?   <br/>
           {name}:"{unswear}!"<br/>
           {name}:"{more}!"<br/>
        </p></span>
     <div className="App">
       <button onClick={this.changeName.bind(this)} > Whant to know how it is going? Ask {name}</button>
       <button onClick={this.makeAnAction} >{action?"Hide":"Show"}</button>
     </div>
     <div className="App">
     
     <h1>Change name of user right now</h1>
     <input value={obj.formInput} onChange={this.changeUser.bind(this)} />
     </div>
     <div className="App">
     <h1>Change name of user</h1>
     <form onSubmit={this.formAction.bind(this)}>
     <input value={obj.formInputForSubmit} onChange={this.changeUserSubmit.bind(this)} />
     <input type="submit"/>
     </form>
     </div>
     
     <div className="App">
     <h1>Push an element to array</h1>
     <form onSubmit={this.formActionPushArray.bind(this)}>
     <input value={obj.formInputPushArray} onChange={this.changeUserPushArray.bind(this)} />
     <input type="submit"/>
     </form>
     </div>
     
     <div className="App">
     <h1>Is he get it ({obj.nameSelect}) ?  {(obj.userStatus?"Yes he is":"not yet")}</h1>
     <select value={obj.nameSelect} onChange={this.changeSelectName.bind(this)}>{newArray}</select>
     <input type="checkbox" check={obj.userStatus} onChange={this.chakeUserStatus.bind(this)} />
    <input name="userStatusRadio" type="radio" value="true" check={obj.userStatusRadio == true} onChange={this.radioUserStatus.bind(this)} />
    <input name="userStatusRadio" type="radio" value="false" check={obj.userStatusRadio == false} onChange={this.radioUserStatus.bind(this)} />
     </div>
     
     <div className="App">
     {items}
     </div> 
      </Container>;
    
    return  text;
  //document.getElementByClass("container").innerHTML(text);
  };
  alertMassage(){
    alert("!!!!!!!!!!!!!"+this.state.alex.name);
  }
  render() {
      let resulteOfMethodBelou = this.textBetterOrNot ( this.state.alex, this.state.containerMassage);
     
     for(var key in this.state.items){
     console.log(":::"+key+"::::::::::::::::::"+this.state.items[key]);    
     };
    return resulteOfMethodBelou;
  //  return <div className="App"><button onClick={this.textBetterOrNot.bind(this)} > Whant to know how it is going? Ask </button><div className="container"></div></div>
  //  return <div className="App"><button onClick={this.alertMassage} > Whant to know how it is going? Ask {this.state.alex.name}</button><div className="container"></div></div>
  }

}

export default Max;