const filtrarTemps=(temRepetidos)=>{

// Unir todos los temperamentos en una sola cadena de texto
var textoTemperamentos = temRepetidos.join(', ');

// Dividir la cadena en palabras individuales
var palabras = textoTemperamentos.split(', ');

// Crear un objeto para almacenar la frecuencia de las palabras
var frecuenciaPalabras = {};

// Contar la frecuencia de cada palabra
for (var i = 0; i < palabras.length; i++) {
    var palabra = palabras[i].trim(); // Eliminar espacios en blanco
    if (frecuenciaPalabras[palabra]) {
        frecuenciaPalabras[palabra]++;
    } else {
        frecuenciaPalabras[palabra] = 1;
    }
}
const array=[]
// Imprimir la frecuencia de cada palabra
for (var palabra in frecuenciaPalabras) {
    array.push([palabra,": ",frecuenciaPalabras[palabra]]);
}

const tem=[]                    

 const array1=array.filter(arr=>arr[2]>20)
 
array1.forEach(element => {                              //filtro cada nombre de temperamento que 
    tem.push(element[0]) })                              //se repita mas de 20 y lo guardo en tem,

    return tem
}

module.exports={filtrarTemps}