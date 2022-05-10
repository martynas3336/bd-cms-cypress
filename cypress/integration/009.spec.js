describe('009 FR. Sistema turi leisti pirkėjui sukurti užsakymą', () => {
  it('VP-2 009. Sistema turi grąžinti klaidą, kai yra bandoma sukurti užsakymą su neegzistuojančiu krepšeliu', () => {
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
    }).then((res) => {
      cy.request({
        failOnStatusCode: false,
        method: 'POST',
        url: `${Cypress.env('basePublicApiUrl')}/api/v1/orders/add`,
        body: {
          cartId: '6279347196a5123c6090fb4a',
        },
        headers: {
          'Content-Type': 'application/json',
          'project-id': '6279347196a5123c6090fb4a',
          Authorization: `Bearer ${res.body.accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Cart does not exist');
      });
    });
  });
  it('VP-2 009. Sistema užsakymo kūrimo metu turi priimti krepšelio kodą', () => {
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
    }).then((res) => {
      cy.request({
        failOnStatusCode: false,
        method: 'POST',
        url: `${Cypress.env('basePublicApiUrl')}/api/v1/orders/add`,
        body: {
          cartId: '62793efc3f923b56617f4ec6',
        },
        headers: {
          'Content-Type': 'application/json',
          'project-id': '6279347196a5123c6090fb4a',
          Authorization: `Bearer ${res.body.accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.cartId).to.eq('62793efc3f923b56617f4ec6');
      });
    });
  });
  it('VP-3 009. Sistema turi turėti galimybę grąžinti užsakymo informaciją pagal užsakymo kodą', () => {
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
    }).then((res) => {
      cy.request({
        failOnStatusCode: false,
        method: 'GET',
        url: `${Cypress.env('basePublicApiUrl')}/api/v1/orders/get/one/62793fb3bec8bfd17a9ce75f`,
        headers: {
          'Content-Type': 'application/json',
          'project-id': '6279347196a5123c6090fb4a',
          Authorization: `Bearer ${res.body.accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        // eslint-disable-next-line no-underscore-dangle
        expect(response.body._id).to.eq('62793fb3bec8bfd17a9ce75f');
      });
    });
  });
});
