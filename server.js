const express = require ('express')
const app=express();
const multer= require('multer');
const mimeType= require('mime-types');

const storage = multer.diskStorage({
   destination: 'uploads/',
   filename: function (req,file,cb){
       cb("",Date.now() + "." + mimeType.extension(file.mimetype))
   }

})
const upload=multer({
    storage:storage
})

app.get("/",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname+"/html/tecnologia.html");
})
app.post("/files",upload.single('avatar'),(req,res)=>{
    res.send("Todo Bien!");
    }

)
app.listen(8080,()=> console.log("Server start"));