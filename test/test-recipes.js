const chai = require('chai');
const chaiHttp= require('chai-http');

const {app, runServer, closeServer}= require('../server');

const should= chai.should();
chai.use(chaiHttp);

describe('Recipes', function(){
    before(function(){
        return runServer();
    });

    after(function(){
        return closeServer();
    });

    it('should list item on GET',function(){
        return chai.request(app)
        .get('/recipes')
        .then(function (res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array')
            const expectedKeys=['name', 'ingredients', 'id'];
            res.body.forEach(function(item){
                item.should.have.keys(expectedKeys);
                item.should.be.a('object');
                //I'm not understanding how to come up with these ideas without
                //looking at the test-server.js
            });
        });
    });

     it('should create new item on POST', function(){
         const newItem= {'name': 'brownies', 'ingredients': ['batter','eggs']};
         const expectedKeys=['name', 'ingredients', 'id'];
         return chai.request(app)
         .post('/recipes')
         .send(newItem)
         .then(function(res){
             res.should.be.have.status(201)
             res.should.be.json;
             res.body.should.have.keys(expectedKeys);
                 res.body.should.be.a('object');
             });
         });


     });

     it('should update item on PUT', function(){
        const updatedItem={'name': 'cookies', 'ingredients':['chocolate chips','bananas','sugar']};
        const expectedKeys= ['name', 'ingredients','id'];
        return chai.request(app)
        .get('/recipes')
        .then(function(item){
            updatedID=item.body.id
            .send(updatedID);
            return chai.request(app)
        .put(`/recipes/${updatedID}`)
        .send(updatedItem)
        .then(function(res){
            res.should.have.status(204);
            res.should.be.a('object');
            res.should.be.json;
            res.body.should.have.keys(expectedKeys);
        })
     });

    // it('should delete item on DELETE', function(){

    // });

//})

