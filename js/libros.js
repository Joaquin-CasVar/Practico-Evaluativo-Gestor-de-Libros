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
    }

});

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
            <td>
                <button onclick='editarLibro(${index})'>Editar</button>
                <button onclick='eliminarLibro(${index})'>Eliminar</button>
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
});
