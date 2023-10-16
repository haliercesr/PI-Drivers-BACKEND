const { getDriverId, getDriverName, getDrivers, postDriver } = require('../controllers/driversRouter');


//GET | /drivers

const getDriversHandler = async (req, res) => {
    try {
        response= await getDrivers();
        
         const nuevoResponse=response.length>0 && response.map(char=>{
            if(!char.name){
                char.name={forename:char.forename,surname:char.surname}
            }
            if(!char.image.url){
                char.image={url:char.image}
            }
            return char
        })

        return res.status(200).json(nuevoResponse);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });  //UNA MEJOR MANERA DE MANEJAR EL ERROR PUEDE SER DISCRIMINANDO A QUE INSTANCIA PERTENECE
    }
};


//GET | /drivers/:id

const getDriverIdHandler = async (req, res) => {
    //DIFERENCIAR LA SOLICITUD DE BUSCAR EN BD O EN LA API: NOSOTROS SABEMOS QUE EN LA API EL 
    //"id" ES NUMERICO Y EN LA BD EN STRING( UUID EN LOS MODELS). ENTONCES SI POR PARAMS NOS LLEGA UN "ID" DE TIPO NUMERICO 
    //BUSCAREMOS EN LA API Y SINO EN LA BD
    const { idDriver } = req.params

    const source = isNaN(idDriver) ? "bdd" : "api"   //con esto le ahorramos un paso al controller verificando que tipo de dato es ID,con esto PODEMOS DIFERENCIAR BUSQUEDAS DE UNA FUENTE EXTERNA A OTRA solo con el tipo de dato que nos llega.EJEMPLO: si id = "550e8400e29b41d4a716446655440000"(UUID es tipo string) sera "bdd"y si id=2(numero) sera (api)
    try {

        const response = await getDriverId(idDriver, source);
        if (response === null) return res.status(200).send("No se encontro al piloto")

        return res.status(200).json(response)

    } catch (error) {
        console.log(error.message)
         return res.status(400).json({ error: error.message }) 
        }
};


//GET | /drivers/name?="..."

const getDriverNameHandler = async (req, res) => {

    //   const nombre1 = (req.query.name).toLowerCase().split('')      //con estas funciones y las de abajo me permite traer el "nombre" con mayusculas o minusculas
    //   const nombreMayus=[...nombre1[0].toUpperCase(),...nombre1.slice(1,nombre1.length)].join('')
    const nombre1 = (req.query.name || '').toLowerCase(); // Asegúrate de que `name` esté definido y lo convierte en minúsculas
    const nombreFormateado = nombre1.charAt(0).toUpperCase() + nombre1.slice(1);

    try {
       
        const response = await getDriverName(nombreFormateado)
        console.log(response)
        if (response && response.length === 0) return res.status(200).send("Sin resutados")
        
        return res.status(200).json(response)

    } catch (error) {
        
         res.status(400).json({error: error.message })}
};

// POST | /drivers

const postDriverHandler = async (req, res) => {
    const { image, surname, forename, description, nationality, dob, selectedTeams } = req.body  //destructurin de un objeto, tambien se puede hacer de un array

    try {
        //image no la verifico por ahora
        if (!image || !surname || !forename || !description || !nationality || !dob || selectedTeams.length === 0) return res.status(400).json({ error: 'Faltan datos' })

        const response=await postDriver(image, surname, forename, description, nationality, dob, selectedTeams)

        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error)
    }
}

module.exports = {
    getDriversHandler,
    getDriverIdHandler,
    getDriverNameHandler,
    postDriverHandler,
}