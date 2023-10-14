const arrayFilterRepeat=(arraySinFiltrar)=>{
    const arrayFiltrado = arraySinFiltrar.filter((value, index, self) => {
        if (value.raza !== null && value.raza) {
            return self.findIndex(item => item.raza === value.raza) === index;
        }
    })
    return arrayFiltrado
}

module.exports={arrayFilterRepeat}