//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";
    var accelerometer;

    var page = WinJS.UI.Pages.define("/html/scenario2.html", {
        ready: function (element, options) {
            document.getElementById("scenario2Open").addEventListener("click", enableShakenScenario, false);
            document.getElementById("scenario2Revoke").addEventListener("click", disableShakenScenario, false);
            document.getElementById("scenario2Open").disabled = false;
            document.getElementById("scenario2Revoke").disabled = true;

            accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
            if (accelerometer === null) {
                WinJS.log && WinJS.log("No accelerometer found", "sample", "error");
            }
        },
        unload: function () {
            if (document.getElementById("scenario2Open").disabled) {
                accelerometer.removeEventListener("shaken", onShaken);
            }
        }
    });

    var onShaken = (function () {
        var shakeCount = 0;

        return function (e) {
            shakeCount++;
            document.getElementById("shakeOutput").innerHTML = shakeCount;
        };
    })();

    function enableShakenScenario() {
        if (accelerometer) {
            accelerometer.addEventListener("shaken", onShaken);
            document.getElementById("scenario2Open").disabled = true;
            document.getElementById("scenario2Revoke").disabled = false;
        } else {
            WinJS.log && WinJS.log("No accelerometer found", "sample", "error");
        }
    }

    function disableShakenScenario() {
        accelerometer.removeEventListener("shaken", onShaken);
        document.getElementById("scenario2Open").disabled = false;
        document.getElementById("scenario2Revoke").disabled = true;
    }
})();
