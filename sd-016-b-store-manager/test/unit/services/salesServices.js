const sinon = require('sinon');
const { expect } = require('chai');
const { connection } = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesService');


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

    describe('getAll', () => {
      before(() => {
        sinon.stub(salesModel, 'getAll').resolves(sales);
      });
  
      after(() => {
        salesModel.getAll.restore();
      });
  
  
  
      it('getAll', async () => {
        const result = await salesServices.getAll();
        expect(result.code).to.be.equal(200);
  
      });
    });


  });
});