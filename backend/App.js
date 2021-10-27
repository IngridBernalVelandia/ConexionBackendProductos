const express = require('express');
require ('dotenv').config();

//Creamos el servidor
const app = express();

//Exponemos el backend
const cors = require('cors');
app.use(cors());

//Capturamos el cuerpo de las peticiones
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Configuramos la conexion con mongo atlas
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.gvys3.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
const option = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(uri, option)
.then(() => console.log("Base de datos conectada correctamente"))
.catch((e) => console.log("Error en la conexion: ")+ e);

//Importamos las rutas
const{product_routes} = require('./routes');
//Uso de las rutas
app.use('/api/v1/product', product_routes);

//Ponemos el servidor a escuchar
app.listen(process.env.PORT, () => {console.log("Estoy a tu servicio en el puerto "+process.env.PORT)});
