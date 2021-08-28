const Desafio2 = require('./src/clase.js');

let animes = new Desafio2('./src/data/animes.json');
let mensajes = new Desafio2('./src/data/mensajes.json');

const express = require('express');
const hadlebars = require('express-handlebars');
const app = express();
const PORT = 8080;
const { Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(PORT, () =>{
    console.log("servidor http://localhost:8080/")
});

app.engine(
    'hbs',
    hadlebars({
        extname: '.hbs',
        defaultLayout: 'index',
        layoutsDir:'./views'
    })
);

app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.set('views', './views');

app.get('/', (req, res) => {
    res.render('main', {layout: 'index'})
});

io.on('connection', async (socket) => {
    console.log('Usuario conectado')

    let listaAnimes = await animes.getAll();

    socket.emit('lista animes', listaAnimes) // Una vez que se obtuvo la lista de animes la manda como un mensaje
    
    socket.on('nuevo anime', async newAnime => {

        await animes.save(newAnime); // Se guarda el anime nuevo
    
        io.emit('lista animes', listaAnimes); // Manda la lista de animes actualizada
    })

    let listaMensajes = await mensajes.getAll();

    socket.emit('lista mensajes', listaMensajes) // Una vez que se obtuvo la lista de animes la manda como un mensaje

    socket.on('nuevo mensaje', async newMensaje => {

        await mensajes.save(newMensaje)

        io.emit('lista mensajes', listaMensajes)
    })

    socket.on('disconnect',() => { // Escucha eventos
        console.log('Usuario desconectado')
    })
})