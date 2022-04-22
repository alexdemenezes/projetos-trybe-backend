  const sinon = require('sinon');
  const { expect } = require('chai');
  

  const { connection } = require('../../../models/connection');
  const productModels = require('../../../models/productModel');

  describe('productModels', () => {
    describe('Metodos GET', () => {

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

      describe('getAll', () => {
        describe('quando encontra item no Banco de Dados', () => {
          before(() => {
            sinon.stub(connection, 'execute').resolves(products);
          });

          after(() => {
            connection.execute.restore();
          });

          it('retorna o array com os produtos', async () => {
            const result = await productModels.getAll();

            

            expect(result).to.be.an("object");

          });

        });  
      });

      describe('getById', () => {

        before(() => {
          sinon.stub(connection, 'execute').resolves([ { id: 1, name: 'Martelo de Thor', quantity: 10 } ]);
        });

        after(() => {
          connection.execute.restore();
        });

        it('Retorna o produto', async () => {

          const result = await productModels.getById(1);

          expect(result).to.deep.equal({ id: 1, name: 'Martelo de Thor', quantity: 10 });
        });

      })

    });

    describe(' Métodos POST', () => {
      const product = {
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10,
      };

      describe('create', () => {
        describe('adiciona item', () => {
          before(() => {
            sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
          });
  
          after(() => {
            connection.execute.restore();
          });

          it('funciona', async () => {
            const result = await productModels.create('Martelo de Thor', 10);
  
            expect(result).to.be.equals(1);
          });
  
        });
      });
    });
  })
