import { Router } from "express";
import { getAllTodosCtrl, createTaskCtrl, updateTaskCtrl, deleteTaskCtrl} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);

// Crear tarea
todosRouter.post("/", validarJwt, createTaskCtrl)

// Actualizar tarea
todosRouter.put("/:id", validarJwt, updateTaskCtrl)

//Eliminar tarea
todosRouter.delete("/:id", validarJwt, deleteTaskCtrl)


export { todosRouter };
