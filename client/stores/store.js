import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';


const CHANGE_EVENT = 'change';

let _items = [];
let _uploadingFileName = "";
let _loadingError = null;
let _isLoading = true;
let _uploadingError = null;
let _isUploading = true;




const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading () {
        return _isLoading
    },
     isUploading(){
         return _isUploading
     },
     upLaodFileName(){
         return _uploadingFileName
     },
    getItems() {
        return _items
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});


AppDispatcher.register( function(action){
    
    switch(action.type) {
        case AppConstants.UPLOAD_PHOTO_REQUEST: 
            _isUploading = true;
      console.log("UPLOAD_PHOTO_REQUEST");
            TasksStore.emitChange();
            break;
        case AppConstants.UPLOAD_PHOTO_SUCCESS: 

       console.log("UPLOAD_PHOTO_SUCCESS");            
            _isUploading = false;
            _uploadingFileName = action.name;
            
            TasksStore.emitChange();
            break;
        case AppConstants.LOAD_ITEMS_REQUEST: 
            _isLoading = true;
        
            TasksStore.emitChange();
            break;

        case AppConstants.LOAD_ITEMS_SUCCESS: 
            _isLoading = false;
            _items = action.items.map(function (item,index) {
                console.log("item.imgArray =="+item.imgArray);
       return {
       name:item.name,
       price: item.price,
       description:item.description,
       inStoreg:item.inStoreg,
       id:item._id,
       orders: item.orders,
       imgArray: item.imgArray,
       img: item.img
             };
       } );
       _loadingError= null;
            TasksStore.emitChange();
            break;
        

        case AppConstants.LOAD_ITEMS_FAIL: 
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
    
        case AppConstants.UPLOAD_PHOTO_FAIL: 
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        

        default: 
        
       console.log(action);
            console.log('No such handler');
        
    }
});

export default TasksStore;