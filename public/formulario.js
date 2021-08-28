const socket = io.connect();

socket.on('lista animes', (listaAnimes) => { //Escucha lo que llega en lista anime

    document.getElementById('tablaAnime').innerHTML = listaAHtml(listaAnimes); // Inserta las filas creadas en el tbody

})

const listaAHtml = (listaAnimes) => listaAnimes.map( anime => //Convierte cada elemento de la lista en una fila de la tabla
    `
        <tr>
            <td>${anime.id}</td>
            <td>${anime.title}</td>
            <td>${anime.mainCharacter}</td>
            <td><img src=${anime.imgUrl}></td>
        </tr>
    `).join(' '); //Al principio aparecen con coma, con el join se cambia la coma por un espacio

document.getElementById('formulario').onsubmit = (event) =>{
    event.preventDefault()

    let title = document.getElementById('title').value;
    let mainCharacter = document.getElementById('mainCharacter').value;
    let imgUrl = document.getElementById('imgUrl').value;

    let animeNuevo = {title: title, mainCharacter: mainCharacter, imgUrl: imgUrl}

    socket.emit('nuevo anime', animeNuevo)
}

socket.on('lista mensajes', (listaMensajes) => { //Escucha lo que llega en lista mensajes

    document.getElementById('chat').innerHTML = listaMensajesAHtml(listaMensajes); // Inserta las filas creadas en el tbody

})

const listaMensajesAHtml = (listaMensajes) => listaMensajes.map( mensaje => //Convierte cada elemento de la lista en un p que tiene negrita, normal e italica
    `
        <p><b>${mensaje.emisor}</b>(${mensaje.fechaEmision}): <i>${mensaje.msg}</i></p>
    `).join(' ');

document.getElementById('mensajes').onsubmit = (event) =>{
    event.preventDefault()

    let msg = document.getElementById('msg').value;
    let fecha = new Date()
    let fechaEmision = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear() + ", " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
    let emisor = document.getElementById('emisor').value;

    let mensajeNuevo = {msg: msg, fechaEmision: fechaEmision, emisor: emisor}

    socket.emit('nuevo mensaje', mensajeNuevo)
}