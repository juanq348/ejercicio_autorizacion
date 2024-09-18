import { database } from "../db/database.js";

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
    res.json({ mensaje: "Tarea no encontrada"})
  } else {
    database.todos.splice(deleteTd, 1);
    res.json({ mensaje: "Se eliminó la tarea elegida" })
  }
}

export const updateTaskCtrl = (req, res) => {
  const { title, completed } = req.body;
  const isCompleteValue = completed === true || completed === 'true' ? 1 : 0;

  if (!title) {
    return res.status(400).json({ message: "El título es requerido" });
  } else if (typeof title !== "string") {
    return res.status(400).json({ message: "El título debe ser un string" });
  } else if (title.length < 3) {
    return res
      .status(400)
      .json({ message: "El título debe tener al menos 3 caracteres" });
  }

  if (completed === undefined) {
    return res
      .status(400)
      .json({ message: "El estado de la tarea es requerido" });
  } else if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "El estado de la tarea debe ser un booleano" });
  }

  const todoIndex = database.todos.findIndex((todo) => todo.id === parseInt(req.params.id, 10));

  if (todoIndex === -1) {
    return res.status(404).json({ msg: "Tarea no encontrada" });
  } else {
    database.todos[todoIndex].title = title;
    database.todos[todoIndex].completed = isCompleteValue;

    return res.json({ msg: "Tarea actualizada correctamente", todo: database.todos[todoIndex] });
  }
}

export const createTaskCtrl = (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "El título es requerido" });
  } else if (typeof title !== "string") {
    return res.status(400).json({ message: "El título debe ser un string" });
  } else if (title.length < 3) {
    return res
      .status(400)
      .json({ message: "El título debe tener al menos 3 caracteres" });
  }

  if (completed === undefined) {
    return res
      .status(400)
      .json({ message: "El estado de la tarea es requerido" });
  } else if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "El estado de la tarea debe ser un booleano" });
  }


  const newTodo = {
    id: database.todos.length + 1,
    title,
    completed,
    owner: req.user.id
  };

  database.todos.push(newTodo);
  res.status(201).json({msg:"Tarea creada con éxito", todo: newTodo });
  console.log("Tarea creada con éxito");
}