const express = require ('express')  //requiere --> import
const app=express()
const multer= require('multer');
const fs = require('fs');
const Console = require("console");
let data = fs.readFileSync('./uploads/data.json');
let infomaterial=JSON.parse(data)

const routerMatematicas = require('./router/matematicas.js');
const routerProgramacion = require("./router/programacion");

app.use('/cursos/matematicas',routerMatematicas);
app.use('/cursos/programacion',routerProgramacion);



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


app.get("/Basicas",(req,res)=>{
    res.sendFile(__dirname+"/html/Basicas.html");
})
app.get("/Basicas/files",(req,res)=>{
    //return infomaterial.matematicas;
    res.setHeader('Content-Type',infomaterial.matematicas)
    res.end(JSON.stringify(infomaterial.matematicas));
})

app.get("/Basicas/descargar/:id",(req,res)=>{

    function buscar(jsondata,nombre){
        for (let i=0;i<jsondata.length;i++ ){
            if(nombre==jsondata[i].nombrearchivo){
                return jsondata[i].ruta
            }
        }
    }
    console.log(buscar(infomaterial.matematicas,req.params.id))


    res.download(__dirname+'/'+buscar(infomaterial.matematicas,req.params.id),req.params.id,
        function (err){
            if(err){
                console.log(err)
            }else{
                console.log('LISTO')
            }
        });
});
app.get("/Programacion",(req,res)=>{
    res.sendFile(__dirname+"/html/Programacion.html");
})
app.get("/Programacion/files",(req,res)=>{
    //return infomaterial.matematicas;
    res.setHeader('Content-Type',infomaterial.programacion)
    res.end(JSON.stringify(infomaterial.programacion));
})
app.get("/Programacion/descargar/:id",(req,res)=>{

    function buscar(jsondata,nombre){
        for (let i=0;i<jsondata.length;i++ ){
            if(nombre==jsondata[i].nombrearchivo){
                return jsondata[i].ruta
            }
        }
    }
    console.log(buscar(infomaterial.programacion,req.params.id))


    res.download(__dirname+'/'+buscar(infomaterial.programacion,req.params.id),req.params.id,
        function (error){
        if(error){
            console.log(error)
        }else{
            console.log('LISTO')
        }});
    });



//POST
app.post("/filesB",upload.single('Basicas'),(req,res)=>{

    crearObjeto(req.body.Basicas[0],req.body.Basicas[1],'uploads/Basicas/'+req.file.originalname,req.body.Basicas[2],'matematicas',req.file.originalname)
    res.send("Todo Bien!");

    }
)
app.post("/files",upload.single('Programacion'),(req,res)=>{

        crearObjeto(req.body.Programacion[0],req.body.Programacion[1],'uploads/Programacion/'+req.file.originalname,req.body.Programacion[2],'programacion',req.file.originalname)
        res.send("Todo Bien!");

    }
)

function crearObjeto(nombre,descripcion,ruta,materia,tipo,nombrearchivo){

    const Data={
       // id:infoCursos.matematicas.length,
        nombre:nombre,//nobre con el que se presenta el archivo
        descripcion:descripcion,//descripcion tranqui
        ruta:ruta,//ruta de la data
        data: new Date(),//cundo fue ingresado
        materia:materia,//materia
        nombrearchivo:nombrearchivo


    }
    infomaterial[tipo].push(Data)
    const data=JSON.stringify(infomaterial)
    fs.writeFile('./uploads/data.json',data,(error)=>{
        if(error){
            console.log(`Error: ${error}`)
        }else{
            console.log('ARCHIVO GENERADO CORRECTAMENTE ')
        }
    })
}


app.listen(8080,()=> console.log("Server start"));