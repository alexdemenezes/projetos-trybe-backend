const { expect } = require('chai');
const sinon = require('sinon');
const productsControler = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');



describe('Product Controler', () => {
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


    describe('getAll', () => {


      const products = [
        {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10
        },
        {
          id: 2,
          name: "Traje de encolhimento",
          quantity: 20
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
          quantity: 30
        }
      ];

      before(() => {
        sinon.stub(productsServices, 'getAll').resolves({ code: 200, response: products });
      });

      after(() => {
        productsServices.getAll.restore();
      });



      it('getAll', async () => {
        await productsControler.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(products)).to.be.equal(true);
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

      const product = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      };

      describe('getById', () => {
        before(() => {
          sinon.stub(productsServices, 'getById').resolves({ code: 200, response: product });
        });

        after(() => {
          productsServices.getById.restore();
        });

        it('getById com sucesso', async () => {
          await productsControler.getById(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

      });



    });

    


  });


});