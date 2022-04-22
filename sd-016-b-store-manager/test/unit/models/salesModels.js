const sinon = require('sinon');
const { expect } = require('chai');
const { connection } = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');


describe('sales Model', () => {
  describe('Métodos GET', () => {
    const sales =  [
      {
        saleId: 1,
        date: "2022-04-02T22:20:08.000Z",
        productId: 1,
        quantity: 5
      },
      {
        saleId: 1,
        date: "2022-04-02T22:20:08.000Z",
        productId: 2,
        quantity: 10
      }
    ]

    describe('verifica getAll', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves(sales);
      });
  
      after(() => {
        connection.execute.restore();
      });
  
  
  
      it('getAll', async () => {
        const result = await salesModel.getAll();
  
        expect(result).to.be.an("object");
  
      });

    });


    describe('verifica getById', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves([{
          saleId: 1,
          date: "2022-04-02T22:20:08.000Z",
          productId: 1,
          quantity: 5
        }]);
      });
  
      after(() => {
        connection.execute.restore();
      });



      it('getById', async () => {
        const result = await salesModel.getById(1);

        expect(result).to.be.an("object");
      });
    });





  });
});