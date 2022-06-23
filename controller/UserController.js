const userController = {};
const User = require('../models/User');

userController.getAll = async (req, res)=>{
    try{
    
        const user = await User.find().select(['name','-_id']);
    
        return res.status(200).json({    
            success: true,
            message: 'todos los Usuarios',
            data: user 
        });
    }catch(error){
        return res.status(500).json(
           { 
            success: false,
            message: 'error al mostrar Usuarios',
            error: error.message    
        })
    }
};

userController.getById = async (req, res) => {

    try{
        const {id} = req.params.id;
        const user = await User.find({id});

        return res.status(200).json({    
            success: true,
            message: 'todos los Usuarios',
            data: user 
        });
        
    }catch(error){

        return res.status(500).json(
            { 
             success: false,
             message: 'error al mostrar Usuarios',
             error: error.message    
        })
    }
};

userController.delete = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.deleteOne({_id:id});

        return res.status(200).json({    
            success: true,
            message: 'eliminsate el usuario ',
            data : user
        });

    }catch(error){
        return res.status(500).json(
           { 
            success: false,
            message: `no se puede eliminar usuario ${error}`,
        })
    }
};



module.exports = userController;