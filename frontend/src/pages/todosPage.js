export const todosPage = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "flex-col", "items-center", "justify-center", "h-screen", "bg-gray-200");

  const btnHome = document.createElement("button");
  btnHome.classList.add("bg-blue-500", "text-white", "p-2", "rounded", "hover:bg-blue-600", "mb-4");
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");
  table.classList.add("w-1/2", "bg-white", "shadow-md", "h-[700px]", "overflow-y-scroll");

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Acciones";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);

  fetch("http://localhost:4000/todos", { credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("bg-red-500", "text-white", "p-2", "rounded", "mr-2");
        deleteButton.textContent = "Borrar";
        deleteButton.addEventListener("click", () => {
          tr.remove();
        });

        const updateButton = document.createElement("button");
        updateButton.classList.add("bg-blue-500", "text-white", "p-2", "rounded");
        updateButton.textContent = "Actualizar";
        updateButton.addEventListener("click", () => {
          showModal(todo); // Llamar al modal
        });

        td5.appendChild(deleteButton);
        td5.appendChild(updateButton);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(table);


  const addButton = document.createElement("button");
  addButton.classList.add("bg-green-500", "text-white", "p-2", "rounded", "mt-4");
  addButton.textContent = "Agregar Tarea";
  addButton.addEventListener("click", () => {
    showModal({ title: "", completed: false }); 
  });
  container.appendChild(addButton);

  const showModal = (todo) => {
    const modal = document.createElement("div");
    modal.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "bg-black", "bg-opacity-50", "flex", "justify-center", "items-center");

    const modalContent = document.createElement("div");
    modalContent.classList.add("bg-white", "p-6", "rounded", "shadow-md");

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = todo.id ? `Editando Tarea ${todo.id}` : "Agregar Nueva Tarea";
    modalContent.appendChild(modalTitle);

    const inputTitle = document.createElement("input");
    inputTitle.value = todo.title;
    inputTitle.classList.add("border", "p-2", "w-full", "mb-4");
    modalContent.appendChild(inputTitle);

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = todo.completed;
    modalContent.appendChild(completedCheckbox);
    modalContent.appendChild(document.createTextNode(" Completada"));

    const confirmButton = document.createElement("button");
    confirmButton.textContent = todo.id ? "Actualizar" : "Agregar";
    confirmButton.classList.add("bg-green-500", "text-white", "p-2", "rounded", "mr-2");
    confirmButton.addEventListener("click", () => {
      if (todo.id) {
        // Actualizar tarea existente
        const updatedTodo = {
          title: inputTitle.value,
          completed: completedCheckbox.checked,
        };

        fetch(`http://localhost:4000/todos/${todo.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Tarea actualizada:", data);
            modal.remove();
            window.location.reload(); 
          })
          .catch((error) => {
            console.error("Error al actualizar tarea:", error);
          });
      } else {
        const newTodo = {
          title: inputTitle.value,
          completed: completedCheckbox.checked,
        };

        fetch("http://localhost:4000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Tarea agregada:", data);
            modal.remove();
            window.location.reload(); 
          })
          .catch((error) => {
            console.error("Error al agregar tarea:", error);
          });
      }
    });
    modalContent.appendChild(confirmButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.classList.add("bg-red-500", "text-white", "p-2", "rounded");
    cancelButton.addEventListener("click", () => {
      modal.remove();
    });
    modalContent.appendChild(cancelButton);

    modal.appendChild(modalContent);
    container.appendChild(modal);
  };

  return container;
};
