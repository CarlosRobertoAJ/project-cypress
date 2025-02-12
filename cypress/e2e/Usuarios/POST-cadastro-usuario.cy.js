// <reference types="cypress" />
import { faker } from '@faker-js/faker/locale/pt_PT';

describe('Usuário - Criar e Validar', () => {
    
  it('POST - Criar usuário com sucesso (201)', () => {
      cy.criarUsuario().then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
          expect(response.body).to.have.property('_id');
      });
  });

  it('POST - Tentar criar usuário com dados inválidos (400)', () => {
      cy.criarUsuario({ email: '' }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.have.property('email', 'email não pode ficar em branco'); 
      });
  });

  it('POST - Validar mensagem de email já cadastrado (400)', () => {
    const userData = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: faker.datatype.boolean().toString()
    };
    cy.criarUsuario(userData).then((response) => {
        expect(response.status).to.eq(201);
        const emailCadastrado = response.body.email; 

        const duplicateData = {
            nome: faker.person.fullName(),
            email: emailCadastrado,
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        };

        cy.criarUsuario(duplicateData).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property('email', 'email é obrigatório');
        });
      });
  });

});
