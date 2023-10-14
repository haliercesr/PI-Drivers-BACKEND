
const validateArray = (value) => {
    if (!Array.isArray(value) || value.length !== 2) {
        throw new Error('El campo debe ser un array con dos valores.');
    }
    

    if (typeof value[0] !== 'number' || typeof value[1] !== 'number') {
        throw new Error('Los valores en el campo deben ser números.');
    }


    if (value[0] <= 0) {
        throw new Error('El primer valor en el campo debe ser mayor que cero.');
    }

  
    if (value[1] >= 200) {
        throw new Error('El segundo valor en el campo debe ser menor que 200.');
    }

  
    if (value[0] >= value[1]) {
        throw new Error('El primer valor en el campo debe ser menor que el segundo.');
    }
};

module.exports = { validateArray }