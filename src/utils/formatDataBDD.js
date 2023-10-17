const formatDataBDD=(arraySinFiltrar)=>{
    const driversBddFormatted = arraySinFiltrar.map(driver => (
        {
        ...driver.dataValues,
        name:{forename:driver.forename,surname:driver.surname},
        image:{url:driver.image},
        teams: driver.Teams.map(team => team.name).join(', '),
    }));
    return driversBddFormatted
}

module.exports={formatDataBDD}