import axios from 'axios';

import { apiPrefix } from '../../db/configs/dbconfig.json';

export default {
    list() {
        return axios.get(`${apiPrefix}/getList`);
    },

    createItem(data) {
        return axios.post(`${apiPrefix}/addItem`, data);
    },

    deleteItem(noteId) {
        return axios.delete(`${apiPrefix}/deleteItem/${noteId}`);
    },
    addPhoto(Data) {
    let data = new FormData();
    
    data.append('file', Data.file);
    data.append('name', Data.name);
        
        return axios.post(`${apiPrefix}/addPhoto`,data );
    }
    
}