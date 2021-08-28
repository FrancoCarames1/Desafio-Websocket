const fs = require("fs");
class Desafio2 {
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = nombreDeArchivo;
        this.data = []
    }
    async getAll() {
        try {
            let info = await fs.promises.readFile(this.nombreDeArchivo, "UTF-8");
            if (info){
                this.data =  JSON.parse(info);
                return (this.data)
            }
        } catch (error) {
            return
        }
    }
    async getById(numero) {
        let array = await this.getAll();
        let animeBuscado = array.find((x) => x.id === numero);
        if (animeBuscado === undefined) {
            console.log("Error, no hay ningún anime con ese id");
        } else {
            return animeBuscado;
        }
    }
    async deleteById(numero) {
        let array = await this.getAll();
        let posicionAnimeBuscado = array.findIndex((x) => x.id === numero);
        if (posicionAnimeBuscado === -1) {
            console.log("Error, no existe un anime con ese id");
        } else {
            array.splice(posicionAnimeBuscado, 1);
            let pasarloAJSON = JSON.stringify(array);
            await this.saveDocument(pasarloAJSON);
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreDeArchivo, "[]");
            console.log("Borrado");
        } catch (error) {
            console.log("Error");
        }
    }
    async save(objeto) {
        let array = await this.getAll();
        if (array) {
            let idMax = 0;
            array.forEach((e) => {
                if (e.id > idMax) {
                    idMax = e.id;
                }
            });
            objeto.id = idMax + 1;
            array.push(objeto);
            let pasarloAJSON = JSON.stringify(array,null, 2);
            await this.saveDocument(pasarloAJSON);
        }
    }
    async updateById(id, animeNuevo) {
        let array = await this.getAll();

        let posicionAnime = array.findIndex((anime) => anime.id === id);

        if (posicionAnime === -1){
            return ("No se encontró anime")
        }else{

            array[posicionAnime].title = animeNuevo.title;
            array[posicionAnime].mainCharacter = animeNuevo.mainCharacter;

            let pasarloAJSON = JSON.stringify(array);

            await this.saveDocument(pasarloAJSON)

            return (array[posicionAnime])
        }
    }
    async saveDocument(animes){
        try {
            await fs.promises.writeFile(this.nombreDeArchivo, animes);
        }
        catch (error) {
            console.log(error)
        }
    }
}
module.exports = Desafio2