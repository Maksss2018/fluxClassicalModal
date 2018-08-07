import React, { Component } from 'react';
import storeState from '../stores/store';
import ItemsActions from '../actions/actions';
//import './App.css';

 function getStateFromStore () {
       return {
           isLoading :storeState.isLoading(),
           items : storeState.getItems()
       }
   };


const Max = React.createClass({
    getInitialState() {
        return getStateFromStore();
    },

    componentWillMount() {
        ItemsActions.loadItems();
    },

    componentDidMount() {
        ItemsActions.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        storeState.removeChangeListener(this._onChange);
    },

    handleNoteDelete(note) {
        ItemsActions.deleteItem(note.id);
    },

    handleNoteAdd(noteData) {
        ItemsActions.createItem(noteData);
    },

    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>NotesApp</h2>
                 {this.state.items}
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromStore());
    }
});

export default Max;