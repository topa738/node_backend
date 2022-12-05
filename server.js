const express = require ('express')  //requiere --> import
const app=express();
//const cursos = require('./cursos')
//app.use(bodyParse.urlencoded({extended: true}))
//app.use(bodyParse.json())
const multer= require('multer');
const mimeType= require('mime-types');
const Console = require("console");
const {infoCursos} = require("./Data/cursos");

const routerMatematicas = require('./router/matematicas.js');

const routerProgramacion = require("./router/programacion");

app.use('/cursos/matematicas',routerMatematicas);
app.use('/cursos/programacion',routerProgramacion);

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
    res.sendFile(__dirname+"/html/blog.html");
})
app.get("/tecnologia",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname+"/html/tecnologia.html");
})
app.get("/blog.css",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname+"/css/blogstyle.css");
    //res.send("Todo Bien!");
})
app.get("/cursos",(req,res)=>{
    //const lenguaje= req.params.lenguaje
    res.send(infoCursos);
    //res.send("Todo Bien!");
})
app.post("/files",upload.single('avatar'),(req,res)=>{
    console.log(req,"este es el console")
    res.send("Todo Bien!");
    }
)
app.post("/acumular",(req,res)=>{
        console.log(req,"este es el console")
    }
)

app.listen(8080,()=> console.log("Server start"));