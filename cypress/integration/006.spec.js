describe('006 FR. Sistema turi leisti pirkėjui prisijungti', () => {
  it('VP-1 006. Sistema turi grąžinti klaidą, kai pateikiamo elektroninio pašto adreso formatas yra negalimas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/customers/login`,
      body: {
        email: 'invalidEmail',
        password: 'password',
      },
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Unauthorized');
    });
  });
  it('VP-2 006. Sistema turi grąžinti klaidą, kai pateiktas elektroninio pašto adresas nėra registruotas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/customers/login`,
      body: {
        email: 'unregistered.email@gmail.com',
        password: 'password',
      },
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Unauthorized');
    });
  });
  it('VP-3 006. Sistema turi grąžinti klaidą, kai pateiktas slaptažodis yra neteisingas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/customers/login`,
      body: {
        email: 'kerojeh359@3dmasti.com',
        password: 'invalid-password',
      },
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Unauthorized');
    });
  });
  it('VP-4 006. Sistema turi grąžinti žetoną, kuris galioja 24 valands, kai pateikti prisijungimo duomenys yra teisingi', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/customers/login`,
      body: {
        email: 'kerojeh359@3dmasti.com',
        password: 'password',
      },
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(typeof response.body.accessToken).to.eq('string');
    });
  });
});
