describe('005 FR. Sistema turi leisti pirkėjui prisiregistruoti', () => {
  it('VP-1 005. Sistema turi grąžinti klaidą, kai pateikiamas elektroninis pašto adresas yra užimtas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/customers/register/personal`,
      body: {
        name: 'Name',
        surname: 'Surname',
        email: 'email@email.com',
        phone: '8611111111',
        password: 'password',
        country: 'Lithuania',
        city: 'Vilnius',
        localAdministration: 'Rajonas',
        street: 'Street name',
        house: '75',
        flat: '20',
        postCode: '12345',
      },
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Customer already exists');
    });
  });
  it('VP-2 005. Sistema turi grąžinti klaidą, kai pateikiamo elektroninio pašto adreso formatas yra negalimas', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/customers/register/personal`,
      body: {
        name: 'Name',
        surname: 'Surname',
        email: 'invalid email',
        phone: '8611111111',
        password: 'password',
        country: 'Lithuania',
        city: 'Vilnius',
        localAdministration: 'Rajonas',
        street: 'Street name',
        house: '75',
        flat: '20',
        postCode: '12345',
      },
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.errorCode).to.eq('ERROR_GLOBAL_BAD_REQUEST');
      expect(response.body.message).to.include('email must be an email');
    });
  });
});
