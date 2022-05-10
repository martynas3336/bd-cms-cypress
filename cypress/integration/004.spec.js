describe('004 FR. Sistema turi leisti administratoriui valdyti produktus', () => {
  it('NP-1 004. Sistema turi grąžinti klaidą, kai yra pateikiamas negaliojantis arba netikras žetonas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('baseDashboardApiUrl')}/api/v1/admin/products`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 123',
        'project-id': '6279347196a5123c6090fb4a',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Unauthorized');
    });
  });
  it('NP-2 004. Sistema turi grąžinti klaidą, kai yra pateikiamas produkto variacijos vardo ilgis, kuris yra sudarytas iš mažiau negu 2 simbolių', () => {
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
      cy.request({
        failOnStatusCode: false,
        method: 'POST',
        url: `${Cypress.env('baseDashboardApiUrl')}/api/v1/admin/variations`,
        body: {
          projectId: '6279347196a5123c6090fb4a',
          productId: '6277959ab4701c236be7e1d1',
          language: 'lt',
          name: '-',
          priceTax: 15,
          priceRegular: 10,
          isStock: true,
          noTax: false,
          quantity: 5,
          companyProductId: 'string',
          barcode: '12345',
          images: [
            'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
          ],
          keyWords: [
            'keyword1',
            'keyword2',
          ],
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.body.accessToken}`,
          'project-id': '6279347196a5123c6090fb4a',
        },
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.errorCode).to.eq('ERROR_GLOBAL_BAD_REQUEST');
        expect(res.body.message).to.include('name must be longer than or equal to 2 characters');
      });
    });
  });
  it('NP-3 004. Sistema turi grąžinti klaidą, kai yra pateikiama produkto variacijos kainos reikšmė, kuri nėra skaičius', () => {
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
      cy.request({
        failOnStatusCode: false,
        method: 'POST',
        url: `${Cypress.env('baseDashboardApiUrl')}/api/v1/admin/variations`,
        body: {
          projectId: '6279347196a5123c6090fb4a',
          productId: '6277959ab4701c236be7e1d1',
          language: 'lt',
          name: 'This is a regular name',
          priceTax: 'price',
          priceRegular: 10,
          isStock: true,
          noTax: false,
          quantity: 5,
          companyProductId: 'string',
          barcode: '12345',
          images: [
            'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
          ],
          keyWords: [
            'keyword1',
            'keyword2',
          ],
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.body.accessToken}`,
          'project-id': '6279347196a5123c6090fb4a',
        },
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.errorCode).to.eq('ERROR_GLOBAL_BAD_REQUEST');
        expect(res.body.message).to.include('priceTax must be a number conforming to the specified constraints');
      });
    });
  });
});
