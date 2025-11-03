export function verificarProdutosEDetalhes () {
    cy.contains('Home').should('be.visible')
    cy.get('a[href="/products"]').click()
    cy.contains('All Products').should('be.visible')
    cy.url().should('contain', '/products')
    cy.get('.features_items').should('be.visible');
    cy.get('a[href="/product_details/1"]').click()
    cy.url().should('contain', 'product_details/1')
    cy.get('h2').should('contain', 'Blue Top')
    cy.contains('Availability').should('be.visible')
    cy.contains('Availability').should('be.visible')
    cy.contains('Brand:').should('be.visible')
    cy.contains('span', 'Rs. 500').should('be.visible')
    cy.contains('p', 'Category: Women > Tops').should('be.visible')
}

export function pesquisarProduto () {
    cy.contains('Home').should('be.visible')
    cy.get('a[href="/products"]').click()
    cy.contains('All Products').should('be.visible')
    cy.url().should('contain', '/products')
    cy.get('#search_product').type('winter')
    cy.get('#submit_search').click()
    cy.url('contain', 'products?search=winter')
    cy.contains('h2', 'Searched Products').should('be.visible')
    cy.contains('.product-image-wrapper', 'Winter Top').should('be.visible')
}

