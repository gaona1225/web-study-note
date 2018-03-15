cordova.define("org.apache.cordova.camera.camera", function(require, exports, module) {/*
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
    exec = require('cordova/exec'),
    Camera = require('./Camera');
    // XXX: commented out
    //CameraPopoverHandle = require('./CameraPopoverHandle');
var uploadCallbackSuccess = null;
var uploadCallbackFailed = null;

var cameraExport = {};

// Tack on the Camera Constants to the base camera plugin.
for (var key in Camera) {
    cameraExport[key] = Camera[key];
}

function uploadImage(imageUrl) {
    var ft = new FileTransfer(),
    uploadcomplete=0,
    progress = 0,
    options = new FileUploadOptions();
    options.fileKey="photo";
    options.fileName='test.jpg';
    options.mimeType="image/jpeg";
    ft.onprogress = function(progressEvent) {
            
    };
    var server = "http://10.6.210.229:8080/wiki";
               
    ft.upload(imageUrl, server + '/upload', uploadCallbackSuccess, uploadCallbackFailed, options);
    function win(information_back){
        console.log("Code = " + information_back);
        console.log("Response = " + information_back.response);
        console.log("Sent = " + information_back.bytesSent);
    }
    function fail(message) {
    }
}

function createOptionsEl(name, values, selectionDefault) {
               
    var container = document.createElement('div');
    container.style.display = 'inline-block';
    container.appendChild(document.createTextNode(name + ': '));
    var select = document.createElement('select');
    select.keyName = name;
    container.appendChild(select);
               
    // if we didn't get a default value, insert the blank <default> entry
    if (selectionDefault == undefined) {
        var opt = document.createElement('option');
        opt.value = '';
        opt.text = '<default>';
        select.appendChild(opt);
    }
               
    select.isBool = typeof values == 'boolean';
    if (select.isBool) {
        values = {'true': 1, 'false': 0};
    }
               
    for (var k in values) {
        var opt = document.createElement('option');
        opt.value = values[k];
        opt.textContent = k;
        if (selectionDefault) {
            if (selectionDefault[0] == k) {
               opt.selected = true;
            }
        }
        select.appendChild(opt);
    }
    var optionsDiv = document.getElementById('image-options');
    optionsDiv.appendChild(container);
}

               
function extractOptions() {
    var els = document.querySelectorAll('#image-options select');
    var ret = {};
    for (var i = 0, el; el = els[i]; ++i) {
        var value = el.value;
        if (value === '') continue;
            if (el.isBool) {
               ret[el.keyName] = !!value;
            } else {
               ret[el.keyName] = +value;
            }
        }
    return ret;
}
               
/**
 * Gets a picture from source defined by "options.sourceType", and returns the
 * image as defined by the "options.destinationType" option.

 * The defaults are sourceType=CAMERA and destinationType=FILE_URI.
 *
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Object} options
 */
cameraExport.getPicture = function(successCallback, errorCallback) {
               
    var camQualityDefault = ['quality value', 50];
    var camDestinationTypeDefault = ['FILE_URI', 1];
    var camPictureSourceTypeDefault = ['CAMERA', 1];
    var camAllowEditDefault = ['allowEdit', false];
    var camEncodingTypeDefault = ['JPEG', 0];
    var camMediaTypeDefault = ['mediaType', 0];
    var camCorrectOrientationDefault = ['correctOrientation', false];
    var camSaveToPhotoAlbumDefault = ['saveToPhotoAlbum', true];
               
//    createOptionsEl('sourceaaaType', Camera.PictureSourceType, camPictureSourceTypeDefault);
//    createOptionsEl('destinationType', Camera.DestinationType, camDestinationTypeDefault);
//    createOptionsEl('encodingType', Camera.EncodingType, camEncodingTypeDefault);
//    createOptionsEl('mediaType', Camera.MediaType, camMediaTypeDefault);
//    createOptionsEl('quality', {'0': 0, '50': 50, '80': 80, '100': 100}, camQualityDefault);
//    createOptionsEl('targetWidth', {'50': 50, '200': 200, '800': 800, '2048': 2048});
//    createOptionsEl('targetHeight', {'50': 50, '200': 200, '800': 800, '2048': 2048});
//    createOptionsEl('allowEdit', true, camAllowEditDefault);
//    createOptionsEl('correctOrientation', true, camCorrectOrientationDefault);
//    createOptionsEl('saveToPhotoAlbum', true, camSaveToPhotoAlbumDefault);
//    createOptionsEl('cameraDirection', Camera.Direction);
               
    argscheck.checkArgs('fFO', 'Camera.getPicture', arguments);
    options = options || {};
    uploadCallbackSuccess = successCallback;
    uploadCallbackFailed = errorCallback;
               
    var options = extractOptions();
    
    var getValue = argscheck.getValue;

    var quality = getValue(options.quality, 50);
    var destinationType = getValue(options.destinationType, Camera.DestinationType.FILE_URI);
    var sourceType = getValue(options.sourceType, Camera.PictureSourceType.CAMERA);
    var targetWidth = getValue(options.targetWidth, -1);
    var targetHeight = getValue(options.targetHeight, -1);
    var encodingType = getValue(options.encodingType, Camera.EncodingType.JPEG);
    var mediaType = getValue(options.mediaType, Camera.MediaType.PICTURE);
    var allowEdit = !!options.allowEdit;
    var correctOrientation = !!options.correctOrientation;
    var saveToPhotoAlbum = !!options.saveToPhotoAlbum;
    var popoverOptions = getValue(options.popoverOptions, null);
    var cameraDirection = getValue(options.cameraDirection, Camera.Direction.BACK);

    var args = [quality, destinationType, sourceType, targetWidth, targetHeight, encodingType,
                mediaType, allowEdit, correctOrientation, saveToPhotoAlbum, popoverOptions, cameraDirection];

    exec(uploadImage, errorCallback, "Camera", "takePicture", args);
    // XXX: commented out
    //return new CameraPopoverHandle();
};

cameraExport.cleanup = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "Camera", "cleanup", []);
};

module.exports = cameraExport;
});
