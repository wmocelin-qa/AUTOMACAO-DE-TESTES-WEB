describe('Drag and drop and Windows', () => {
    it('Multiple Windows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')
        cy.contains('Click Here')
            .invoke('removeAttr', 'target')
            .click()

            cy.go('back')
            cy.get('h3').should('have.text', 'Opening a new window')
    })

    it.only('Drag and Drop', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')

        const dataTransfer = new DataTransfer()

        cy.contains('A').trigger('dragstart', { dataTransfer })
        cy.contains('B').trigger('drop', { dataTransfer })
    })
})