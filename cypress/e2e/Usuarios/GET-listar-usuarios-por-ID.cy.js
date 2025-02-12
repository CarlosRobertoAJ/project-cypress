// <reference types="cypress" />

describe('Usuario', () => {
    it('GET - encontrar usuario por ID específico', () => {
        
        cy.criarUsuario().then((response) => {
            const userId = response.body._id;

            cy.listById(userId).then((response) => {
                cy.log(response);
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('nome');
                expect(response.body).to.have.property('email');
                expect(response.body).to.have.property('password');
                expect(response.body).to.have.property('administrador');
            });
        });
    });
});
   

