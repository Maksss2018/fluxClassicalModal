import mong from 'mongoose';
 const Schema = mong.Schema;
 const testSchema = new Schema ({
 name:{type:String},
 price: {type:Number},
 description:{type: String},
 inStoreg:{type:Boolean},
 id:mong.Schema.Types.ObjectId,
 orders: {type:Array},
 imgArray: {type:Array},
 img: {type: String}
 });
 
const Model = mong.model('Model', testSchema,'user');
