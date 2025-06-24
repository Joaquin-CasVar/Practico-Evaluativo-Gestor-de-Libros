let libros = JSON.parse(localStorage.getItem("libros")) || [];

let anioActual = new Date().getFullYear();
let editando = false;
let indiceEdicion = null;
let ordenAscendente = true;

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const anio = document.getElementById("anio").value;
    const genero = document.getElementById("genero").value.trim();

    if (!titulo || !autor || !anio || !genero) {
        alert("Por favor, completa todos los campos.");
    } else {
        if (editando) {
            libros[indiceEdicion] = { titulo, autor, anio, genero }
            editando = false
            indiceEdicion = null;

            document.querySelector('button[type="submit"]').innerText = 'Cargar Libro'
        } else {
            const existe = libros.some(libro => 
                libro.titulo.toLowerCase() === titulo.toLowerCase() && 
                libro.autor.toLowerCase() === autor.toLowerCase()
            )

            if (existe) {
                alert('Este libro ya esta cargado en el listado')
                return
            }
            // Guarda en el array local
            libros.push({ titulo, autor, anio, genero });
        }
        // Guarda en la local storage 
        localStorage.setItem("libros", JSON.stringify(libros));
        // Limpia el formulario
        form.reset();
        // Actualiza la tabla después de agregar
        renderizarLibros();
        actualizarGeneros();
        renderizarResumen();
    }

});

const renderizarLibros = (lista = libros) => {
    const tabla = document.getElementById("tablaLibros").querySelector("tbody");
    tabla.innerHTML = "";

    lista.forEach(libro => {
        // Obtener indice del array original
        const indexReal = libros.indexOf(libro)

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${indexReal + 1}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.anio}</td>
            <td>${libro.genero}</td>
            <td>
                <button onclick='editarLibro(${indexReal})'>Editar</button>
                <button onclick='eliminarLibro(${indexReal})'>Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
};

const filtrarLibros = () => {
    const texto = document.getElementById("busqueda").value.toLowerCase();
    
    const librosFiltrados = libros.filter(libro => libro.titulo.toLowerCase().includes(texto));

    renderizarLibros(librosFiltrados);
};

const actualizarGeneros = () => {
    const select = document.getElementById("filtroGenero");
    const generosUnicos = [...new Set(libros.map(libro => libro.genero))];

    select.innerHTML = `<option value="">Todos los géneros</option>`;
    generosUnicos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero.toLowerCase();
        option.textContent = genero;
        select.appendChild(option);
    });
};

const filtrarPorGenero = () => {
    const genero = document.getElementById("filtroGenero").value;
    if (genero === "") {
        renderizarLibros();
    } else {
        const generoFiltrados = libros.filter(libro => libro.genero.toLowerCase() === genero);
        renderizarLibros(generoFiltrados);
    }
};

const ordenarPorAnio = () => {
    const librosOrdenados = [...libros].sort((a, b) => {
        return ordenAscendente ? a.anio - b.anio : b.anio - a.anio;
    })

    ordenAscendente = !ordenAscendente;
    renderizarLibros(librosOrdenados);
}

const editarLibro = (index) => {
    const libro = libros[index]
    document.getElementById("titulo").value = libro.titulo;
    document.getElementById("autor").value = libro.autor;
    document.getElementById("anio").value = libro.anio;
    document.getElementById("genero").value = libro.genero;

    document.querySelector('button[type="submit"]').innerText = 'Editar Libro'
    editando = true
    indiceEdicion = index
}

const eliminarLibro = (index) => {
    libros.splice(index, 1);
    localStorage.setItem("libros", JSON.stringify(libros));
    renderizarLibros();
}

const renderizarResumen = () => {
    const resumen = document.getElementById('resumenLibros')

    // Total de libros registrados
    const total = libros.length

    // Promedio del año de publicación
    const sumaAnios = libros.reduce((acum, libro) => acum + parseInt(libro.anio), 0)
    const promedio = Math.round(sumaAnios / total)

    // Cuántos libros son posteriores al año 2010
    const posteriores2010 = libros.filter(libro => libro.anio > 2010).length

    // Libro más antiguo (mostrar título y año)
    const libroViejo = libros.reduce((viejo, libro) => (libro.anio < viejo.anio ? libro : viejo), libros[0])
    
    // Libro más reciente (mostrar título y año)
    const libroNuevo = libros.reduce((nuevo, libro) => (libro.anio > nuevo.anio ? libro : nuevo), libros[0])

    resumen.innerHTML = `
    <p>Total de libros: ${total}</p>
    <p>Año de publicación promedio: ${promedio}</p>
    <p>Cantidad de libros posteriores a 2010: ${posteriores2010}</p>
    <p>Libro más antiguo: ${libroViejo.titulo} - ${libroViejo.anio}</p>
    <p>Libro más reciente: ${libroNuevo.titulo} - ${libroNuevo.anio}</p>
    `
}

document.addEventListener("DOMContentLoaded", () => {
    const anio = document.getElementById("anio")
    anio.setAttribute('max', anioActual)
    renderizarLibros();
    actualizarGeneros();
    renderizarResumen();
});
