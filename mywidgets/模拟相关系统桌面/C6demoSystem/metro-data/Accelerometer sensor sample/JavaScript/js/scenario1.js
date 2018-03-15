//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";
    var accelerometer;

    var page = WinJS.UI.Pages.define("/html/scenario1.html", {
        ready: function (element, options) {
            document.getElementById("scenario1Open").addEventListener("click", enableReadingChangedScenario, false);
            document.getElementById("scenario1Revoke").addEventListener("click", disableReadingChangedScenario, false);
            document.getElementById("scenario1Open").disabled = false;
            document.getElementById("scenario1Revoke").disabled = true;

            accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
            if (accelerometer === null) {
                WinJS.log && WinJS.log("No accelerometer found", "sample", "error");
            }
        },
        unload: function () {
            if (document.getElementById("scenario1Open").disabled) {
                accelerometer.removeEventListener("readingchanged", onDataChanged);

                // Return the report interval to its default
                accelerometer.reportInterval = 0;
            }
        }
    });

    function onDataChanged(e) {
        var reading = e.reading;

        document.getElementById("eventOutputX").innerHTML = reading.accelerationX.toFixed(2);
        document.getElementById("eventOutputY").innerHTML = reading.accelerationY.toFixed(2);
        document.getElementById("eventOutputZ").innerHTML = reading.accelerationZ.toFixed(2);
    }

    function enableReadingChangedScenario() {
        if (accelerometer) {
            // Choose a report interval supported by the sensor
            var minimumReportInterval = accelerometer.minimumReportInterval;
            var reportInterval = minimumReportInterval > 16 ? minimumReportInterval : 16;
            accelerometer.reportInterval = reportInterval;

            accelerometer.addEventListener("readingchanged", onDataChanged);
            document.getElementById("scenario1Open").disabled = true;
            document.getElementById("scenario1Revoke").disabled = false;
        } else {
            WinJS.log && WinJS.log("No accelerometer found", "sample", "error");
        }
    }

    function disableReadingChangedScenario() {
        accelerometer.removeEventListener("readingchanged", onDataChanged);
        document.getElementById("scenario1Open").disabled = false;
        document.getElementById("scenario1Revoke").disabled = true;

        // Return the report interval to its default
        accelerometer.reportInterval = 0;
    }
})();
