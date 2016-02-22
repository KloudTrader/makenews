/*eslint no-magic-numbers:0 */
"use strict";
import "../helper/TestHelper.js";
import MainHeader from "../../src/js/main/headers/MainHeader.jsx";
import { assert, expect } from "chai";
import TestUtils from "react-addons-test-utils";
import React from "react";
import ReactDOM from "react-dom";

describe("main header component", () => {
    let mainHeader = null, headerStrings = null, highlightedTab = null;
    before("Main page component", () => {
        highlightedTab = {
            "tabNames": ["Surf"]
        };
        headerStrings = {
            "surfTab": {
                "Name": "Surf"
            },
            "parkTab": {
                "Name": "Park"
            },
            "configTab": {
                "Name": "Configure"
            },
            "logoutButton": {
                "Name": "Logout"
            }
        };
        let parkCounter = 0;
        mainHeader = TestUtils.renderIntoDocument(<MainHeader headerStrings={headerStrings} highlightedTab={highlightedTab} parkCounter={parkCounter}/>);
    });

    it("should have header element", () => {
        var mainHeaderDomNode = ReactDOM.findDOMNode(mainHeader);
        expect(mainHeaderDomNode.tagName).to.equal("header".toUpperCase());
    });

    it("should have div with fixed-header clear-fix multi-column", () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(mainHeader, "fixed-header clear-fix multi-column").className)
                                                            .to.equal("fixed-header clear-fix multi-column");
    });

    it("should have logo on left", () => {
        let logoElement = mainHeader.refs.logo;
        assert.isDefined(logoElement);
    });
});
