import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import * as db  from './db/utils/dbUtils';
import { serverPort } from './db/configs/dbconfig.json';

const app= express();


db.dbConnection();

app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.use(express.static("/uploads"));

   
app.get("/", (req, res)=>{
   res.send("Server ON");
   })
   
app.get("/getList", (req, res)=>{
db.getDataList().then(list=> res.send(list));
   });
app.post("/addItem", (req, res)=>{
let item=req.body;
console.log("req.body.dataItem == "+req.body);
db.addNewData(item).then(data=> res.send(data));
   });
   

const storage = multer.diskStorage({
  destination: './uploads',
  filename(req, file, cb) {
//    cb(null, `${new Date()}-${file.originalname}`);
     cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/addPhoto", upload.single('file'), (req, res)=>{
console.log("req.file.name == "+req.file.name);
//upload.single('file').then(data=> res.send(data));
   });
   
app.delete("/deleteItem/:id", (req, res)=>{
let id=req.params.id;
console.log("_______id__________"+id);
db.deleteItem(id).then(data=> res.send(data));
   });
//to start run in console  : webpack-dev-server -d --watch --host $IP --port $PORT --history-api-fallback --public $C9_HOSTNAME
const serverOn= app.listen(8081 ,()=>{console.log(`port ${serverPort}`)});
