class HomePage {
  clickLaptopsCategory() {
    cy.contains('Laptops').click();
  }

  clickSonyVaioI7() {
    cy.contains('Sony vaio i7').click();
  }

  addToCart() {
    cy.contains('Add to cart').click();
  }

  goToCart() {
    cy.contains('Cart').click();
  }

  clickPlaceOrder() {
    cy.contains('Place Order').click();
  }

  verifyOrderFormVisible() {
    cy.get('#orderModal').should('be.visible');
  }

  fillOrderForm({ name, country, city, creditCard, month, year }) {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#name').clear().type(name);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#country').clear().type(country);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#city').clear().type(city);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#card').clear().type(creditCard);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#month').clear().type(month);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#year').clear().type(year);
  }

  submitOrder() {
    cy.contains('Purchase').click();
  }

  verifyThankYouMessage() {
    cy.get('.sweet-alert', { timeout: 10000 }).should('be.visible');
    cy.contains('Thank you for your purchase!').should('be.visible');
  }

  clickOkInConfirmation() {
    cy.get('.confirm.btn.btn-lg.btn-primary', { timeout: 30000 }) // чекаємо до 30 сек
      .should('be.visible')
      .and('contain.text', 'OK')
      .click();
  }
}

export default HomePage;
