const taskController = {};
const Task = require('../models/Task');


taskController.getAll = async (req, res)=>{
    try{
    
        const tareas = await Task.find().select(['-_id']);
    
        return res.status(200).json({    
            success: true,
            message: 'tareas encontradas',
            data: tareas
        });
    }catch(error){
        return res.status(500).json(
           { 
            success: false,
            message: 'error al mostrar las tascas',
            error: error.message    
        })
    }
};

taskController.create = async (req, res)=>{

    try { 
        const {titulo, status,  duration, userId} = req.body;
        if(!titulo || !status || !duration || !userId){
            return res.status(400).json({

                success: false,
                message: 'se requiere un titulo, status, duración y userId'
            });
        }
        const newTask ={
            titulo,
            status,
            duration,
            userId
        } 
       await Task.create(newTask);

    return res.status(200).json({
        success: true,
        message: 'Nueva tarea creada'
    });
        
    } catch (error) {
        return res.status(500).json(
            { 
             success: false,
             message: 'no se ha creado la tarea',
             error: error.message    
         })
    }

};

taskController.delete = async (req, res) => {
    try{
        const {titulo} = req.params;
        const task = await Task.deleteOne({titulo:titulo});

        return res.status(200).json({    
            success: true,
            message: 'tarea eliminada ',
            data : task
        });

    }catch(error){
        return res.status(500).json(
           { 
            success: false,
            message: `no se puede eliminar la tarea ${error}`,
        })
    }
};


module.exports = taskController;