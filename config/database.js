const mongoose = require('mongoose');

const db = () =>mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('coneccion establecida');
})
.catch((error)=>{
    console.log('conection filled',error);
});

module.exports = db;