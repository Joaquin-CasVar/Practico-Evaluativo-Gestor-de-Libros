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
    const leido = document.getElementById("leidoCheckbox").checked;

    if (!titulo || !autor || !anio || !genero) {
        alert("Por favor, completa todos los campos.");
    } else {
        if (editando) {
            libros[indiceEdicion] = { titulo, autor, anio, genero, leido };
            editando = false
            indiceEdicion = null;
            document.querySelector('button[type="submit"]').innerText = 'Cargar Libro'
        } else {
            const existe = libros.some(libro =>
                libro.titulo.toLowerCase() === titulo.toLowerCase() &&
                libro.autor.toLowerCase() === autor.toLowerCase()
            )

            if (existe) {
                alert('Este libro ya está cargado en el listado')
                return
            }

            libros.push({ titulo, autor, anio, genero, leido });
        }

        localStorage.setItem("libros", JSON.stringify(libros));
        form.reset();
        renderizarLibros();
        actualizarGeneros();
        renderizarResumen();
    }
});

const renderizarLibros = (lista = libros) => {
    const tabla = document.getElementById("tablaLibros").querySelector("tbody");
    tabla.innerHTML = "";

    lista.forEach(libro => {
        const indexReal = libros.indexOf(libro);
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td class="celda">${indexReal + 1}</td>
        <td class="celda">${libro.titulo}</td>
        <td class="celda">${libro.autor}</td>
        <td class="celda">${libro.anio}</td>
        <td class="celda">${libro.genero}</td>
        <td class="celda">${libro.leido ? "Sí" : "No"}</td>
        <td>
            <div class="botones">
                <button class="editar" onclick="editarLibro(${indexReal})">Editar</button>
                <button class="eliminar" onclick="eliminarLibro(${indexReal})">Eliminar</button>
            </div>
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

const filtrarPorLeido = () => {
    const valor = document.getElementById("filtroLeido").value;
    let resultado = libros;

    if (valor === "leido") {
        resultado = libros.filter(libro => libro.leido === true);
    } else if (valor === "noLeido") {
        resultado = libros.filter(libro => libro.leido === false);
    }

    renderizarLibros(resultado);
};

const ordenarPorAnio = () => {
    const librosOrdenados = [...libros].sort((a, b) => {
        return ordenAscendente ? a.anio - b.anio : b.anio - a.anio;
    });

    ordenAscendente = !ordenAscendente;
    renderizarLibros(librosOrdenados);
};

const editarLibro = (index) => {
    const libro = libros[index];
    document.getElementById("titulo").value = libro.titulo;
    document.getElementById("autor").value = libro.autor;
    document.getElementById("anio").value = libro.anio;
    document.getElementById("genero").value = libro.genero;
    document.getElementById("leidoCheckbox").checked = libro.leido;

    document.querySelector('button[type="submit"]').innerText = 'Editar Libro';
    editando = true;
    indiceEdicion = index;
};

const eliminarLibro = (index) => {
    libros.splice(index, 1);
    localStorage.setItem("libros", JSON.stringify(libros));
    renderizarLibros();
    actualizarGeneros();
    renderizarResumen();
};

const renderizarResumen = () => {
    const resumen = document.getElementById('resumenLibros');
    const total = libros.length;

    const sumaAnios = libros.reduce((acum, libro) => acum + parseInt(libro.anio), 0);
    const promedio = total > 0 ? Math.round(sumaAnios / total) : 0;

    const posteriores2010 = libros.filter(libro => libro.anio > 2010).length;

    const libroViejo = total > 0 ? libros.reduce((viejo, libro) => (libro.anio < viejo.anio ? libro : viejo)) : {};
    const libroNuevo = total > 0 ? libros.reduce((nuevo, libro) => (libro.anio > nuevo.anio ? libro : nuevo)) : {};

    const librosLeidos = libros.filter(libro => libro.leido === true).length;
    console.log(librosLeidos);

    resumen.innerHTML = `
        <p>Total de libros: ${total}</p>
        <p>Año de publicación promedio: ${promedio}</p>
        <p>Cantidad de libros posteriores a 2010: ${posteriores2010}</p>
        <p>Libro más antiguo: ${libroViejo.titulo || "-"} - ${libroViejo.anio || "-"}</p>
        <p>Libro más reciente: ${libroNuevo.titulo || "-"} - ${libroNuevo.anio || "-"}</p>
        <p>Libros leídos: ${librosLeidos}</p>
        <p>Libros no leídos: ${total - librosLeidos}</p>
    `;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("anio").setAttribute('max', anioActual);
    renderizarLibros();
    actualizarGeneros();
    renderizarResumen();
});
