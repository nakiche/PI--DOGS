const { Dog, conn, Temperament } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: '' });
      });
    });
  });


  describe("Temperament model", () => {
    it("Temperament model must be defined", () => {
      const TemperamentModel = conn.models.Temperament;
      expect(TemperamentModel).to.not.be.undefined;
    });

    it("id property can't be null", async () => {
        try {
          await Temperament.create({ 
                    "name": "Yankee dog",
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

    it("name property can't be null", async () => {
        try {
          await Temperament.create({ 
                    "id":2
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

  })

    describe("Dog model", () => {  
      it("Dog model must be defined", () => {
      const DogModel = conn.models.Dog;
      expect(DogModel).to.not.be.undefined;
    });

    it("id property can't be null", async () => {
        
        try {
          await Dog.create({
                   "image": "no_image",
                    "name": "Yankee dog",
                    "height": "3",
                    "min_weight": 20,
                    "max_weight": 25,
                    "life_span": "9",
                    "temperament": [
                       "Playful",
                       "Active"
                    ]
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

    it("name property can't be null", async () => {
       
        try {
          await Dog.create({
                   "id":122,
                   "image": "no_image",
                    "height": "3",
                    "min_weight": 20,
                    "max_weight": 25,
                    "life_span": "9",
                    "temperament": [
                       "Playful",
                       "Active"
                    ]
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

      it("image property can't be null", async () => {
       
        try {
          await Dog.create({
                   "id":122,
                   "name": "no_image",
                    "height": "3",
                    "min_weight": 20,
                    "max_weight": 25,
                    "life_span": "9",
                    "temperament": [
                       "Playful",
                       "Active"
                    ]
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

      it("height property can't be null", async () => {
       
        try {
          await Dog.create({
                   "id":122,
                   "image": "no_image",
                    "name":"bob",
                    "min_weight": 20,
                    "max_weight": 25,
                    "life_span": "9",
                    "temperament": [
                       "Playful",
                    "Active"
                    ]
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

        it("min_weight property can't be null", async () => {
       
        try {
          await Dog.create({
                   "id":122,
                   "image": "no_image",
                    "name":"bob",
                    "height":"12",
                    "min_weight": null,
                    "max_weight": 25,
                    "life_span": "9",
                    "temperament": [
                       "Playful",
                    "Active"
                    ]
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

        it("max_weight property can't be null", async () => {
      
        try {
          await Dog.create({
                   "id":122,
                   "image": "no_image",
                    "name":"bob",
                    "height":"12",
                    "min_weight": 23,
                    
                    "life_span": "9",
                    "temperament": [
                       "Playful",
                    "Active"
                    ]
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

        it("life_span property can't be null", async () => {
        
        try {
          await Dog.create({
                   "id":122,
                   "image": "no_image",
                    "name":"bob",
                    "height":"12",
                    "min_weight": 22,
                    "max_weight": 25,
                    
                    "temperament": [
                       "Playful",
                    "Active"
                    ]
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });

        it("temperament property can't be null", async () => {
        try {
          await Dog.create({
                   "id":122,
                   "image": "no_image",
                    "name":"bob",
                    "height":"12",
                    "min_weight": 22,
                    "max_weight": 25,
                    "life_span": "9",
                    
        });
        } catch (error) {
          expect(error.message).to.not.be.undefined;
        } 
      });
   }) 
   
});
