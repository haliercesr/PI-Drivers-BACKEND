const separarArray = (array, separadorString) => {
    let array1 = []

    array.forEach(arr => {

        if (typeof arr === 'string' && arr !== null) {     // PARA ASEGURARNOS QUE SEAN STRINGS y FILTRAR VALORES NULL
            array1.push(arr);
        }
    })

    // UNIR LAS STRING Y SEPARARLAS POR COMAS ES MEJOR QUE PRIMERO SEPARAR CADA STRING POR COMAS Y LUEGO UNIRLAS
    const cadenaUnida = array1.join(separadorString);

    // DIVIDIR LAS CADENAS UNIDAS PARA OBTENER EL ARRAY
    const arregloFin = (cadenaUnida.split(separadorString));

    //QUITAR ESPACIOS
    const arregloSinEspacios=arregloFin.map(arr=>arr.trim())

    //QUITAR DUPLICADOS
    const arraySinDuplicados = [];
    for (let i = 0; i < arregloSinEspacios.length; i++) {
        if (!arraySinDuplicados.includes(arregloSinEspacios[i])) {
          arraySinDuplicados.push(arregloSinEspacios[i]);
        }
      }



    return arraySinDuplicados

}

module.exports = { separarArray }