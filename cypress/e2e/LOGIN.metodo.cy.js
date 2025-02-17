// <reference types="cypress" />
import { faker } from '@faker-js/faker/locale/pt_PT';

describe('realizar login', () => {
    let usuarioCriado;

    beforeEach(() => {
        cy.criarUsuario().then((response) => {
            expect(response.status).to.eq(201); 
            usuarioCriado = response.body; 
        })
    });

    it('POST - realizar login', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                email: 'fulano@qa.com',
                password: 'teste'
            },
            failOnStatusCode: false
        }).then((response) => {
            cy.log(response);  
            console.log(response); 

            expect(response.status).to.eq(200); 
            expect(response.body).to.have.property('message', 'Login realizado com sucesso');
        });
    });
});

    it('POST - realizar login com credenciais inválidas', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                email: faker.internet.email(), 
                password: faker.internet.password() 
            },
            failOnStatusCode: false
        }).then((response) => {
            cy.log(response.status);
            cy.log(response.body);

            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
        });
    });