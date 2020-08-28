/*
This script is supposed to be like the query-parameters.js script 

The idea is to be able to call on the methods in this script to send push notifications. 

The push notifications don't do any firebase stuff. I just have the script talk to the 
service worker, and the service worker sends a notification. 

Pages with this script included can insert parameters into their html 
by using a <element class = "search-parameter">{keyvalue}</element>

*/

var notificationScripts = {}

/*
This method just sends a message to the active service worker of the app.
The service worker is waiting for a message, and when it receives it, or sees that there
is a message event coming in, it will send a notification.
*/
notificationScripts.messageServiceWorker = function () {
    navigator.serviceWorker.ready.then(registration => {
        // maybe give the method some parameters for this 
        registration.active.postMessage("Here's a message to trigger the service worker");
    });
}

/*
This method just sends a message to the active service worker of the app.
The only difference is that this one can take data as a parameter. I 
think something could be added to the service worker to parse whatever
is sent with this.
*/
notificationScripts.messageServiceWorkerWithData = function (notificationData) {
    navigator.serviceWorker.ready.then(registration => {
        // maybe give the method some parameters for this 
        registration.active.postMessage(notificationData);
    });
}
