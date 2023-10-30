const {getTeams}=require('../controllers/teamsRouter');
const { Teams } = require('../db')
const {separarArray}= require('../utils/separarArray')
const {filtrarTemps}=require('../utils/filtrarTemps')

const getTeamsHandler=async(req,res)=>{ 

    try{
    const response=await getTeams()

    const teamsRepetidos = response.map(char=>
        char.teams)
    
        //separo el array por comillas y los duplicados
    const teamsSeparado=separarArray(teamsRepetidos,',')
    
    teamsSeparado.forEach(async (tem) => {
        const Tem = await Teams.create({   //creo teams
          name: tem.toUpperCase(),
        });})

     const teamsFiltrados=filtrarTemps(teamsRepetidos)  //veo los que mas se repiten y los uso en el Frontend
     
 
    res.status(200).json(teamsFiltrados)
    }catch(error){ 
        console.log(error.message)
        return res.status(400).json({error:error.message})}

}



module.exports={
    getTeamsHandler}