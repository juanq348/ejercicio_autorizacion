import { Router } from "express";
import { getAllTodosCtrl, createTask, updateTask, deleteTask} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);

// Crear tarea
todosRouter.post("/", validarJwt, createTask)

// Actualizar tarea
todosRouter.put("/:id", validarJwt, updateTask)

//Eliminar tarea
todosRouter.delete("/:id", validarJwt, deleteTask)


export { todosRouter };
