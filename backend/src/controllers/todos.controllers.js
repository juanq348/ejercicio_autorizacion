import { database } from "../db/database.js";

// Obtener todas las tareas
export const getAllTodosCtrl = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const todos = database.todos.filter((todo) => todo.owner === req.user.id);

  res.json({ todos });
};

export const deleteTaskCtrl = (req, res) => {
  const id = req.user.id
  const deleteTd = database.todos.findIndex((todo) => todo.id === id)
  if (deleteTd === -1) {
    res.json({ mensaje: "Ese id de todos no existe" })
  } else {
    database.todos.splice(deleteTd, 1);
    res.json({ mensaje: "Se eliminó el libro elegido" })
  }
}

// export const tareasXid = (req, res) => {
//   const id = parseInt(req.params.id);
//   const usuarioId = database.todos.find((user) => user.id === id)
//   if (!usuarioId) {
//     return res.status(404).json({ message: "Tarea no encontrada" });
//   } {
//     res.json(usuarioId)
//   }
// }

export const updateTaskCtrl = (req, res) => {
  const { title, completed } = req.body;
  const isCompleteValue = completed === true || completed === 'true' ? 1 : 0;

  // Buscar el índice de la tarea que se desea editar
  const todoIndex = database.todos.findIndex((todo) => todo.id === parseInt(req.params.id, 10));

  if (todoIndex === -1) {
    // Si no se encuentra la tarea, devolver un error 404
    return res.status(404).json({ msg: "Tarea no encontrada" });
  } else {
    // Actualizar la tarea en el índice encontrado
    database.todos[todoIndex].title = title;
    database.todos[todoIndex].completed = isCompleteValue;

    // Devolver una respuesta exitosa
    return res.json({ msg: "Tarea actualizada correctamente", todo: database.todos[todoIndex] });
  }

}

export const createTaskCtrl = (req, res) => {
  const { title, completed } = req.body;
  const newTodo = {
    id: database.todos.length + 1, // Asumiendo que el ID es secuencial
    title,
    completed,
    owner: req.user.id // Asumiendo que tienes la ID del usuario desde el JWT
  };


  database.todos.push(newTodo);
  res.status(201).json({ todo: newTodo });
}