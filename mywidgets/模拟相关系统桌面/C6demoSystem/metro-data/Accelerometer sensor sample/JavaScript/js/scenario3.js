//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";
    var intervalId = 0;
    var accelerometer;

    var page = WinJS.UI.Pages.define("/html/scenario3.html", {
        ready: function (element, options) {
            document.getElementById("scenario3Open").addEventListener("click", enableGetReadingScenario, false);
            document.getElementById("scenario3Revoke").addEventListener("click", disableGetReadingScenario, false);
            document.getElementById("scenario3Open").disabled = false;
            document.getElementById("scenario3Revoke").disabled = true;

            accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
            if (accelerometer === null) {
                WinJS.log && WinJS.log("No accelerometer found", "sample", "error");
            }
        },
        unload: function () {
            if (document.getElementById("scenario3Open").disabled) {
                clearInterval(intervalId);

                // Return the report interval to its default
                accelerometer.reportInterval = 0;
            }
        }
    });

    function getCurrentReading() {
        var reading = accelerometer.getCurrentReading();
        if (reading) {
            document.getElementById("readingOutputX").innerHTML = reading.accelerationX.toFixed(2);
            document.getElementById("readingOutputY").innerHTML = reading.accelerationY.toFixed(2);
            document.getElementById("readingOutputZ").innerHTML = reading.accelerationZ.toFixed(2);
        }
    }

    function enableGetReadingScenario() {
        if (accelerometer) {
            // Choose a report interval supported by the sensor
            var minimumReportInterval = accelerometer.minimumReportInterval;
            var reportInterval = minimumReportInterval > 16 ? minimumReportInterval : 16;
            accelerometer.reportInterval = reportInterval;

            intervalId = setInterval(getCurrentReading, reportInterval);
            document.getElementById("scenario3Open").disabled = true;
            document.getElementById("scenario3Revoke").disabled = false;
        } else {
            WinJS.log && WinJS.log("No accelerometer found", "sample", "error");
        }
    }

    function disableGetReadingScenario() {
        clearInterval(intervalId);
        document.getElementById("scenario3Open").disabled = false;
        document.getElementById("scenario3Revoke").disabled = true;

        // Return the report interval to its default
        accelerometer.reportInterval = 0;
    }
})();
