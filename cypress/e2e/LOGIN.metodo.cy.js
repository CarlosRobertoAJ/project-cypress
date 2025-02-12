// <reference types="cypress" />

describe('realizar login', () => {
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

            expect(response.status).to.eq(401); 
            expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
        });
    });
});
it('POST - realizar login de forma errada', () => {
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            email: 'fulano1111111@qa.com',
            password: '1234123'
        },
        failOnStatusCode: false
    }).then((response) => {
        cy.log(response);
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq("Email e/ou senha inválidos");
    });
});
