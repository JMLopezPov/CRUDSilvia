const Task = require("../models/task.js");

function createTask(req, res){
    const task = new Task();
    console.log("Creando nuestra primera tarea");
    console.log(req.body)
    const params = req.body;
    task.title = params.title;
    task.description = params.description;

    try{
        const taskStore = task.save();
        if(!taskStore){
            res.status(400).send({msg: "No se ha guardado la tarea"});
        }else{
            res.status(200).send({task: taskStore})
        }
    }catch(error){
        res.status(500).send({msg: "Error inesperado"});
        res.status(500).send(error);
    }
}

async function getTasks(req,res){
    try{
        const tasks = await Task.find().sort({created_at: -1});

        if(!tasks){
            res.status(400).send({msg: "Error al obtener las tareas"});
        }else{
            res.status(200).send(tasks);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getTask(req,res){
    const idTask = req.params.id;
    try{
        const taskBuscada = await Task.findById(idTask);
        if(!taskBuscada){
            res.status(400).send({msg: "No se ha encontrado la tarea indicada"});
        }else{
            res.status(200).send(taskBuscada);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function updateTask(req,res){
    const idTask = req.params.id;
    const params = req.body;

    try{
        const taskUpdate = await Task.findByIdAndUpdate(idTask,params);

        if(!taskUpdate){
            res.status(400).send({msg: "No se ha podido actualizar la tares indicada"});
        }else{
            res.status(200).send({msg: "Actualización completada"});
        }
    }catch(error){
        res.status(500).send(error);
    }

}

async function deleteTask(req,res){
    const idTask = req.params.id;
    try{
        const taskEliminar = await Task.findByIdAndDelete(idTask);
        if(!taskEliminar){
            res.status(400).send({msg: "No se ha podido eliminar la tarea indicada."});
        }else{
            res.status(200).send(taskEliminar);
        }
    }catch(error){
        res.status(500).send(error);
    }
}


module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
}