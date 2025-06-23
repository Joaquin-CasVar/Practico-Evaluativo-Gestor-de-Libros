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
        return;
    }

    if (editando) {
        libros[indiceEdicion] = { titulo, autor, anio, genero };
        editando = false;
        indiceEdicion = null;
        document.querySelector('button[type="submit"]').innerText = 'Cargar Libro';
    } else {
        libros.push({ titulo, autor, anio, genero });
    }

    localStorage.setItem("libros", JSON.stringify(libros));
    
    form.reset();

    renderizarLibros();
    renderizarResumen();
    actualizarAutores();
});

const filtrarLibros = () => {
    const texto = document.getElementById("busqueda").value.toLowerCase();

    const librosFiltrados = libros.filter(libro => libro.titulo.toLowerCase().includes(texto));

    renderizarLibros(librosFiltrados);
};

const actualizarAutores = () => {
    const select = document.getElementById("filtroGenero");
    const generosUnicos = [...new Set(libros.map(libro => libro.genero))];

    select.innerHTML = `<option value="">Todos los géneros</option>`;
    generosUnicos.forEach(autor => {
        const option = document.createElement("option");
        option.value = autor.toLowerCase();
        option.textContent = autor;
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

    lista.forEach((libro, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.anio}</td>
            <td>${libro.genero}</td>
        `;
        tabla.appendChild(fila);
    });
};

const renderizarResumen = () => {
    const resumen = document.getElementById('resumenLibros');

};

document.addEventListener("DOMContentLoaded", () => {
    renderizarLibros();
    renderizarResumen();
    actualizarAutores();
});