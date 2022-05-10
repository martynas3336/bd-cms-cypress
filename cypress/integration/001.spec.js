describe('001 FR. Sistema turi leisti administratoriui prisiregistruoti', () => {
  it('NP-1 001. Sistema turi grąžinti klaidą, kai pateikiamas elektroninis pašto adresas yra užimtas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('baseDashboardApiUrl')}/dashboard/v1/users/register`,
      body: {
        email: 'email@email.com',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('User already exists');
    });
  });
  it('NP-2 001. Sistema turi grąžinti klaidą, kai pateikiamo elektroninio pašto adreso formatas yra negalimas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('baseDashboardApiUrl')}/dashboard/v1/users/register`,
      body: {
        email: 'invalid email',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.errorCode).to.eq('ERROR_GLOBAL_BAD_REQUEST');
      expect(response.body.message).to.include('email must be an email');
    });
  });
});
