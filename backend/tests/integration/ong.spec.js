//Testa a aplicação como um todo
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection') 

describe('ONG', () => {
    //executa antes de cada teste
    beforeEach(async() => {
        //desfaz todas as migrations
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    //executa após todos os testes
    afterAll(async() => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD2",
            email: "contato@teste.com",
            whatsapp: "4700000010",
            city: "Campinas",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});