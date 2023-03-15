
import * as actions from "../src/actions/index.js";
import React from "react";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Form from './components/form/Form.jsx';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

configure({ adapter: new Adapter() });

let handleSubmit = () =>{}

describe('<Form />', () => {
  const initialState = { dogs: [{
                        "id": 1001,
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

                      }] 
    };

    const mockStore = configureStore();
    let store = mockStore(initialState);
    let createDog

    beforeAll(() => expect(isReact.classComponent(Form)).toBeFalsy());

    it('Shows "Create a new dog"', () => {
       
        const { getByText } = render(
            <Provider store={store}>
                <Form />
            </Provider>
        );
        expect(getByText('Create a new dog')).not.toBeNull();
    });

    describe("Form's structure", () => {
      beforeEach(() => {
          createDog = mount(
              <Provider store={store}>
                  <Form />
              </Provider>
          );
       })

      it('Should render a form', () => { 
        expect(createDog.find("form")).toHaveLength(1);
        //expect(createDog.find("label").at(0).text()).toEqual("Name: ");
      });

      it('Should render a label with the text name', () => { 
        expect(createDog.find("label").at(0).text()).toEqual("Name:");
      });

      it('Should render an input type text with property "name" = "name"', () => {
      expect(createDog.find('input[name="name"]')).toHaveLength(1);
      expect(createDog.find("input").at(0).props().type).toEqual("text");
      });

      it('Should render a label with the text Minumum life span:', () => { 
        expect(createDog.find("label").at(1).text()).toEqual("Minumum life span:");
      });

      it('Should render an input type number with property "name" = "min_life_span"', () => {
      expect(createDog.find('input[name="min_life_span"]')).toHaveLength(1);
      expect(createDog.find("input").at(1).props().type).toEqual("number");
      });

      it('Should render a label with the text Maximum life span:', () => { 
        expect(createDog.find("label").at(2).text()).toEqual("Maximum life span:");
      });

      it('Should render an input type number with property "name" = "min_life_span"', () => {
      expect(createDog.find('input[name="max_life_span"]')).toHaveLength(1);
      expect(createDog.find("input").at(2).props().type).toEqual("number");
      });

      it('Should render a label with the text Min height:', () => { 
        expect(createDog.find("label").at(3).text()).toEqual("Min height:");
      });

      it('Should render an input type number with property "name" = "min_height"', () => {
      expect(createDog.find('input[name="min_height"]')).toHaveLength(1);
      expect(createDog.find("input").at(3).props().type).toEqual("number");
      });

      it('Should render a label with the text Max height:', () => { 
        expect(createDog.find("label").at(4).text()).toEqual("Max height:");
      });

      it('Should render an input type number with property "name" = "max_height"', () => {
      expect(createDog.find('input[name="max_height"]')).toHaveLength(1);
      expect(createDog.find("input").at(4).props().type).toEqual("number");
      });

      it('Should render a label with the text Min weight:', () => { 
        expect(createDog.find("label").at(5).text()).toEqual("Min weight:");
      });

      it('Should render an input type number with property "name" = "min_weight"', () => {
      expect(createDog.find('input[name="min_weight"]')).toHaveLength(1);
      expect(createDog.find("input").at(5).props().type).toEqual("number");
      });

      it('Should render a label with the text Max weight:', () => { 
        expect(createDog.find("label").at(6).text()).toEqual("Max weight:");
      });

      it('Should render an input type number with property "name" = "max_weight"', () => {
      expect(createDog.find('input[name="max_weight"]')).toHaveLength(1);
      expect(createDog.find("input").at(6).props().type).toEqual("number");
      });

      it('Should render a label with the text Temperaments:', () => { 
        expect(createDog.find("label").at(7).text()).toEqual("Temperaments:");
      });

      it('Should render a select type number with property "name" = "temperament"', () => {
      expect(createDog.find('select[name="temperament"]')).toHaveLength(1);
      });

      it('SHould render a button  "type" = "submit" and text = "Create dog"', () => {
      expect(createDog.find('button[type="submit"]')).toHaveLength(1);
      expect(createDog.find("button").at(0).text()).toEqual("Create dog");
    });

    });

    describe("React useState", () => {
    let useState, useStateSpy, createDog;
    let store = mockStore(initialState);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      createDog = mount(
        <Provider store={store}>
          <Form />
        </Provider>
      );
    });
      it("Should set correctly initial state values", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: '', 
        min_life_span: '' ,
        max_life_span:'',
        min_height:'',
        max_height:'',
        min_weight:'',
        max_weight:'',
        temperament:'',
      });
    });
  
      it('State should be modified once input "name" changes', () => {
        createDog.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "Aston Martin" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "Aston Martin",
          min_life_span: '' ,
          max_life_span:'',
          min_height:'',
          max_height:'',
          min_weight:'',
          max_weight:'',
          temperament:'',
        });
      });

      it('State should be modified once input "min_life_span" changes ', () => {
        createDog.find('input[name="min_life_span"]').simulate("change", {
          target: { name: "min_life_span", value: 8 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          min_life_span: 8 ,
          max_life_span:'',
          min_height:'',
          max_height:'',
          min_weight:'',
          max_weight:'',
          temperament:'',
        });
      });

      it('State should be modified once input "min_height" changes ', () => {
        createDog.find('input[name="min_height"]').simulate("change", {
          target: { name: "min_height", value: 18 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          min_life_span: '' ,
          max_life_span:'',
          min_height:18,
          max_height:'',
          min_weight:'',
          max_weight:'',
          temperament:'',
        });
      });

      it('State should be modified once input "max_weight" changes ', () => {
        createDog.find('input[name="max_weight"]').simulate("change", {
          target: { name: "max_weight", value: 18 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          min_life_span: '' ,
          max_life_span:'',
          min_height:'',
          max_height:'',
          min_weight:'',
          max_weight:18,
          temperament:'',
        });
      });

  });

  describe("preventDefault shall be called", () => {
    let createDog, useState, useStateSpy;
    let store = mockStore(initialState);

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      store = mockStore(initialState, actions.createDogAction);
      store.clearActions();
      createDog = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/dog/create"]}>
            <Form handleSubmit={handleSubmit}/>
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    it('preventDefault shall be called, avoiding refresh once info is submited', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      createDog.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });
  });

});