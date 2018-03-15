cordova.define("org.apache.cordova.spapi.sp", function(require, exports, module) { /*
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
var cyouSpApi = {};
cyouSpApi.saveString = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.saveString', arguments);
    var getValue = argscheck.getValue;

    var key = getValue("test_save_key", "default_key");
    var value = getValue("save test data", "");
    
    var args = [key,value];

    exec(successCallback, errorCallback, "CyouSPApi", "putString", args);
};

cyouSpApi.getString = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.saveString', arguments);
    var getValue = argscheck.getValue;

    var key = getValue("test_save_key", "default_key");
    
    var args = [key];

    exec(successCallback, errorCallback, "CyouSPApi", "getString", args);
};

cyouSpApi.saveAccessObject = function(successCallback, errorCallback, args) {
//    argscheck.checkArgs('fFO', 'spApi.saveAccessObject', arguments);
               
    exec(successCallback, errorCallback, "CyouSPApi", "saveAccessInfo", args);
};
               
cyouSpApi.getAccessObject = function(successCallback, errorCallback, args) {
    argscheck.checkArgs('fFO', 'spApi.getAccessObject', arguments);
               
    exec(successCallback, errorCallback, "CyouSPApi", "getAccessInfo", [args]);
};
               
cyouSpApi.isLogin = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.isLogin', arguments);
               
    exec(successCallback, errorCallback, "CyouSPApi", "isLogin", []);
};
               
cyouSpApi.saveToken = function(successCallback, errorCallback, arguments) {
//    argscheck.checkArgs('fFO', 'spApi.clearToken', arguments);
               
    exec(successCallback, errorCallback, "CyouSPApi", "saveToken", [arguments]);
};
               
cyouSpApi.clearToken = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.clearToken', arguments);
               
    exec(successCallback, errorCallback, "CyouSPApi", "clearToken", []);
};
               
cyouSpApi.clearAccessData = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.clearAccessData', arguments);
               
    exec(successCallback, errorCallback, "CyouSPApi", "clearData", []);
};
               
module.exports = cyouSpApi;

});
