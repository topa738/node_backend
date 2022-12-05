const http = require('http');
const {infoCursos} = require('./Data/cursos')

const servidor = http.createServer((req, res)=>{
    const{method}=req;
    console.log(method)
    switch (method){

        case 'GET':
            return manejarSolicitudGET(req,res);
        case 'POST':
            console.log('pasa por aca')
            return manejarSolicitudPOST(req,res);
        default:
            console.log('metodo no puede ser manejado por el servidor:${method}');
    }

});

function manejarSolicitudGET(req,res){
    const path=req.url;
    if(path=='/'){
        res.status=200;
        res.end('Bienvenido perrro')
    }else if(path==='/cursos'){
        res.statusCode=200;
        res.end(JSON.stringify(cursos.infoCursos));

    }
}
function manejarSolicitudPOST(req,res){
    const path=req.url
    if(path=== '/cursos/programacion'){
        res.statusCode=200;
        res.end('El servidor recibio una solicitud POST para /cursos*programacion');

    }
}
servidor.listen(3000,()=>{
    console.log('El servidor esta escuchando');
})