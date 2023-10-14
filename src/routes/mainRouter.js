//DESDE AQUI SEPARO LAS RUTAS, SEGUN EL ENDPOINT QUE LLEGE
//PRIMERO VERIFICO QUE LAS RUTAS ESTEN BIEN Y LUEGO CREO LOS HANDLERS
const { Router } = require('express');
const driversRouter=require('./driversRouter');
const teamsRouter=require('./teamsRouter');


const mainRouter = Router();

mainRouter.use("/drivers",driversRouter);

mainRouter.use("/teams",teamsRouter);

module.exports = mainRouter;
