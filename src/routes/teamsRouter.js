//TODOS LOS ENDPOINTS QUE TERMINAN EN "/teams" VAN AQUI, CUANTO MAS MODULARICE MEJOR (puedo separar routes por driversRoutes.js, teamsRoutes,etc.)
const { Router } = require('express');
const{getTeamsHandler}=require('../handlers/teamsRouterHandler')

const teamsRouter = Router();

teamsRouter.get('/',getTeamsHandler); 


module.exports = teamsRouter;