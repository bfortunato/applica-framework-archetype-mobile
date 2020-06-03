import * as http from "../aj/http";
import * as preferences from "../framework/preferences";
import * as config from "../framework/config";
import _ from "underscore";
import * as responses from "./responses";
import {safeGet} from "../utils/lang";
import Api from "./genericApi";
import M from "../strings";

let _loggedUser
let _sessionToken

export const TYPE_MAIL = "MAIL"
export const TYPE_FACEBOOK = "FACEBOOK"

let STOP_OBJ = {}

function stop() {
    return STOP_OBJ
}

function wrap(r, fn) {
    if (r == STOP_OBJ) {
        return STOP_OBJ
    } else {
        return fn(r)
    }
}

export function login(mail, password) {
    return new Promise((resolve, reject) => {
        http.post(config.get("login.url"), {mail, password})
            .then(json => {
                if (_.isEmpty(json)) {
                    reject(responses.ERROR)
                } else {
                    let response = JSON.parse(json)

                    if (responses.OK != response.responseCode) {
                        reject(response.responseCode)
                    } else {
                        resolve(response)
                    }
                }
            })
            .catch(e => {
                logger.e("Error logging in:", e)
                reject(responses.ERROR)
            })
    })
}

let _tokenTimer = null;

export function startTokenUpdate() {
    stopTokenUpdate();

    let delay = 1000 * 60 * 5 //five minutes
    _tokenTimer = setTimeout(() => {
        let url = config.get("auth.fresh.token.url")
        http.get(url, {}, {TOKEN: getSessionToken()})
            .then(responseJson => {
                let response = JSON.parse(responseJson)
                if (response.responseCode == responses.OK) {
                    _sessionToken = response.token

                    if (DEBUG) {
                        logger.i("Session token updated:", _sessionToken)
                    }
                } else {
                    if (DEBUG) {
                        logger.e("Error in session token update: " + response.errorCode)
                    }
                }

                startTokenUpdate();
            })
            .catch(e => {
                if (DEBUG) {
                    logger.e(e)
                }
            })


    }, delay)
}

export function stopTokenUpdate() {
    if (_tokenTimer) {
        clearTimeout(_tokenTimer);
        console.log("Token update stopped");
    }
}

export function start(mail, password, options) {
    return new Promise((resolve, reject) => {
        _loggedUser = null
        _sessionToken = null

        let data = {}

        preferences.load()
            .then(() => { return login(mail, password) })
            .then((response) => {
                preferences.set("session.type", TYPE_MAIL)
                preferences.set("session.mail", mail)
                preferences.set("session.password", password)

                _sessionToken = response.token
                console.log(_sessionToken)
                _loggedUser = response.user

                startTokenUpdate();

                return preferences.save()
            })
            .then((r) => {
                resolve(_loggedUser)
            })
            .catch((e) => {
                if (options && !options.backgroundMode) {
                    _loggedUser = null
                    _sessionToken = null

                    preferences.load()
                        .then(() => {
                            preferences.set("session.type", null)
                            preferences.set("session.mail", null)
                            preferences.set("session.password", null)
                            return preferences.save()
                        })
                        .catch((e) => {
                            logger.e(e)
                        })
                }                

                reject(e)
            })
    })
}

export function changePassword(currentPassword, password, passwordConfirm) {
    return new Promise((resolve, reject) => {
        Api.post("account/changePassword", {currentPassword, password, passwordConfirm})
            .then(response => {
                if (responses.OK != response.responseCode) {
                    reject(response.responseCode)
                } else {
                    console.log(response);

                    _sessionToken = response.value.token
                    resolve(response.value)
                }           
            })
            .catch(e => {
                logger.e("Error logging in:", e)
                reject(responses.ERROR)
            })
    })
}

export function resume(options) {
    return new Promise((resolve, reject) => {
        _loggedUser = null
        _sessionToken = null

        preferences.load()
            .then(() => {
                var type = preferences.get("session.type")
                var mail = preferences.get("session.mail")
                var password = preferences.get("session.password")

                if ((type == TYPE_MAIL && mail && password)) {
                    return start(mail, password, options)
                } else {
                    reject(responses.ERROR)
                    return stop()
                }
            })
            .then((r) => {
                return wrap(r, () => {
                    resolve(r)
                })
            })
            .catch(e => {reject(e)})
    })
}

export function destroy() {
    _loggedUser = null
    _sessionToken = null

    return preferences.load()
        .then(() => {
            preferences.set("session.type", null)
            preferences.set("session.mail", null)
            preferences.set("session.password", null)
            return preferences.save()
        })
        .catch((e) => {
            logger.e(e)
        })
}

export function getLoggedUser() {
    return _loggedUser
}

export function isLoggedIn() {
    return _loggedUser != null
}

export function getSessionToken() {
    return _sessionToken
}

export function updateLoggedUser(user) {
    _loggedUser = user;
}

export function updateUserPassword(password) {
    preferences.set("session.password", password)
    preferences.save()
}

export function updateSessionToken(token) {
    _sessionToken = token;
}


/**
 * Check if user has permissions
 * @param permissions --> array string ex: [document:list, document:new]
 */


export function isSuperuser() {
    return _.any(safeGet(getLoggedUser(), "roles"), r => _.any(r.permissions, p => p === "admin:superuser"))
}

export function hasPermission(permissions) {
    if (_.isEmpty(permissions) || isSuperuser())
        return true

    return _.any(safeGet(getLoggedUser(), "roles"), r => _.intersection(r.permissions, permissions).length > 0)
}

export const Permission = {
    LIST: "list",
    NEW: "new",
    EDIT: "edit",
    DELETE: "delete",
    SAVE: "save",
}
