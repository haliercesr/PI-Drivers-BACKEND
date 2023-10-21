const axios = require('axios');
const { Drivers, Teams } = require('../db')
const { Op } = require("sequelize");  //se utiliza Op para definir operadores de consultas en SQL, con Op podemos realizar busquedas mas complejas.
const {formatDataBDD}=require('../utils/formatDataBDD')

//Search By 'forename': "http://localhost:5000/drivers?name.forename={name}"
const URLdrivers = 'http://localhost:5000/drivers';



//GET | /drivers

const getDrivers = async () => {
    try{
     const response=await axios.get(`${URLdrivers}`)
     const driversAPi=response.data
     const driversBdd = await Drivers.findAll({
        include: [{ model: Teams, through: 'driver_team' }], // Incluir los teams asociados
    })

    const driversBddFormatted = formatDataBDD(driversBdd)  //formateo los datos de la base de datos

     const alldrivers = [...driversBddFormatted, ...driversAPi]
     return alldrivers

    }catch(error){
        throw error;
    }
}



//GET | /drivers/:id

const getDriverId = async (idDriver, source) => {
  
    const getDriverId = source === "api" ? (await axios.get(`${URLdrivers}/${idDriver}`)).data : await Drivers.findAll({where:{id:idDriver}});
    
    return getDriverId
   
}



//GET | /drivers/name?="..."

const getDriverName = async (nombre) => {

    try{
        if(nombre==='F1'){
            Drivers.destroy({
            where: {
              // Define las condiciones para la eliminación aquí
             // id: 1, // Por ejemplo, eliminar el usuario con ID 1
             }
          })
          Teams.destroy({
            where: {
              
             }
          })
          .then(() => {
            console.log('Registros eliminados con éxito.');
          })
          .catch((error) => {
            console.error('Error al eliminar los registros:', error);
          });
        }

    const driver = await Drivers.findAll(
        {
            where: {
                forename: {
                    [Op.iLike]: `%${nombre}`, // Búsqueda insensible a mayúsculas y minúsculas que contiene el nombre
                }
            }
        });
    
    if (driver.length !== 0) {
        return driver
    } else {
        
        const { data } = await axios(`${URLdrivers}`)
        
        const drivers1Filter = data.filter(driver => driver.name.forename.includes(nombre))
        return drivers1Filter
    }
}catch(error){

    console.error(error.message);
    throw new Error('Error al buscar por nombre');
}
}



//POST | /driver

const postDriver = async (image, surname, forename, description, nationality, dob, selectedTeams) => {
   
    try{
    
     const [createdDriver,created]=await Drivers.findOrCreate({                                                                 //model query: busca segun las condiciones en where y si no las encuentra crea una entrada segun las condiciones. Luego devuelve la instancia creada o encontrada.Created tiene un valor booleano
        where: { forename },
        defaults: {
            image,
            surname,
            description,
            nationality,
            dob
        }
    })

    if (!created) {
        return(created);
      }


    // Obtiene los IDs de los teams existentes o crea nuevos si no existen
  
const teamsIds = await Promise.all(selectedTeams.map(async (team) => {  //a mi array de teams realizo un mapeo para ver si existe ese team y si no existe se crea uno nuevo
                                                                                      
    const [teamCreated, created] = await Teams.findOrCreate({                  //para cada team se inicia una operacion asincronica uso async y await para esperar a que cada operacion termine 
      where: { name: team.toUpperCase() },                                    //  toUpperCase() para evitar que se cree otro team en minusculas, ademas la tabla de Team esta en mayusculas            //busco en mi tabla si existe los temperamentos, si no existe creo uno nuevo
    });                                                                               //Si no usara PROMISE.ALL tendria un array de promesas sin resolver porque estoy usando async y await
    return teamCreated.id;                                                            //luego retorno el id
    
  }));

  // Asocia los temperamentos al perro
  await createdDriver.setTeams(teamsIds);                  //Ya tengo el driver creado en mi tabla de "Driver" y el Id de cada team en la tabla "Team", ahora
                                                                     //me falta relacionar una tabla con la otra, esto lo logro hacer con
  return created

}catch(error){  
    console.error(error.message);
    throw Error(error) //throw Error(error.message) se pierde el seguimiento porque solo se devuelve el mensaje del error, throw Error(error) te permite rastrear cómo se llegó al punto donde se generó el error.
}                      //Por ejemplo, si tienes una función A que llama a una función B, que a su vez 
                       //llama a una función C, y ocurre un error en la función C, la pila de llamadas 
                       //contendría registros de activación que muestran la secuencia de llamadas: A -> B -> C. 


}

module.exports = { getDrivers, getDriverId, getDriverName, postDriver }