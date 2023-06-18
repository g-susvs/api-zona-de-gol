const {Schema, model} = require('mongoose');

const CanchaSchema = Schema({
    limite_reservacion:{
        type:Array
    },
    nombre_local:{
        type:String,
        required:[true, 'El nombre de el local es obligatiorio']
    },
    descripcion:{
        type:String
    },
    precios:{
        type:Array
    },
    distrito:{
        type:String
    },
    direccion:{
        type:String
    },
    imagen:{
        type:String
    },
    calificacion:{
        type: Number,
        min:0,
        max:5,
    }
});

CanchaSchema.methods.toJSON = function () {
    const {__v , estado, ...data} = this.toObject();

    return data;
}

module.exports = model('Cancha',CanchaSchema);
