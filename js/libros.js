let libros = JSON.parse(localStorage.getItem("libros")) || [];

const agregarLibro = (titulo, autor, anio, genero) => {
    libros.push({ titulo, autor, anio, genero });
    localStorage.setItem("libros", JSON.stringify(libros));
    renderizarLibros(); // Actualiza la tabla después de agregar
};

const renderizarLibros = (lista = libros) => {
    const tabla = document.getElementById("tablaLibros").querySelector("tbody");
    tabla.innerHTML = ""; // Limpiar la tabla antes de renderizar

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

document.addEventListener("DOMContentLoaded", () => {
    renderizarLibros();

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const anio = document.getElementById("anio").value;
        const genero = document.getElementById("genero").value;

        if (!titulo || !autor || !anio || !genero) {
            alert("Por favor, completa todos los campos.");
                return;
        }

        agregarLibro(titulo, autor, anio, genero);
        form.reset();
    });
});

function mostrarResumen() {}
function actualizarLibro() {}
