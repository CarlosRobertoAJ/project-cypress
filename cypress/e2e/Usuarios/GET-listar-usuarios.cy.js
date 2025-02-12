// <reference types="cypress" />

describe('Usuario', () => {
    it('GET - lista de usuarios', () => {
        cy.listUsers().then((response) => {
            cy.log(response); 
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('quantidade').to.be.greaterThan(1);
            
            const randomIndex = Math.floor(Math.random() * 20); 
            const usuario = response.body.usuarios[randomIndex];
    
            expect(usuario).to.be.an('object');
            expect(usuario).to.include.all.keys('_id', 'nome', 'email', 'password');
        });
    });

    it('GET - listar usuario por ID', () => {
        cy.criarUsuario().then((response) => {
            const userId = response.body._id; 
            cy.listById(userId).then((response) => {
                cy.log(response);
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('nome');
            });
        });
    });
});