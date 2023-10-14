//TODOS LOS ENDPOINTS DE "/drivers" VAN AQUI, CUANTO MAS MODULARICE MEJOR (puedo separar routes por driversRoutes.js, teamsRoutes,etc.)
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const{getDriversHandler, getDriverIdHandler, getDriverNameHandler, postDriverHandler}=require('../handlers/driversRouterHandler')



const driversRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


driversRouter.get('/',getDriversHandler); 
driversRouter.post('/', postDriverHandler);
driversRouter.get('/name',getDriverNameHandler);   //cambie el orden para que /name se verifique primero, si pongo id primero entonces el endpoint /name me da error porque name no existe como id string UUID
driversRouter.get('/:idDriver',getDriverIdHandler); 





module.exports = driversRouter;
