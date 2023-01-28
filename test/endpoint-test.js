import chai from 'chai'
import request from 'supertest'
import ProductsDaoMongoDb from '../Persistencia/Daos/products/productsDaoMongoDb.js'
import controllers from '../Controllers/controllerInfo.js'
const assert = chai.assert
const expect = chai.expect
const should = chai.should()



describe('Testing con endpoints\n',()=>{

    describe('Metodos GET\n', ()=>{

        it("Estado de la peticion - Login", async ()=>{

            const response = await request('http://localhost:8081').get('/login')
            expect(response.status).to.eql(200)
        })

        it("Estado de la peticion - Logout", async ()=>{

            const response = await request('http://localhost:8081').get('/logout')
            expect(response.status).to.eql(500) // logout solo se realiza con un login activo porque requiere nombre de usuario
        })

        it("Estado de la peticion - Register", async ()=>{

            const response = await request('http://localhost:8081').get('/register')
            expect(response.status).to.eql(200)
        })

        it("Carga de de productos en endpoint api productos", async ()=>{

            const response = await request('http://localhost:8081').get('/api/productos-test')
            expect(response).to.not.be.empty;
        })

        it("Content Type de endpoint info", async ()=>{

            const response = await request('http://localhost:8081').get('/info')
            response.headers["content-type"].should.equal("text/html; charset=utf-8");
        })

        it("Ruta Erronea\n", async ()=>{

            const response = await request('http://localhost:8081').get('/random')
            expect(response.text).to.include("Ruta no Exite")
        })

    })

    describe('Metodos POST\n', ()=>{

        it("Redireccion de un login correcto", async ()=>{

            const response = await request('http://localhost:8081').post('/login')
            .send({email : 'a@a.com', password : '12345'})
             expect(response.header.location).to.eql('/')
        })

        it("Redireccion de un login incorrecto", async ()=>{

            const response = await request('http://localhost:8081').post('/login')
            .send({email : 'a@a.com', password : '123456'})
             expect(response.header.location).to.eql('/errorLogin')
        })

       
        it("Redireccion de un registro incorrecto", async ()=>{

            const response = await request('http://localhost:8081').post('/register')
            .send({username : 'luis', email : 'a@a.com', password : '123456'})
             expect(response.header.location).to.eql('/errorRegister')
             
        })

    })
    
})

describe('Testing con funcionalidades\n',()=>{

    describe('Metodos GET\n', async ()=>{
  
        
        it("Comprobacion propiedades array de productos ", (done)=>{

            const result = new ProductsDaoMongoDb
            result.getProducts().then((req) => {
                expect(req).to.not.have.any.keys('names', 'prices','thumbnails');
                expect(req).to.be.an("array")
                
                done(); 
              }).catch((e) => {
                done(e);
            }); 
        });
        
        it("Tipo de contenido array de productos- Login", (done)=>{

            const result = new ProductsDaoMongoDb
            result.getProducts().then((req) => {
                expect(req).to.be.an("array")
                expect(req).to.not.be.an("string")
                done(); 
              }).catch((e) => {
                done(e);
            }); 
            
        });

    })
})