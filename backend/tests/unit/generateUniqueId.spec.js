//Teste unico para uma especifica função
const generateUniqueId = require('../../src/utils/generateUniqueId');


describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId();
        //expero que o id tenha 8 caracteres
        expect(id).toHaveLength(8);
    });
});