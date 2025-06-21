let libros = JSON.parse(localStorage.getItem("libros")) || [];

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

    agregarLibro(titulo, autor, anio, genero);
    form.reset();
});

const agregarLibro = (titulo, autor, anio, genero) => {
    // Guarda en el array local
    libros.push({ titulo, autor, anio, genero });
    // Guarda en la local storage 
    localStorage.setItem("libros", JSON.stringify(libros));

    renderizarLibros(); // Actualiza la tabla después de agregar
    renderizarResumen();
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
            <td>
                <button onclick=''>Editar</button>
                <button onclick=''>Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
};



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
    renderizarLibros();
    renderizarResumen();
});
