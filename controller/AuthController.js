const authController = {};
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

authController.getRegister = async (req, res)=>{
    try{

        const {name, email, password} = req.body;

        //VALIDAR CAMPOS

        if(!name || !email || !password){
            return res.status(400).json({

                success: false,
                message: 'Name, email, password are required '
            });

        }
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hash(password, salt); 
        console.log(encryptedPassword);

        // if(password > 6 ){
    
        //     return ('error ')
        // } 
            // const name = req.body.name;
            // const email = req.body.email;
            // const password = req.body.password;
    
            const newUser ={
                name,
                email,
                password: encryptedPassword
            } 
           await User.create(newUser);
    
        return res.status(200).json({
            success: true,
            message: 'User registered'
        });
    
    }catch(error){
        return res.status(500).json(
            { 
            success: false,
            message: 'error al mostrar Usuarios',
            error: error?.message|| error
        })
    }    
    
};

authController.login = async (req,res) => {

    try{

        const {email, password} = req.body;

        const user = await User.findOne({email:email});

            if(!email || !password){
                return  res.status(400).json({
                
                    success: false,
                    message: 'credenciales incorrectas'
                }
            );
        };

            if(!user){
                return  res.status(400).json({
                    
                        success: false,
                        message: 'credenciales incorrectas'
                    }
                );
            };
            
            const token = jwt.sign({user_Id: user._id, user_role: user.role}, process.env.JWT_SECRET, {expiresIn: '5h'})

            return res.status(200).json({
            success: true,
            message: 'user Loged',
            token: token
        });

        }catch(error){

            return res.status(500).json(
            { 
            success: false,
            message: 'no te has logeado con exito',
            error: error?.message|| error
        })
    }

}

authController.profile = async (req,res)=>{

    try {

        const {userId} = req.user_id;
      const user =   await User.findOne({_id: userId});

        return res.status(200).json({
            success: true,
            message: 'user profile',
            data: user
        });
        
    } catch (error) {
        return res.status(500).json(
            { 
            success: false,
            message: 'no tienes acceso al perfil',
            error: error?.message|| error
        })
    }
}

module.exports = authController;