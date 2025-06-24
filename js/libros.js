let libros = JSON.parse(localStorage.getItem("libros")) || [];

let editando = false;
let indiceEdicion = null;

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
    }

});

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

document.addEventListener("DOMContentLoaded", () => {
    renderizarLibros();
    actualizarGeneros();
});
