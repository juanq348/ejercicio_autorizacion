export const todosPage = () => {
  // Crear el contenedor principal
  const container = document.createElement("div");
  container.className = "container mx-auto p-4 bg-gray-100";

  // Botón para volver a Home
  const btnHome = document.createElement("button");
  btnHome.className = "bg-blue-500 text-white px-4 py-2 rounded mb-4";
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  // Botón para agregar una tarea
  const botonAgregarTarea = document.createElement("button");
  botonAgregarTarea.textContent = "Agregar Tarea";
  botonAgregarTarea.className = "bg-green-500 text-white px-4 py-2 rounded mb-4 ml-2";
  botonAgregarTarea.addEventListener("click", () => {
    modalAgregarTarea.style.display = "block";
  });

  // Modal para agregar una nueva tarea
  const modalAgregarTarea = document.createElement("div");
  modalAgregarTarea.className = "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden";

  const modalAgregarContenido = document.createElement("div");
  modalAgregarContenido.className = "bg-white p-4 rounded";

  const modalAgregarTitulo = document.createElement("h2");
  modalAgregarTitulo.className = "text-xl font-bold mb-2";
  modalAgregarTitulo.textContent = "Agregar Tarea";

  const inputAgregarTitulo = document.createElement("input");
  inputAgregarTitulo.className = "border p-2 w-full mb-2";
  inputAgregarTitulo.type = "text";
  inputAgregarTitulo.placeholder = "Título de la tarea";

  const etiquetaAgregarCompletada = document.createElement("label");
  etiquetaAgregarCompletada.className = "block mb-2";
  etiquetaAgregarCompletada.textContent = "Completada";

  const inputAgregarCompletada = document.createElement("input");
  inputAgregarCompletada.type = "checkbox";
  inputAgregarCompletada.className = "mr-2";

  const botonAgregarGuardar = document.createElement("button");
  botonAgregarGuardar.className = "bg-green-500 text-white px-4 py-2 rounded";
  botonAgregarGuardar.textContent = "Guardar";

  const botonAgregarCancelar = document.createElement("button");
  botonAgregarCancelar.className = "bg-red-500 text-white px-4 py-2 rounded ml-2";
  botonAgregarCancelar.textContent = "Cancelar";

  modalAgregarContenido.append(modalAgregarTitulo, inputAgregarTitulo, etiquetaAgregarCompletada, inputAgregarCompletada, botonAgregarGuardar, botonAgregarCancelar);
  modalAgregarTarea.appendChild(modalAgregarContenido);

  container.appendChild(modalAgregarTarea);

  botonAgregarCancelar.addEventListener("click", () => {
    modalAgregarTarea.style.display = "none";
  });

  // Modal para editar una tarea
  const modalEditarTarea = document.createElement("div");
  modalEditarTarea.className = "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden";

  const modalEditarContenido = document.createElement("div");
  modalEditarContenido.className = "bg-white p-4 rounded";

  const modalEditarTitulo = document.createElement("h2");
  modalEditarTitulo.className = "text-xl font-bold mb-2";
  modalEditarTitulo.textContent = "Editar Tarea";

  const inputEditarTitulo = document.createElement("input");
  inputEditarTitulo.className = "border p-2 w-full mb-2";
  inputEditarTitulo.type = "text";
  inputEditarTitulo.placeholder = "Título de la tarea";

  const etiquetaEditarCompletada = document.createElement("label");
  etiquetaEditarCompletada.className = "block mb-2";
  etiquetaEditarCompletada.textContent = "Completada";

  const inputEditarCompletada = document.createElement("input");
  inputEditarCompletada.type = "checkbox";
  inputEditarCompletada.className = "mr-2";

  const botonEditarGuardar = document.createElement("button");
  botonEditarGuardar.className = "bg-green-500 text-white px-4 py-2 rounded";
  botonEditarGuardar.textContent = "Guardar";

  const botonEditarCancelar = document.createElement("button");
  botonEditarCancelar.className = "bg-red-500 text-white px-4 py-2 rounded ml-2";
  botonEditarCancelar.textContent = "Cancelar";

  modalEditarContenido.append(modalEditarTitulo, inputEditarTitulo, etiquetaEditarCompletada, inputEditarCompletada, botonEditarGuardar, botonEditarCancelar);
  modalEditarTarea.appendChild(modalEditarContenido);

  container.appendChild(modalEditarTarea);

  botonEditarCancelar.addEventListener("click", () => {
    modalEditarTarea.style.display = "none";
  });

  // Título de la página
  const title = document.createElement("h1");
  title.className = "text-2xl font-bold mb-4";
  title.textContent = "Lista de Tareas";

  // Crear la tabla
  const table = document.createElement("table");
  table.className = "w-full bg-white border";

  // Cabecera de la tabla
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  const headers = ["ID", "Título", "Completada", "Owner Id", "Acciones"];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.className = "border p-2";
    th.textContent = header;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);

  // Cuerpo de la tabla
  const tbody = document.createElement("tbody");

  table.append(thead, tbody);

  // Añadir elementos al contenedor
  container.append(btnHome, botonAgregarTarea, title, table);

  // Fetch para obtener los todos
  fetch("http://localhost:4000/todos", {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevas filas

      data.todos.forEach((todo) => {
        if (todo.id > 10) return;

        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.className = "border p-2";
        tdId.textContent = todo.id;

        const tdTitulo = document.createElement("td");
        tdTitulo.className = "border p-2";
        tdTitulo.textContent = todo.title;

        const tdCompletado = document.createElement("td");
        tdCompletado.className = "border p-2";
        tdCompletado.textContent = todo.completed ? "Sí" : "No";

        const tdOwner = document.createElement("td");
        tdOwner.className = "border p-2";
        tdOwner.textContent = todo.owner;

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "bg-red-500 text-white px-2 py-1 rounded mr-1";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: "DELETE",
            credentials: "include"
          }).then(() => {
            tr.remove(); // Elimina la fila de la tabla
          });
        });

        const botonEditar = document.createElement("button");
        botonEditar.className = "bg-yellow-500 text-white px-2 py-1 rounded";
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", () => {
          // Mostrar el modal de editar tarea
          inputEditarTitulo.value = todo.title;
          inputEditarCompletada.checked = todo.completed;
          modalEditarTarea.style.display = "block";

          botonEditarGuardar.onclick = () => {
            fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: inputEditarTitulo.value,
                completed: inputEditarCompletada.checked,
              }),
              credentials: "include"
            }).then(() => {
              // Actualizar la fila de la tabla
              tdTitulo.textContent = inputEditarTitulo.value;
              tdCompletado.textContent = inputEditarCompletada.checked ? "Sí" : "No";
              modalEditarTarea.style.display = "none";
            });
          };
        });

        const tdAcciones = document.createElement("td");
        tdAcciones.className = "border p-2";
        tdAcciones.append(botonEliminar, botonEditar);

        tr.append(tdId, tdTitulo, tdCompletado, tdOwner, tdAcciones);

        tbody.appendChild(tr);
      });
    });

  // Agregar el formulario de agregar tarea al contenedor
  const formularioAgregarTarea = document.createElement("form");
  formularioAgregarTarea.className = "space-y-2";

  formularioAgregarTarea.append(inputAgregarTitulo, etiquetaAgregarCompletada, inputAgregarCompletada, botonAgregarGuardar, botonAgregarCancelar);
  modalAgregarContenido.appendChild(formularioAgregarTarea);

  botonAgregarGuardar.addEventListener("click", (e) => {
    e.preventDefault();
    const nuevaTarea = {
      title: inputAgregarTitulo.value,
      completed: inputAgregarCompletada.checked,
    };

    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaTarea),
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.className = "border p-2";
        tdId.textContent = data.todo.id;

        const tdTitulo = document.createElement("td");
        tdTitulo.className = "border p-2";
        tdTitulo.textContent = data.todo.title;

        const tdCompletado = document.createElement("td");
        tdCompletado.className = "border p-2";
        tdCompletado.textContent = data.todo.completed ? "Sí" : "No";

        const tdOwner = document.createElement("td");
        tdOwner.className = "border p-2";
        tdOwner.textContent = data.todo.owner;

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "bg-red-500 text-white px-2 py-1 rounded mr-1";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
          fetch(`http://localhost:4000/todos/${data.todo.id}`, {
            method: "DELETE",
            credentials: "include"
          }).then(() => {
            tr.remove(); // Elimina la fila de la tabla
          });
        });

        const botonEditar = document.createElement("button");
        botonEditar.className = "bg-yellow-500 text-white px-2 py-1 rounded";
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", () => {
          // Mostrar el modal de editar tarea
          inputEditarTitulo.value = nuevaTarea.title;
          inputEditarCompletada.checked = nuevaTarea.completed;
          modalEditarTarea.style.display = "block";

          botonEditarGuardar.onclick = () => {
            fetch(`http://localhost:4000/todos/${data.todo.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: inputEditarTitulo.value,
                completed: inputEditarCompletada.checked,
                owner: nuevaTarea.owner
              }),
              credentials: "include"
            }).then(() => {
              // Actualizar la fila de la tabla
              tdTitulo.textContent = inputEditarTitulo.value;
              tdCompletado.textContent = inputEditarCompletada.checked ? "Sí" : "No";
              modalEditarTarea.style.display = "none";
            });
          };
        });

        const tdAcciones = document.createElement("td");
        tdAcciones.className = "border p-2";
        tdAcciones.append(botonEliminar, botonEditar);

        tr.append(tdId, tdTitulo, tdCompletado, tdOwner, tdAcciones);

        tbody.appendChild(tr);

        // Limpiar el formulario y ocultar el modal
        inputAgregarTitulo.value = '';
        inputAgregarCompletada.checked = false;
        modalAgregarTarea.style.display = "none";
      });
  });

  return container;
};