class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    // Métodos
    getFullName() { 
        console.log(`${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota) { 
        this.mascotas.push(mascota);
    }

    countMascotas() { 
        console.log(`${this.mascotas.length}`) 
    }

    addBook(name, author) {
        this.libros.push( {name: name, author: author} )
    }

    getBookNames() {
        const booksMapped = this.libros.map(elemento => elemento.name);
        console.log(booksMapped);
    }
}

const nuevoUsuario = new Usuario('Elon', 'Musk', [{name: 'Cómo ganar amigos e influir sobre las personas', author: 'Dale Carnegie'}], ['Shiba Inu']);

nuevoUsuario.getFullName();
nuevoUsuario.addMascota('Floki');
nuevoUsuario.countMascotas();
nuevoUsuario.addBook('Las 48 leyes del poder', 'Robert Greene')
nuevoUsuario.getBookNames();