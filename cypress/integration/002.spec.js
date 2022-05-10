describe('002 FR. Sistema turi leisti administratoriui prisijungti', () => {
  it('NP-1 002. Sistema turi grąžinti klaidą, kai pateikiamo elektroninio pašto adreso formatas yra negalimas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('baseDashboardApiUrl')}/dashboard/v1/users/login`,
      body: {
        email: 'invalidEmail',
        password: 'password',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Unauthorized');
    });
  });
  it('NP-2 002. Sistema turi grąžinti klaidą, kai pateiktas elektroninio pašto adresas nėra registruotas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('baseDashboardApiUrl')}/dashboard/v1/users/login`,
      body: {
        email: 'unregistered.email@gmail.com',
        password: 'password',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Unauthorized');
    });
  });
  it('NP-3 002. Sistema turi grąžinti klaidą, kai pateiktas slaptažodis yra neteisingas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('baseDashboardApiUrl')}/dashboard/v1/users/login`,
      body: {
        email: 'kerojeh359@3dmasti.com',
        password: 'invalid-password',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Unauthorized');
    });
  });
  it('NP-4 002. Sistema turi grąžinti žetoną, kuris galioja 24 valands, kai pateikti prisijungimo duomenys yra teisingi', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('baseDashboardApiUrl')}/dashboard/v1/users/login`,
      body: {
        email: 'kerojeh359@3dmasti.com',
        password: 'password',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(typeof response.body.accessToken).to.eq('string');
    });
  });
});
