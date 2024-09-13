import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  console.log(req.user.id);

  const todos = database.todos.filter((todo) => todo.owner === req.user.id);

  res.json({ todos });
};

export const createTask = async (req,res) =>{
  const {title, completed} = req.body

  if(!title){
    return res.status(400).json({msg:"Tiene que existir el título"});
  } else if(title === ""){
    return res.status(400).json({msg:"No puede ser un título vacío"});
  } else if(typeof title !== "string"){
    return res.status(400).json({msg: "Debe ser un string"});
  }

  if(completed === undefined){
    return res.status(400).json({msg:"Tiene que ingresar el estado de la tarea"})
  } else if(typeof completed !== "boolean"){
    return res.status(400).json({msg:"Debe ser un valor booleano"});
  }
  const newTask = {
    id: database.todos.length + 1,
    title,
    completed,
    owner: req.user.id,
  }
  
  database.todos.push(newTask);
  res.json({msg:"Tarea creada con éxito"})
}

export const updateTask = async (req,res) =>{
  const id = req.params.id;
  const {title, completed} = req.body;

  if(!title && completed === undefined){
    return res.status(400).json({msg:"Tiene que existir el título y el estado de la tarea"});
  } else if(title && title === ""){
    return res.status(400).json({msg:"No puede ser un título vacío"});
  } else if(title && typeof title !== "string"){
    return res.status(400).json({msg: "Debe ser un string"});
  } else if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ message: "El estado de la tarea debe ser un valor booleano" });
  }
  const todo = database.todos.find((todo) => todo.id === id);

  if(!todo){
    return res.status(404).json({msg:"No se encontro la tarea"});
  }

  todo.title = title;
  todo.completed = completed;
  res.json({msg:"Se actualizó la tarea con éxito"});

}

export const deleteTask = async (req, res) =>{
  const id = req.params.id;
  const index = database.todos.findIndex((todo) => todo.id===id);

  if(index === -1){
    return res.status(404).json({msg:"No se encontro la tarea"})
  }

  database.todos.splice(index, 1);
  res.json({msg:"Tarea eliminada con éxito"});
} 


