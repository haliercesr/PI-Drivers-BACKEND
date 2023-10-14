const axios = require('axios');
const URLdrivers = 'http://localhost:5000/drivers';

//GET | /teams

const getTeams=async()=>{ 

  return (await axios.get(`${URLdrivers}`)).data

}

module.exports = {getTeams};
