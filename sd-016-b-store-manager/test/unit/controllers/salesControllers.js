const { expect } = require('chai');
const sinon = require('sinon');
const salesControler = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesService');





describe('sales Controler', () => {
  const response = {};
  const request = {};

  describe('Métodos GET', () => {
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      response.end = sinon.stub()
        .returns(response);
    });


    describe('getAll',  () => {

      const sales = [
        {
          saleId: 1,
          date: "2022-04-04T02:13:40.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: "2022-04-04T02:13:40.000Z",
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: "2022-04-04T02:13:40.000Z",
          productId: 3,
          quantity: 15
        }
      ];

      describe('getAll', () => {

        before(() => {
          sinon.stub(salesServices, 'getAll').resolves({ code: 200, response: sales });
        });

        after(() => {
          salesServices.getAll.restore();
        });
        
        it('getAll com sucesso', async () => {
          await salesControler.getAll(request, response);

          expect(response.status.calledWith(200)).to.be.equal(true);
        });


      });

    });

    describe('getById', () => {
      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);
        response.end = sinon.stub()
          .returns(response);
      });

      const sale = [
        {
          date: "2022-04-04T02:13:40.000Z",
          productId: 1,
          quantity: 5
        },
        {
          date: "2022-04-04T02:13:40.000Z",
          productId: 2,
          quantity: 10
        }
      ];



      describe('getById', () => {
        before(() => {
          sinon.stub(salesServices, 'getById').resolves({ code: 200, response: sale });
        });

        after(() => {
          salesServices.getById.restore();
        });

        it('quando encontra pelo id', async () => {
          await salesControler.getById(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });







      });



    });










  });







});

