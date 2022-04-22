const sinon = require('sinon');
const { expect } = require('chai');
const { connection } = require('../../../models/connection');
const productsServices = require('../../../services/productsServices');
const productModels = require('../../../models/productModel');


describe('Product Service', () => {
  describe('Métodos GET', () => {
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
    ];

    const correctResult = { code: 200, response: products }

    describe('getAll', () => {

      before(() => {
        sinon.stub(productModels, 'getAll').resolves(products);
      });
  
      after(() => {
        productModels.getAll.restore();
      });

      it('getAll', async () => {
        const result = await productsServices.getAll();
        expect(result).to.be.an("object");
  
      });



    });



    

    describe('getById', () => {
      
      before(() => {
        sinon.stub(productModels, 'getById').resolves([{
          id: 1,
          name: "Martelo de Thor",
          quantity: 10
        }]);
      });
  
      after(() => {
        productModels.getById.restore();
      });




      it('getById', async () => {
        const result = await productsServices.getById(1);
        // expect(result).to.be.equals({ code: 200, response: products[0] });
        // // expect(result).to.be.equals();
        expect(result).to.be.an("object");
      });
    });

  });



  describe('Método Post', () => {
    const productToCreate = {
      nama: 'corrente de ouro',
      quantity: 10
    }


    before(() => {
      sinon.stub(productModels, 'create').resolves(1);
      sinon.stub(productModels, 'getAll').resolves([]);

    });

    after(() => {
      productModels.create.restore();
      productModels.getAll.restore();
    });

    it('create', async () => {
      const result = await productsServices.create('corrente de ouro', 10);
      expect(result).to.be.deep.equals({ code: 201, insertId: 1 })
    });







  });



});