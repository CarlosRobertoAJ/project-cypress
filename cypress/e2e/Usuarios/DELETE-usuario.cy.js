describe('Excluir usuário', () => {
    let userId;

    beforeEach(() => {
        cy.criarUsuario().then((response) => {
            userId = response.body._id;
        });
    });

    it('DELETE - Excluir usuário existente (200)', () => {
        cy.deletarUsuario(userId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
        });
    });

    it('DELETE - Tentar excluir usuário inexistente', () => {
        const nonExistentUserId = 'usuario-inexistente';

        cy.deletarUsuario(nonExistentUserId).then((response) => {
            expect(response.status).to.eq(200);                     // pelo que eu entendi, o status 200 é um erro, deveria ter sido 400 ou 404
            expect(response.body).to.have.property('message', 'Nenhum registro excluído') 
        });
    });
});