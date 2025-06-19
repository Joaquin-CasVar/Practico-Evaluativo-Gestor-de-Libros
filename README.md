# 📝 Práctico Evaluativo – Gestor de Libros
### 📚 Contexto
Vas a desarrollar un sistema web que permita a una persona gestionar su biblioteca personal de forma digital: registrar libros, ordenarlos, filtrarlos, editarlos, eliminarlos y ver estadísticas generales.
***
**Integrantes**

El práctico será realizado por grupo de 2 personas
***
### 📌 Requisitos obligatorios
#### 1. Formulario de carga de libros
Campos:
- 📘 Título (texto)
- ✍️ Autor (texto)
- 📅 Año de publicación (número)
- 📖 Género (texto o select) Ejemplo: Ficcion, terror, drama, poesía, etc

#### 2. Validaciones obligatorias
- Todos los campos deben estar completos.
- El año debe estar entre 1900 y el año actual.
- No se debe permitir cargar dos libros con el mismo título y autor (ignorar mayúsculas/minúsculas).
#### 3. Guardar libros en localStorage
- Cada vez que se agrega, edita o elimina un libro, debe actualizarse localStorage.
- Al recargar la página, deben mostrarse los libros guardados previamente.
#### 4. Mostrar libros en una tabla
La tabla debe mostrar:
- Número
- Título
- Autor
- Año
- Género
- Botones para editar y eliminar
#### 5. Editar un libro existente
- Al hacer clic en "Editar", debe completarse el formulario con los datos del libro y poder actualizarse.
#### 6. Eliminar un libro existente
- Al hacer clic en "Eliminar", debe quitarse el libro de la lista y del localStorage.
#### 7. Filtrar libros
- Input de búsqueda por título (coincidencia parcial).
- Select de géneros únicos para filtrar libros por género.
#### 8. Resumen estadístico
Mostrar en un recuadro los siguientes datos:
- Total de libros registrados
- Promedio del año de publicación
- Cuántos libros son posteriores al año 2010
- Libro más antiguo (mostrar título y año)
- Libro más reciente (mostrar título y año)
#### 9. Ordenar por año
- Botón para ordenar ascendente/descendente por año de publicación.
***
#### 🧠 Extras opcionales (bonus)
Si terminás todo lo anterior, podés agregar:
- Checkbox “¿Leído?” en el formulario
- Mostrar en el resumen cuántos libros fueron leídos / no leídos
- Filtro adicional para mostrar solo leídos / no leídos
#### ✅ Tecnologías permitidas
- HTML + JavaScript puro
- CSS
