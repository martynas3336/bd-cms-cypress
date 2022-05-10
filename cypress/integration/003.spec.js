describe('003 FR. Sistema turi leisti administratoriui valdyti parduotuvės nustatymus', () => {
  it('Sistema turi grąžinti klaidą, kai yra pateikiamas negaliojantis arba netikras žetonas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('baseDashboardApiUrl')}/dashboard/v1/projects`,
      body: {
        name: 'My Project Name',
        emailConfirmUrl: 'https://google.com',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 123',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Unauthorized');
    });
  });
  it('NP-3 003. Sistema turi grąžinti klaidą, kai yra pateikiamas domeno pavadinimo ilgis, kuris yra sudarytas iš daugiau negu 63 simbolių', () => {
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
        url: `${Cypress.env('baseDashboardApiUrl')}/dashboard/v1/domain`,
        body: {
          domain: '-',
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.body.accessToken}`,
          'project-id': '6279347196a5123c6090fb4a',
        },
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.errorCode).to.eq('ERROR_GLOBAL_BAD_REQUEST');
        expect(res.body.message).to.include('domain must be longer than or equal to 2 characters');
      });
    });
  });
});
