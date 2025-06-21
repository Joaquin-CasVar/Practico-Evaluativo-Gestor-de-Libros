let libros = JSON.parse(localStorage.getItem("libros")) || [];

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
});

const ordenarPorAnio = () => {
    const librosOrdenados = [...libros].sort((a, b) => {
        return ordenAscendente ? a.anio - b.anio : b.anio - a.anio;
    })

    ordenAscendente = !ordenAscendente;
    renderizarLibros(librosOrdenados);
}

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
});