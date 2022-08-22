class Usuario {

	constructor(nombre, apellido, title, autores, mascotas){

		this.nombre = nombre;
		this.apellido = apellido;
		this.libros= [{titulo : title , autor : autores}];
		this.mascotas = mascotas
	}

	getFullName () {

		console.log(`Nombre completo: ${this.nombre} ${this.apellido}`);
	}

	addMascota (mascota){

		this.mascotas.push(mascota)
	}

	countMascotas(){

		return(this.mascotas.length)
	}

	addBook(book, actor){

		this.libros.push({titulo : book, autor : actor})
	}
	
	getBookNames(){

		let books = [];

		for(const recorrer in this.libros){

			books.push((this.libros[recorrer].titulo));
		}
		return books;
	}
}


const usuario = new Usuario('Luiggi', 'Marquez', ' Las dos torres torres' , 'JRR Tolkien', ['perro','pato','loro', 'lobo']);

usuario.getFullName();
usuario.addMascota('pajaro');
let cont = usuario.countMascotas();
console.log(cont)
usuario.addBook("El hobbit", "JRR Tolkien")
libros= usuario.getBookNames();
console.log(libros)
