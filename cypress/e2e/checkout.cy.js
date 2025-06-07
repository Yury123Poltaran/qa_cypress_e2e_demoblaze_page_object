/// <reference types="cypress" />

import HomePage from '../support/pages/HomePage';

describe('Demoblaze Checkout Flow', () => {
  const homePage = new HomePage();

  it('Completes full checkout flow', () => {
    // Відкриваємо сайт один раз
    cy.visit('https://www.demoblaze.com/');
    cy.contains('PRODUCT STORE').should('be.visible');

    // Вибираємо категорію "Laptops"
    homePage.clickLaptopsCategory();
    cy.contains('Sony vaio i5').should('be.visible');

    // Вибираємо товар Sony vaio i7
    homePage.clickSonyVaioI7();
    cy.get('.name').should('contain.text', 'Sony vaio i7');

    // Додаємо у кошик, ловимо alert
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('Product added');
    });
    homePage.addToCart();

    // Переходимо в кошик і чекаємо товар
    cy.visit('https://www.demoblaze.com/cart.html');
    cy.wait(3000);
    cy.contains('td', 'Sony vaio i7', { timeout: 15000 }).should('be.visible');

    // Кнопка Place Order
    homePage.clickPlaceOrder();
    homePage.verifyOrderFormVisible();

    // Заповнюємо форму замовлення
    homePage.fillOrderForm({
      name: 'Юрій К.',
      country: 'Україна',
      city: 'Київ',
      creditCard: '4242 4242 4242 4242',
      month: '06',
      year: '2025'
    });

    // Завершуємо замовлення
    homePage.submitOrder();

    // Чекаємо повідомлення подяки
    homePage.verifyThankYouMessage();

    // Натискаємо OK
    homePage.clickOkInConfirmation();
  });
});
