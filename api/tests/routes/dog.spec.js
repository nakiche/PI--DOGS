/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
    "id": 1900,
    "image": "no_image",
    "name": "Yankee dog",
    "min_height": 3,
    "max_height": 6,
    "min_weight": 20,
    "max_weight": 25,
    "min_life_span": 6,
    "max_life_span": 9,
    "temperament": [
            "Playful",
            "Active"
        ]
}

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));// Syncing all the models at once.
  beforeEach(() => conn.sync({ force: true }))
  
//------------------------------------------------------------
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });

  //------------------------------------------------------------
  describe('GET /dogs/name', () => {
    it('responds with 200', () => agent.get('/dogs/name')
      .query({ name: "golden" })
     .expect(200));
    it('responds and array with object that contains 9 keys',  () =>
        agent.get('/dogs/name')
        .query({name: "peruvian"})
        .then((res) => {
          let keys =  Object.keys(res.body[0])
          expect(keys.length).equal(9)
         }))
     it('if there is an error responds with status: 400', () => agent.get('/dogs/name')
    .query({ name: "peruano" }).expect(400))
   
    it('if there is an error responds with a message', () => agent.get('/dogs/name')
    .query({ name: "peruano" })
    .then((res) => {
        expect(res.text).equal(
        '{"error":"there are no dogs with that name"}'
        );
      }));
  });
//------------------------------------------------------------
  describe('GET /dogs/:idRaza', () => {
    it('responds with 200', () => agent.get('/dogs/1')
     .expect(200));
    it('responds and array with object that contains 9 keys',  () =>
        agent.get('/dogs/3')
        .then((res) => {
          let keys =  Object.keys(res.body[0])
          expect(keys.length).equal(9)
         }))
     it('if there is an error responds with status: 400', () => agent.get('/dogs/50000').expect(400))
   
    it('if there is an error responds with a message', () => agent.get('/dogs/50000')
    .then((res) => {
        expect(res.text).equal(
        '{"error":"No dogs with the id: 50000"}'
        );
      }));
  });
//------------------------------------------------------------
  describe('POST /dogs', () => {
    it('responds with status: 200', () => 
      agent.post('/dogs')
      .send(dog)
      .expect(200) 
      );

    it('responds with an array', () => 
    agent.post('/dogs')
    .send({
                "id": 300,
                "image": "no_image",
                "name": "Yankee dog",
                "min_height": 3,
                "max_height": 6,
                "min_weight": 20,
                "max_weight": 25,
                "min_life_span": 6,
                "max_life_span": 9,
                "temperament": [
                        "Playful",
                        "Active"
                    ]
      })
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.be.a('array');
      })

      )
  it('if data missing responds with status: 400 and message', () => 
    agent.post('/dogs')
    .send({
                "id": 1001,
                "image": "no_image",
                "max_weight": 25,
                "min_life_span": 6,
                "max_life_span": 9,
                "temperament": [
                        "Playful",
                        "Active"
                    ]})
    .expect(400)
    .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).equal('Data missing')
      })
    );
  })
 

});


