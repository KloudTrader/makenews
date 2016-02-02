"use strict";
import UserRequest from "../../../src/login/UserRequest.js";
import HttpResponseHandler from "../../../../common/src/HttpResponseHandler.js";
import ClientConfig from "../../../src/config/ClientConfig.js";
import RouteLogger from "../RouteLogger.js";
import Route from "./Route.js";


export default class LoginRoute extends Route {
    constructor(request, response, next) {
        super(request, response, next);
    }

    handle() {
        try {
            RouteLogger.instance().info("LoginRoute::handle Login request received for the user = " + this.request.body.username);

            let userRequest = UserRequest.instance(this.request.body.username, this.request.body.password);
            userRequest.getAuthSessionCookie().then(authSessionCookie => {
                this._handleLoginSuccess(authSessionCookie, this.request.body.username);
            }).catch(error => { //eslint-disable-line
                RouteLogger.instance().error("LoginRoute::handle Failed while fetching auth session cookie");
                this._handleFailure({ "message": "unauthorized" });
            });
        } catch(error) {
            RouteLogger.instance().error("LoginRoute::handle Unexpected error = ", error);
            this._handleFailure({ "message": "unauthorized" });
        }
    }

    _handleLoginSuccess(authSessionCookie, userName) {
        let dbJson = ClientConfig.instance().db();
        this.response.status(HttpResponseHandler.codes.OK)
            .append("Set-Cookie", authSessionCookie)
            .json({ "userName": userName, "dbParameters": dbJson });

        RouteLogger.instance().info("LoginRoute::_handleLoginSuccess: Login request successful");
        RouteLogger.instance().debug("LoginRoute::_handleLoginSuccess: response = " + JSON.stringify({ "userName": userName, "dbParameters": dbJson }));
    }

    _handleFailure(error) {
        this.response.status(HttpResponseHandler.codes.UNAUTHORIZED);
        this.response.json(error);
    }
}
