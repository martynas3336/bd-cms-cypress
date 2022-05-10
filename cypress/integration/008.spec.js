describe('008 FR. Sistema turi leisti pirkėjui sukurti produktų krepšelį', () => {
  it('VP-2 008. Sistema krepšėlio kūrimo metu turi priimti prekių sąrašą su jų kiekiu', () => {
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
        url: `${Cypress.env('basePublicApiUrl')}/api/v1/cart/upsert`,
        body: {
          products: [
            {
              id: '62779a075ee6ac991713f568',
              amount: 20,
              price: 10,
            },
          ],
        },
        headers: {
          'Content-Type': 'application/json',
          'project-id': '6279347196a5123c6090fb4a',
          Authorization: `Bearer ${res.body.accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.products[0].id).to.eq('62779a075ee6ac991713f568');
        expect(response.body.products[0].amount).to.eq(20);
        expect(response.body.products[0].price).to.eq(10);
      });
    });
  });
  it('VP-2 008. Sistema turi turėti galimybę grąžinti krepšelio informaciją pagal krepšelio kodą', () => {
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
        url: `${Cypress.env('basePublicApiUrl')}/api/v1/cart/by/id/62793dc63f923b56617f4e70`,
        headers: {
          'Content-Type': 'application/json',
          'project-id': '6279347196a5123c6090fb4a',
          Authorization: `Bearer ${res.body.accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        // eslint-disable-next-line no-underscore-dangle
        expect(response.body._id).to.eq('62793dc63f923b56617f4e70');
      });
    });
  });
});
