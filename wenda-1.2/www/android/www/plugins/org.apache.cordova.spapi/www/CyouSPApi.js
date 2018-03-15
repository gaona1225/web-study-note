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
cyouSpApi.saveString = function(successCallback, errorCallback, args) {//args 参数1：key    参数2：value
    //argscheck.checkArgs('fFO', 'spApi.saveString', arguments);
    //var getValue = argscheck.getValue;

    //var key = getValue("test_save_key", "default_key");
    //var value = getValue("save test data", "");
    exec(successCallback, errorCallback, "CyouSPApi", "action_put_string", args);
};

cyouSpApi.getString = function(successCallback, errorCallback, args) {
    exec(successCallback, errorCallback, "CyouSPApi", "action_get_string", args);
};

cyouSpApi.saveInt = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.saveString', arguments);
    var getValue = argscheck.getValue;

    var key = getValue("test_save_int_key", "default_int_key");
    var value = getValue("save test data", 0);
    
    var args = [key,value];

    exec(successCallback, errorCallback, "CyouSPApi", "action_put_int", args);
};

cyouSpApi.getInt = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.saveString', arguments);
    var getValue = argscheck.getValue;

    var key = getValue("test_save_int_key", "default_int_key");
    
    var args = [key];

    exec(successCallback, errorCallback, "CyouSPApi", "action_get_int", args);
};

cyouSpApi.saveObject = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.saveObject', arguments);
    var getValue = argscheck.getValue;

    var key = getValue("test_save_int_key", "default_object_key");
    var value = getValue("save test data", 0);
    
    var args = [key,value];

    exec(successCallback, errorCallback, "CyouSPApi", "action_put_object", args);
};

cyouSpApi.getObject = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.saveObject', arguments);
    var getValue = argscheck.getValue;

    var key = getValue("test_save_int_key", "default_object_key");
    
    var args = [key];

    exec(successCallback, errorCallback, "CyouSPApi", "action_get_object", args);
};

cyouSpApi.saveAccessObject = function(successCallback, errorCallback, args) {
    //argscheck.checkArgs('fFO', 'spApi.saveAccessObject', arguments);
    //var getValue = argscheck.getValue;

    //var token = getValue("test_token_string", "default_test_token_string");
    //var expiresTime = getValue(100000000, 0);
    //var socialid = getValue("socialid","default_socialid");
    //var type = getValue("type","default_type");
    
    //var args = [token,expiresTime,socialid,type];

    exec(successCallback, errorCallback, "CyouSPApi", "action_put_access_object", args);
};

cyouSpApi.getAccessObject = function(successCallback, errorCallback, args) {
    //argscheck.checkArgs('fFO', 'spApi.getAccessObject', arguments);
  
    exec(successCallback, errorCallback, "CyouSPApi", "action_get_access_object", args);
};

cyouSpApi.isLogin = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.isLogin', arguments);
  
    exec(successCallback, errorCallback, "CyouSPApi", "is_login", []);
};

cyouSpApi.clearToken = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.clearToken', arguments);
  
    exec(successCallback, errorCallback, "CyouSPApi", "clear_token", []);
};

cyouSpApi.clearAccessData = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.clearAccessData', arguments);
  
    exec(successCallback, errorCallback, "CyouSPApi", "clear_access_data", []);
};

cyouSpApi.getAccessToken = function(successCallback, errorCallback) {
    argscheck.checkArgs('fFO', 'spApi.getAccessToken', arguments);
  
    exec(successCallback, errorCallback, "CyouSPApi", "action_get_access_token", []);
};


module.exports = cyouSpApi;

});
