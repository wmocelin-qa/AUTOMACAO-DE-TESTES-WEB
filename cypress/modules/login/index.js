export function loginUsuarioSenhaCorreto() {
    cy.get('[data-qa="login-email"]').type('Lavinia-dd9@test.com.br')
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()
    cy.contains('Logged in as').should('be.visible')
  }

export function loginUsuarioSenhaIncorreto () {
    cy.get('[data-qa="login-email"]').type('Lavinia-dd9@test.com.br')
    cy.get('[data-qa="login-password"]').type('1234d5')
    cy.get('[data-qa="login-button"]').click()
    cy.contains('Your email or password is incorrect').should('be.visible')
  }

export function realizarLogoutUsuario () {
  cy.get('a[href="/logout"]').click()
  cy.url().should('contain', '/login')
}
