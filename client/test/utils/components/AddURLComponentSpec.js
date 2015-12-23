/* eslint no-unused-expressions:0 */

"use strict";

import AddURLComponent from "../../../src/js/utils/components/AddURLComponent";
import RSSComponent from "../../../src/js/config/components/RSSComponent.jsx";
import { expect, assert } from "chai";
import sinon from "sinon";
import TestUtils from "react-addons-test-utils";
import React from "react";
import ReactDOM from "react-dom";
import "../../helper/TestHelper.js";

describe("AddURLComponent", () => {

    let AddURLComponentElement = null;
    let categoryDetailsPageStrings = { "allCategoriesLinkLabel": "All Categories",
            "deleteCategoryLinkLabel": "Delete Category",
            "addUrlLinkLabel": "Add Url",
            "errorMessages": { "urlSuccess": "Url is successfully added",
                "invalidUrlFormat": "Invalid URL format",
                "emptyUrl": "URL should not be empty",
                "alreadyAdded": "URL is already added" }
    };

    before("TabComponent", () => {
        AddURLComponentElement = TestUtils.renderIntoDocument(
            <AddURLComponent addUrlLinkLabel="Add Url" content={[{ "url": "http://www.test.com" }]} errorMessage="" sourceDomainValidation={(url, callback) => callback({ "error": "Url is successfully added", "urlAdded": true })} categoryDetailsPageStrings={categoryDetailsPageStrings}/> //eslint-disable-line max-len
        );
    });

    it("should be present", () => {
        assert.isDefined(AddURLComponentElement, "Defined");
    });

    it("should have mandatory properties addUrlLinkLabel, content and errorMessage", () => {
        assert.isDefined(AddURLComponentElement.props.addUrlLinkLabel, "Defined");
        assert.isDefined(AddURLComponentElement.props.content, "Defined");
        assert.isDefined(AddURLComponentElement.props.errorMessage, "Defined");
    });

    it("should have values passed in the mandatory props", () => {
        expect("Add Url").to.eq(AddURLComponentElement.props.addUrlLinkLabel);
        expect([{ "url": "http://www.test.com" }]).to.deep.eq(AddURLComponentElement.props.content);
        expect("").to.eq(AddURLComponentElement.props.errorMessage);
    });

    it("should have addUrlLinkLabel displayed in the add url button", () => {
        expect("Add Url").to.eq(AddURLComponentElement.refs.addUrlLinkText.textContent);
    });

    it("should display all the urls if content props has values", ()=> {
        let addUrlDom = ReactDOM.findDOMNode(AddURLComponentElement);
        expect(1).to.eq(addUrlDom.querySelectorAll("ul.url-list li").length);
    });

    it("should call showAddUrlTextBox function on clicking addUrlButton", () => {
        let addUrlDom = ReactDOM.findDOMNode(AddURLComponentElement);
        TestUtils.Simulate.click(addUrlDom.querySelector("#addNewUrlButton"));
        expect(true).to.eq(AddURLComponentElement.state.showUrlInput);
    });

    it("should display add url textbox on clicking addUrlButton", () => {
        let addUrlDom = ReactDOM.findDOMNode(AddURLComponentElement);
        TestUtils.Simulate.click(addUrlDom.querySelector("#addNewUrlButton"));
        assert.isDefined(AddURLComponentElement.refs.addUrlTextBox, "Defined");
    });

    it("should validate the url with regex", ()=> {
        expect("URL should not be empty").to.eq(AddURLComponentElement._isValidUrl(""));
        expect("Invalid URL format").to.eq(AddURLComponentElement._isValidUrl("http.www.test.com"));
        expect("URL is already added").to.eq(AddURLComponentElement._isValidUrl("http://www.test.com"));
        expect("").to.eq(AddURLComponentElement._isValidUrl("http://www.test1.com"));
    });

    it("should set the errorMessage in the dom if the input url is wrong", () => {
        let addUrlDom = ReactDOM.findDOMNode(AddURLComponentElement);
        TestUtils.Simulate.click(addUrlDom.querySelector("#addNewUrlButton"));
        let input = AddURLComponentElement.refs.addUrlTextBox;
        TestUtils.Simulate.blur(input);
        expect("URL should not be empty").to.eq(AddURLComponentElement.state.errorMessage);
        expect("URL should not be empty").to.eq(addUrlDom.querySelector(".add-url-status").textContent);
    });

    it("should remove the url input box once a valid url is entered", () => {
        let addUrlDom = ReactDOM.findDOMNode(AddURLComponentElement);
        TestUtils.Simulate.click(addUrlDom.querySelector("#addNewUrlButton"));
        let input = AddURLComponentElement.refs.addUrlTextBox;
        input.value = "http://www.test1.com";
        TestUtils.Simulate.blur(input);
        expect("Url is successfully added").to.eq(AddURLComponentElement.state.errorMessage);
        expect(addUrlDom.querySelector("input")).to.be.null;
    });

    it("should validate the url when user enters key down", () => {
        let addUrlDom = ReactDOM.findDOMNode(AddURLComponentElement);
        TestUtils.Simulate.click(addUrlDom.querySelector("#addNewUrlButton"));
        let input = AddURLComponentElement.refs.addUrlTextBox;
        input.value = "httwep://www.test1.com";
        let customEvent = {};
        customEvent.keyCode = 13;
        TestUtils.Simulate.keyDown(input, customEvent);
        expect("Invalid URL format").to.eq(AddURLComponentElement.state.errorMessage);
    });

    xit("should call the validateUrl function if the give url is valid", () => {
        let addUrlDom = ReactDOM.findDOMNode(AddURLComponentElement), url = "http://www.test1.com";
        TestUtils.Simulate.click(addUrlDom.querySelector("#addNewUrlButton"));
        let input = AddURLComponentElement.refs.addUrlTextBox;
        input.value = url;
        let validateUrl = sinon.mock(RSSComponent).expects("_validateUrl");
        validateUrl.withArgs(url).returns("test");

        TestUtils.Simulate.blur(input);


        validateUrl.verify();
    });
});