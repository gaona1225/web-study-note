cordova.define("org.apache.cordova.webviewapi.webview", function(require, exports, module) { /*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

  
/**
 * Gets a picture from source defined by "options.sourceType", and returns the
 * image as defined by the "options.destinationType" option.

 * The defaults are sourceType=CAMERA and destinationType=FILE_URI.
 *
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Object} options
 */
var webViewApi = {};
//后退
webViewApi.goBack = function(successCallback, errorCallback) {
//    argscheck.checkArgs('fFO', 'WebViewApi.goBack', arguments);
    
    exec(successCallback, errorCallback, "CyouWebViewApi", "webViewGoback", []);
};
//前进
webViewApi.goForward = function(successCallback, errorCallback) {
//    argscheck.checkArgs('fFO', 'WebViewApi.forward', arguments);
    
    exec(successCallback, errorCallback, "CyouWebViewApi", "webViewGoForward", []);
};
//刷新
webViewApi.reload = function(successCallback, errorCallback) {
//    argscheck.checkArgs('fFO', 'WebViewApi.reload', arguments);
    
    exec(successCallback, errorCallback, "CyouWebViewApi", "webViewReload", []);
};
//停止
webViewApi.stoploading = function (successCallback, errorCallback) {

//    argscheck.checkArgs('fFO', 'WebViewApi.stoploading', arguments);
    exec(successCallback, errorCallback, "CyouWebViewApi", "webViewStopLoading", []);
};
//退出当前页(用于登录页面)
webViewApi.exitActivity = function(successCallback, errorCallback) {
//    argscheck.checkArgs('fFO', 'WebViewApi.exit', arguments);
    
    exec(successCallback, errorCallback, "CyouWebViewApi", "webViewRemove", []);
};
//deprecate
webViewApi.createWebview = function(successCallback, errorCallback) {
               
    exec(successCallback, errorCallback, "CyouWebViewApi", "createWebview", []);
};
//生成新的phonegap页面(用于登录页面)
webViewApi.pushWebView = function(successCallback, errorCallback) {
               
    exec(successCallback, errorCallback, "CyouWebViewApi", "pushWebView", []);
};

module.exports = webViewApi;

});
