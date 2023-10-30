const app = require('../src/server.js');
const request = require('supertest');

describe("Test de RUTAS", () => {
    describe('GET /drivers/', () => {
        it('Responde con status: 200', async () => {
            const response = await request(app).get('/drivers/');  //con supertest hacemos request al servidor sin levantarlo
            expect(response.statusCode).toEqual(200)               //evaluamos la respuesta
        });
        
    })

    describe('GET /drivers/:id', () => {
        it('Responde con status: 200', async () => {
            const response = await request(app).get('/drivers/2');  
            expect(response.statusCode).toEqual(200)               
        });

        it('Responde un array que tuene dentro un objeto con las propiedades "name","dob","description","nationality","teams","image"', async () => {
            const response = await request(app).get('/drivers/2');  
            expect(response.body).toHaveProperty('[0].name');
            expect(response.body).toHaveProperty('[0].dob'); 
            expect(response.body).toHaveProperty('[0].image');  
            expect(response.body).toHaveProperty('[0].description'); 
            expect(response.body).toHaveProperty('[0].nationality');
            expect(response.body).toHaveProperty('[0].teams');        //las propiedades que quiero que esten
            expect(response.body).not.toHaveProperty('[0].age');      //propiedades que no quiero que esten
        });
        
    })

    describe('GET /drivers/name/', () => {
        it('Responde con status: 200', async () => {
            const response = await request(app).get('/drivers/name?name=nick');  
            expect(response.statusCode).toEqual(200)               
        });
        
    })

    describe('POST /drivers/', () => {
        it('Responde con status: 200', async () => {
            const response = await request(app).post('/drivers/');  
            expect(response.statusCode).toEqual(200)              
        });
        
    })

    describe('GET /teams', () => {
        it('Responde con status: 200', async () => {
            const response = await request(app).get('/teams/');  
            expect(response.statusCode).toEqual(200)              
        });
        
    })

})


