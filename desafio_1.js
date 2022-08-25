const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            fs.promises.readFile(this.file, 'utf-8')
                .then((data) => resolve(JSON.parse(data)))
                .catch((e) => {
                    fs.writeFileSync(this.file, '[]');
                    reject();
                })
        })
    }

    getById(number) {
        this.getAll().then((data) => console.log(data.find(item => item.id == number)))
        .catch((e) => console.log('No se enceontró el archivo'));
    }

    save(product) {
        this.getAll()
            .then((data) => {
                data.push({...product, id: data.length + 1});
                fs.promises.writeFile(this.file, JSON.stringify(data));
                console.log('Producto guardado con id: ' + (data.length));
            })
            .catch((e) => {
                product.id = 1;
                fs.writeFileSync(this.file, `[${JSON.stringify(product)}]`);
                console.log('Producto guardado con id: 1');
            })
    }

    deleteById(number) {
        this.getAll().then((data) => {
            const itemFind = data.find(item => item.id == number);
            const itemPosition = data.indexOf(itemFind);
            itemPosition !== -1 ? data.splice(itemPosition, 1) : console.log('Item no encontrado');
            fs.promises.writeFile(this.file, JSON.stringify(data));
        })
        .catch((e) => console.log('No se enceontró el archivo'));
    }

    deleteAll() {
        fs.promises.writeFile(this.file, '[]');
    }
}

const producto1 = new Contenedor('./productos.txt');

// producto1.getAll()
//     .then((response) => console.log(response))
//     .catch((error) => console.log('No se encontró el archivo y se creó uno nuevo.'))

// producto1.save({ title: 'titulo 1', price: 0, thumbnail: 'http://' });
// producto1.getById(1)
// producto1.deleteById(1);
// producto1.deleteAll();








