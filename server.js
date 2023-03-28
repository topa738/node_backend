const express = require ('express')  //requiere --> import
const app=express()

const binary = require('mongodb').Binary;

const mongoose = require('mongoose');
//base de dato
main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect('mongodb+srv://topa738:Candela123@cluster0.tviizym.mongodb.net/?retryWrites=true&w=majority');
        mongoose.connection.on('error',({message})=>{
            console.error($(message));
        });
        // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
    }
const basicasmodel=require('./Data/bascias.js')
const codemodel=require('./Data/programacion.js')


const multer= require('multer');

const fs = require('fs');

const routerBasicas = require('./router/basicas');
const routerProgramacion = require("./router/programacion");
const routerfront = require("./router/front");

app.use('/Basicas',routerBasicas);
app.use('/Programacion',routerProgramacion);




const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        console.log(typeof file.fieldname,'por aca pasa')
        switch (file.fieldname){
            case 'Programacion':
                cb(null, 'uploads/Programacion/')
                break;
            case 'Basicas':
                cb(null, 'uploads/Basicas/')
                break;
            default:
                console.log('culquiera pa')
                cb(null, 'uploads/')
                break;
        }}
    ,
   filename: function (req,file,cb){
       cb("",file.originalname)
   }
})
const upload=multer( {
    storage:storage
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/html/blog.html");
})

app.get("/blog.css",(req,res)=>{
    res.sendFile(__dirname+"/css/blogstyle.css");
    //res.send("Todo Bien!");
})
app.get("/iconos/:icono",(req,res)=>{
    const icono= req.params.icono;
    res.sendFile(__dirname+"/iconos/"+icono);
    //res.send("Todo Bien!");
})
app.get("/archivo.css",(req,res)=>{
    res.sendFile(__dirname+"/css/archivosstyle.css");
    //res.send("Todo Bien!");
})





//POST
app.post("/filesB",upload.single('Basicas'),(req,res)=>{

    const date= new basicasmodel({//creador de la tabla/modelo BD
        nombre:req.body.Basicas[0],//nobre con el que se presenta el archivo
        descripcion:req.body.Basicas[1],//descripcion tranqui
        materia:req.body.Basicas[2],
        ruta:'uploads/Programacion/'+req.file.originalname,//ruta de la data
        tipo:'programacion',
        //materia
        nombrearchivo:req.file.originalname

    })
    date.save().then(() => console.log('LISTO'));
    res.send("Archivo cargado ");
}
)
app.post("/files",upload.single('Programacion'),(req,res)=>{

        const date= new codemodel({//creador de la tabla/modelo BD
        nombre:req.body.Programacion[0],//nobre con el que se presenta el archivo
        descripcion:req.body.Programacion[1],//descripcion tranqui
        materia:req.body.Programacion[2],
        ruta:'uploads/Programacion/'+req.file.originalname,//ruta de la data
        tipo:'programacion',
        //materia
        nombrearchivo:req.file.originalname

    })
    console.log(date)
    date.save().then(() => console.log('LISTO'));
       res.send("Archivo cargado ");
    }
)



app.listen(8080,()=> console.log("Server start"));