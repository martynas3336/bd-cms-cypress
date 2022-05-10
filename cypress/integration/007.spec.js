describe('007 FR. Sistema turi leisti pirkėjui peržiūrėti produktus', () => {
  it('VP-1 007. Sistema turi turėti galimybę filtruoti prekes pagal jų raktažodžius', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/variations/by/keywords?keywords=keyword1&keywords=keyword2`,
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
        language: 'lt',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(typeof response.body.itemsCount).to.eq('number');
      response.body.items.forEach((item) => {
        expect(item.keyWords).to.include('keyword1');
        expect(item.keyWords).to.include('keyword2');
      });
    });
  });
  it('VP-2 007. Sistema turi turėti galimybę gražinti visas prekes', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/variations`,
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
        language: 'lt',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(typeof response.body.itemsCount).to.eq('number');
    });
  });
  it('VP-3 007. Sistema turi turėti galimybę filtruoti prekes pagal jų raktažodžius', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${Cypress.env('basePublicApiUrl')}/api/v1/variations/by/keywords?keywords=hello&keywords=keyword1&keyword=nonexistent`,
      headers: {
        'Content-Type': 'application/json',
        'project-id': '6279347196a5123c6090fb4a',
        language: 'lt',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.items).to.deep.eq([]);
    });
  });
});
