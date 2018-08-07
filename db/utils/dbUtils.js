import mong from 'mongoose';
import conf from '../configs/dbconfig.json';
import  '../models/tp';

const Model= mong.model('Model'); 

export function dbConnection (){
    
const url=`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.name}`;
mong.connect(url, (err, client)=>{
         
    if(err){
        return console.log(err);
    }
    
    console.log(`mongodb is On - ${url}`);

    });
}
export function getDataList(){
   return  Model.find({},function(err, file) {
    console.log(err);
    console.log(file);  
    //de-bugging function
   //console.log( mong.set('debug', true).modelSchemas);
       
   });
}
export function addNewData(data){  
const  tp= new Model({
name:data.name,
price: data.price,
description:data.description,
inStoreg:data.inStoreg,
id:  this._id,
orders: data.orders,
imgArray: data.imgArray,
img:  data.img
   });
   return tp.save();
}

export function deleteItem(id){
   return   Model.findById(id).remove();
}
