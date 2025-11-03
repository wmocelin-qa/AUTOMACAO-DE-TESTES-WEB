export function incluirProdutosCarrinho () {
    cy.get('a[href="/products"]').click()
    cy.contains('.productinfo', 'Blue Top').find('.add-to-cart').click();
    cy.get('#cartModal').should('be.visible').within(() => {
        cy.contains('View Cart').click();
    })
    cy.url().should('contain', '/view_cart')
    cy.contains('Proceed To Checkout').click()
    cy.contains('h3', 'Your delivery address')
    cy.get('#address_delivery').should('be.visible').within(() => {
        cy.get('li.address_address1').eq(0).should('contain', 'PGATS')
        cy.get('li.address_address1').eq(1).should('contain', 'First Avenue')
        cy.get('li.address_address1').eq(2).should('contain', 'Nº 10')
        cy.get('li.address_city.address_state_name.address_postcode')
        .should('contain', 'Calgary')
        .and('contain', 'Alberta')
        .and('contain', '88133260')
    cy.get('li.address_country_name').should('contain', 'Canada')
    cy.get('li.address_phone').should('contain', '48919481245433')
  })
    cy.get('#ordermsg .form-control').type('mensagem teste')
    cy.contains('a', 'Place Order').click()
    cy.get('input[data-qa=name-on-card]').type('JOao silva')
    cy.get('input[data-qa=card-number]').type('1234567891111111')
    cy.get('input[data-qa=cvc]').type('123')
    cy.get('input[data-qa=expiry-month]').type('2026')
    cy.get('input[data-qa=expiry-year]').type('10')
    cy.contains('button', 'Pay and Confirm Order').click()
}