export function realizarEnvioFormContato () {
      cy.get('a[href="/contact_us"]').click()
      cy.get('[data-qa="name"]').type('João da Silva')
      cy.get('[data-qa="email"]').type('joaodasilva.teste@teste.com.br')
      cy.get('[data-qa="subject"]').type('testando com cypress')
      cy.get('[data-qa="message"]').type('my message - test')
      cy.get('input[type="file"][name="upload_file"]').selectFile('cypress/fixtures/example.json')
      cy.get('[data-qa="submit-button"]').click()
      cy.contains('Success! Your details have been submitted successfully.').should('be.visible')
}