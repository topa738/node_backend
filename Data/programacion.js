const mongo=require('mongoose');


const codeShame=new mongo.Schema(
    {
        nombre:String,//nobre con el que se presenta el archivo
        descripcion:String,//descripcion tranqui
            materia:String,
        ruta:String,//ruta de la data
        tipo:String,
       //materia
        nombrearchivo:String,


    },{
        versionKey:false,
        timestamps:true
}
)
module.exports=mongo.model('programacion',codeShame);