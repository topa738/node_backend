//conexion a base de dato
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhostq:27017/test',
    {userNewUrlParse:true,useUnifiedTopology:true}
)   .then(()=> console.log('Base de dato conectada '))
    .catch(e=> console.log(e))