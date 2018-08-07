import AppDispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';

import api from '../API';

const ItemsActions = {
    loadItems() {
        
        AppDispatcher.dispatch({
            type: Constants.LOAD_ITEMS_REQUEST
        });
        api.list().then(({data}) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_ITEMS_SUCCESS,
                items: data //  then call it in store using map();  calling this array or object with dispather 
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_ITEMS_FAIL,
                error: err
            })
        );
    },

    createItem(note) {
        
        console.log("note.imgArray === "+note.imgArray);
        api.createItem(note)
        .then(() =>
            this.loadItems()
        )
        .catch(err =>
            console.error(err)
        );
    },
    deleteItem(noteId) {
        api.deleteItem(noteId)
        .then(() =>
            this.loadItems()
        )
        .catch(err =>
            console.error(err)
        );
    },
    upLaodFile(data) {
        
        AppDispatcher.dispatch({
            type: Constants.UPLOAD_PHOTO_REQUEST
        });
          
        api.addPhoto(data).then(({data}) =>
            AppDispatcher.dispatch({
                type: Constants.UPLOAD_PHOTO_SUCCESS,
                file:data,
                name:data.name
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.UPLOAD_PHOTO_FAIL,
                error: err
            })
        );
    }
};
export default ItemsActions;