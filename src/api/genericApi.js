"use strict"

const aj = require("../aj")
const http = require("../aj/http")

const preferences = require("../framework/preferences")
const config = require("../framework/config")

import * as _ from "underscore"
import * as utils from "./utils"

function get(url, data) {
    url = config.get("service.url") + url

    return utils.get(url, data)
}

function post(url, data) {
    url = config.get("service.url") + url

    return utils.post(url, data)
}

function postJson(url, data) {
    url = config.get("service.url") + url

    return utils.postJson(url, data)
}

function put(url, data) {
    url = config.get("service.url") + url

    return utils.put(url, data)
}

function delete_(url, data) {
    url = config.get("service.url") + url

    return utils.delete_(url, data)
}

function uploadBase64(url, base64) {
    url = config.get("service.url") + url

    return utils.post(url, base64, {"Content-Type": "text/plain"});
}

function multipart(url, data) {
    url = config.get("service.url") + url
    
    const options = {
        headers: utils.addToken({
            'Content-Type': 'multipart/form-data'
        }),
        method: 'POST'
    };
    
    options.body = new FormData();
    for (let key in data) {
        options.body.append(key, data[key]);
    }
    
    return fetch(url, options).then(response => response.json());
}

function postBase(url, data) {
    url = config.get("service.url") + url
    // var data = {
    //     'DATA1': '2020-02-14',
    //     'TK': '8b4a8b8c275f93b6141da73205999d0e'
    // }
    var formBody = [];

    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch(url, {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody
    }).then(response => response.json());
}

const Api = {
    get,
    post,
    postBase,
    put,
    postJson,
    "delete": delete_,
    uploadBase64,
    multipart
}

export default Api;