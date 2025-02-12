// <reference types="cypress" />
import { faker } from '@faker-js/faker/locale/pt_PT';

describe('Usuário - Editar', () => {
    let userId;

    beforeEach(() => {
        cy.criarUsuario().then((response) => {
            expect(response.status).to.eq(201);
            userId = response.body._id;
        });
    });

    it('PUT - Editar usuário existente (200)', () => {
        const updatedData = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        };

        cy.updateUser(userId, updatedData).then((response) => {
            console.log("Resposta ao editar", response);

            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
        });
    });

    it('PUT - Criar usuário via PUT (201)', () => {
        const newUser = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        };

        cy.updateUser('usuario-inexistente', newUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        });
    });

    it('PUT - Tentar editar com e-mail já cadastrado (400)', () => {
        let existingEmail;

        cy.criarUsuario().then((response) => {
            expect(response.status).to.eq(201);
            existingEmail = response.body.email;
            console.log("Cadastrado:", existingEmail);

            return cy.criarUsuario();
        }).then((response) => {
            expect(response.status).to.eq(201);
            const userId = response.body._id;
            console.log("ID do usuário", userId);

            return cy.updateUser(userId, { email: existingEmail });
        }).then((response) => {
            console.log("Resposta da API", response.body); 

            expect(response.status).to.eq(400);

            if (response.body.email) {
                expect(response.body.email).to.eq('email é obrigatório');
            } else {
                throw new Error(`Mensagem de erro inesperada: ${JSON.stringify(response.body)}`);
            }
        });
    });
});