// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Enviar formulario', () => {
    let name, email, subject, comment;

    beforeEach(() => {
        cy.visit('/feedback.html');
        name = faker.person.fullName();
        email = faker.internet.email();
        subject = faker.lorem.words(9);
        comment = faker.lorem.paragraph(9);
    });

    it('Submeter formulario', () => {
        cy.get('#feedback-title').should('contain.text', 'Feedback');
        cy.get('#name').should('have.value', '');
        cy.get('#name').type(name);
        cy.get('#email').should('have.value', '');
        cy.get('#email').type(email);
        cy.get('#subject').should('have.value', '');
        cy.get('#subject').type(subject);
        cy.get('#comment').should('have.value', '');
        cy.get('#comment').type(comment);
        cy.get('.btn-signin').click();
        cy.contains(`Thank you for your comments, ${name}. They will be reviewed by our Customer Service staff and given the full attention that they deserve.`);
    });
});
